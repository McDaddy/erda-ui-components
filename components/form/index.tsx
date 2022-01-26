import React from 'react';
import { map, reduce } from 'lodash';
import {
  createSchemaField,
  Field as ReactField,
  observer,
  useField,
  useFieldSchema,
  RecursionField,
} from '@formily/react';
import {
  createForm,
  Form as FormType,
  onFieldValueChange,
  onFormInitialValuesChange,
  onFormMount,
  onFieldReact,
  FormPathPattern,
  Field,
  isField,
  FieldDataSource,
  registerValidateRules,
} from '@formily/core';
import { action } from '@formily/reactive';
import { Form, FormItem, FormLayout, IFormLayoutProps, FormGrid, IFormGridProps } from '@formily/antd';
import { createFields, Field as XField } from './utils';

type Obj<T extends any = any> = { [k: string]: T };

// type IsUnion<T, U extends T = T> = (T extends any ? (U extends T ? false : true) : never) extends false ? false : true;

// type OnlyOneElementObj<T extends any = {}> = IsUnion<keyof T> extends false ? T : never;

interface FormProps<T extends Obj> {
  fieldsConfig: XField[];
  form?: FormType<T>;
  layoutConfig?: IFormLayoutProps;
  gridConfig?: IFormGridProps;
  style?: React.CSSProperties;
  className?: string;
}

interface SchemaField {
  name: string;
  title?: string;
  default?: unknown;
  'x-decorator'?: string;
  'x-component'?: string;
  'x-component-props'?: Obj; // TODO
}

const defaultVoidField = {
  type: 'void',
  name: 'void',
};

const transformConfigRecursively = (fieldsConfig: XField[]) => {
  const components: { [k: string]: React.ComponentClass | React.FunctionComponent } = {};
  let subComponents: Obj<React.ComponentClass<{}, any> | React.FunctionComponent<{}>> = {};

  const propertiesArray: SchemaField[] = map(fieldsConfig, (item) => {
    const {
      name,
      title,
      type = 'string',
      customProps,
      wrapperProps,
      defaultValue,
      component,
      required,
      validator,
      items,
    } = item;
    if (Object.keys(component).length !== 1) {
      console.warn(`field ${name} has more than one type or empty type`);
      return defaultVoidField;
    }
    const componentName = Object.keys(component)[0];
    const _component = Object.values(component)[0];
    components[componentName] = _component;

    let _items = {};
    if (items) {
      const [_properties, _components] = transformConfigRecursively(items);
      subComponents = _components;
      _items = {
        type: 'object',
        properties: _properties,
      };
    }

    return {
      name,
      title,
      type,
      required,
      items: _items,
      default: defaultValue,
      'x-validator': validator,
      'x-decorator': 'FormItem',
      'x-component': componentName,
      'x-component-props': customProps,
      'x-decorator-props': wrapperProps,
    };
  });

  const properties = reduce(
    propertiesArray,
    (result, item) => {
      const { name, ...rest } = item;
      result[name] = rest;
      return result;
    },
    {} as Obj<Omit<SchemaField, 'name'>>,
  );
  return [properties, { ...components, ...subComponents }] as [
    Obj<Omit<SchemaField, 'name'>>,
    Obj<React.ComponentClass<{}, any> | React.FunctionComponent<{}>>,
  ];
};

const ErdaForm = <T extends Obj>({ fieldsConfig, form, layoutConfig, style, gridConfig, className }: FormProps<T>) => {
  const [properties, components] = transformConfigRecursively(fieldsConfig);
  const schemaConfig = {
    type: 'object',
    properties: {
      layout: {
        type: 'void',
        'x-component': 'FormLayout',
        'x-component-props': layoutConfig,
        properties: {
          grid: {
            type: 'void',
            'x-component': 'FormGrid',
            'x-component-props': {
              maxColumns: 1,
              ...gridConfig,
            },
            properties,
          },
        },
      },
    },
  };

  const SchemaField = createSchemaField({
    components: { ...components, FormItem, FormLayout, FormGrid },
  });

  return (
    <Form style={style} className={className || ''} form={form}>
      <SchemaField schema={schemaConfig} />
    </Form>
  );
};

const takeAsyncDataSource = <T extends FieldDataSource>(
  pattern: FormPathPattern,
  service: (field: Field) => Promise<T>,
) => {
  onFieldReact(pattern, (field) => {
    if (isField(field)) {
      field.loading = true;
      service(field).then(
        action.bound!((data: FieldDataSource) => {
          field.dataSource = data;
          field.loading = false;
        }),
      );
    }
  });
};

export default ErdaForm;
ErdaForm.createForm = createForm;
ErdaForm.createFields = createFields;
ErdaForm.onFieldValueChange = onFieldValueChange;
ErdaForm.onFormInitialValuesChange = onFormInitialValuesChange;
ErdaForm.onFormMount = onFormMount;
ErdaForm.takeAsyncDataSource = takeAsyncDataSource;
ErdaForm.registerValidateRules = registerValidateRules;
ErdaForm.observer = observer;
ErdaForm.Field = ReactField;
ErdaForm.useField = useField;
ErdaForm.useFieldSchema = useFieldSchema;
ErdaForm.RecursionField = RecursionField;

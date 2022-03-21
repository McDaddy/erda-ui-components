import React from 'react';
import { map, reduce, uniqueId } from 'lodash';
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
  ArrayField as ArrayFieldType,
} from '@formily/core';
import { action } from '@formily/reactive';
import { Form, FormItem, FormLayout, IFormLayoutProps, FormGrid, IFormGridProps } from '@formily/antd';
import { createFields, Field as XField } from './utils';

type Obj<T extends any = any> = { [k: string]: T };
type CT = React.ComponentClass | React.FunctionComponent;

// type IsUnion<T, U extends T = T> = (T extends any ? (U extends T ? false : true) : never) extends false ? false : true;

// type OnlyOneElementObj<T extends any = {}> = IsUnion<keyof T> extends false ? T : never;

export interface FormProps<T extends Obj = any> {
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

// const defaultVoidField = {
//   type: 'void',
//   name: 'void',
// };

const transformConfigRecursively = (fieldsConfig: XField[], componentMap: Map<CT, string>) => {
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

    let componentName = '';
    if (componentMap.has(component)) {
      componentName = componentMap.get(component)!;
    } else {
      componentName = uniqueId('component-');
      componentMap.set(component, componentName);
    }

    let _items = {};
    if (items) {
      const _properties = transformConfigRecursively(items, componentMap);
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
  return properties as Obj<Omit<SchemaField, 'name'>>;
};

const ErdaForm = <T extends Obj>({ fieldsConfig, form, layoutConfig, style, gridConfig, className }: FormProps<T>) => {
  const componentMap = React.useRef(new Map<CT, string>());
  const properties = React.useMemo(() => transformConfigRecursively(fieldsConfig, componentMap.current), []);
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

  const components = Array.from(componentMap.current.entries()).reduce<Obj<CT>>(
    (main, [key, value]) => ({ ...main, [value]: key }),
    {},
  );

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
export { FormType, Field, IFormLayoutProps, ArrayFieldType };

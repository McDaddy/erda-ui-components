import React from 'react';
import { map, reduce } from 'lodash';
import { createSchemaField } from '@formily/react';
import {
  createForm,
  Form as FormType,
  onFieldValueChange,
  onFieldReact,
  FormPathPattern,
  Field,
  isField,
  FieldDataSource,
} from '@formily/core';
import { action } from '@formily/reactive';
import {
  Form,
  FormItem,
  FormLayout,
  IFormItemProps,
  IFormLayoutProps,
  // FormGrid,
} from '@formily/antd';

type Obj<T extends any = any> = { [k: string]: T };

// type IsUnion<T, U extends T = T> = (T extends any ? (U extends T ? false : true) : never) extends false ? false : true;

// type OnlyOneElementObj<T extends any = {}> = IsUnion<keyof T> extends false ? T : never;

interface FormProps<T extends Obj> {
  formConfig: {
    name: string;
    title?: string;
    defaultValue?: unknown;
    type?: string;
    component: { [k: string]: React.ComponentClass | React.FunctionComponent };
    customProps?: Obj;
    wrapperProps?: IFormItemProps;
  }[];
  form?: FormType<T>;
  layoutConfig: IFormLayoutProps;
  style?: React.CSSProperties;
}

interface SchemaField {
  name: string;
  title?: string;
  default?: unknown;
  'x-decorator'?: string;
  'x-component'?: string;
  'x-component-props'?: Obj;
}

const defaultForm = createForm();

const defaultVoidField = {
  type: 'void',
  name: 'void',
};

const ErdaForm = <T extends Obj>({ formConfig, form, layoutConfig, style }: FormProps<T>) => {
  const components: { [k: string]: React.ComponentClass | React.FunctionComponent } = {};
  const propertiesArray: SchemaField[] = map(formConfig, (item) => {
    const { name, title, type = 'string', customProps, wrapperProps, defaultValue, component } = item;
    if (Object.keys(component).length !== 1) {
      console.warn(`field ${name} has more than one type or empty type`);
      return defaultVoidField;
    }
    const componentName = Object.keys(component)[0];
    const _component = Object.values(component)[0];
    components[componentName] = _component;
    return {
      name,
      title,
      type,
      default: defaultValue,
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
  const schemaConfig = {
    type: 'object',
    properties: {
      layout: {
        type: 'void',
        'x-component': 'FormLayout',
        'x-component-props': {
          labelCol: 8,
          wrapperCol: 16,
          ...layoutConfig,
        },
        properties,
      },
    },
  };

  const SchemaField = createSchemaField({
    components: { ...components, FormItem, FormLayout },
  });

  return (
    <Form style={style} form={form || defaultForm}>
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
ErdaForm.onFieldValueChange = onFieldValueChange;
ErdaForm.takeAsyncDataSource = takeAsyncDataSource;

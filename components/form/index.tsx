import React from 'react';
import { map, reduce } from 'lodash';
import { createSchemaField } from '@formily/react';
import { createForm, Form as FormType, onFieldValueChange } from '@formily/core';
import {
  Form,
  FormItem,
  FormLayout,
  IFormItemProps,
  // FormGrid,
  // Input,
  // Select,
} from '@formily/antd';

type Obj<T extends any = any> = { [k: string]: T };

// type IsUnion<T, U extends T = T> = (T extends any ? (U extends T ? false : true) : never) extends false ? false : true;

// type OnlyOneElementObj<T extends any = {}> = IsUnion<keyof T> extends false ? T : never;

interface FormProps<T extends Obj> {
  formConfig: {
    name: string;
    title?: string;
    defaultValue?: unknown;
    type: { [k: string]: React.ComponentClass | React.FunctionComponent };
    customProps?: Obj;
    wrapperProps?: IFormItemProps;
  }[];
  form?: FormType<T>;
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

const ErdaForm = <T extends Obj>({ formConfig, form }: FormProps<T>) => {
  const components: { [k: string]: React.ComponentClass | React.FunctionComponent } = {};
  const propertiesArray: SchemaField[] = map(formConfig, (item) => {
    const { name, title, type, customProps, wrapperProps, defaultValue } = item;
    console.log('🚀 ~ file: index.tsx ~ line 53 ~ constpropertiesArray:SchemaField[]=map ~ defaultValue', defaultValue);
    if (Object.keys(type).length !== 1) {
      console.warn(`field ${name} has more than one type or empty type`);
      return defaultVoidField;
    }
    const componentName = Object.keys(type)[0];
    const component = Object.values(type)[0];
    components[componentName] = component;
    return {
      name,
      title,
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
          // wrapperCol: 10,
          // layout: 'vertical',
          // labelAlign: 'left',
        },
        properties,
      },
    },
  };

  const SchemaField = createSchemaField({
    components: { ...components, FormItem, FormLayout },
  });

  return (
    <Form form={form || defaultForm}>
      <SchemaField schema={schemaConfig} />
    </Form>
  );
};

export default ErdaForm;
ErdaForm.createForm = createForm;
ErdaForm.onFieldValueChange = onFieldValueChange;

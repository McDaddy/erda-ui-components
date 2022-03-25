import React from 'react';
import { IFormGridProps, IFormItemProps, IFormLayoutProps } from '@formily/antd';
import { FieldValidator } from '@formily/core';
import { map, reduce, uniqueId } from 'lodash';

type CT = React.ComponentClass | React.FunctionComponent;

export interface Field<T extends CT = any> {
  name: string;
  title?: string;
  label?: string;
  defaultValue?: unknown;
  type?: string;
  required?: boolean;
  validator?: FieldValidator;
  component: T;
  customProps?: T extends CT ? React.ComponentProps<T> : never;
  wrapperProps?: IFormItemProps;
  items?: Field[];
  gridConfig?: IFormGridProps;
  layoutConfig?: IFormLayoutProps;
  stepName?: string;
}

export interface CheckType {
  <
    T1 extends CT,
    T2 extends CT,
    T3 extends CT,
    T4 extends CT,
    T5 extends CT,
    T6 extends CT,
    T7 extends CT,
    T8 extends CT,
    T9 extends CT,
    T10 extends CT,
    T11 extends CT,
    T12 extends CT,
    T13 extends CT,
    T14 extends CT,
    T15 extends CT,
    T16 extends CT,
    T17 extends CT,
    T18 extends CT,
    T19 extends CT,
    T20 extends CT,
    T21 extends CT,
    T22 extends CT,
    T23 extends CT,
    T24 extends CT,
    T25 extends CT,
    T26 extends CT,
    T27 extends CT,
    T28 extends CT,
    T29 extends CT,
    T30 extends CT,
  >(
    args:
      | [Field<T1>]
      | [Field<T1>, Field<T2>]
      | [Field<T1>, Field<T2>, Field<T3>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>, Field<T13>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>, Field<T13>, Field<T14>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>, Field<T13>, Field<T14>, Field<T15>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>, Field<T13>, Field<T14>, Field<T15>, Field<T16>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>, Field<T13>, Field<T14>, Field<T15>, Field<T16>, Field<T17>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>, Field<T13>, Field<T14>, Field<T15>, Field<T16>, Field<T17>, Field<T18>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>, Field<T13>, Field<T14>, Field<T15>, Field<T16>, Field<T17>, Field<T18>, Field<T19>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>, Field<T13>, Field<T14>, Field<T15>, Field<T16>, Field<T17>, Field<T18>, Field<T19>, Field<T20>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>, Field<T13>, Field<T14>, Field<T15>, Field<T16>, Field<T17>, Field<T18>, Field<T19>, Field<T20>, Field<T21>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>, Field<T13>, Field<T14>, Field<T15>, Field<T16>, Field<T17>, Field<T18>, Field<T19>, Field<T20>, Field<T21>, Field<T22>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>, Field<T13>, Field<T14>, Field<T15>, Field<T16>, Field<T17>, Field<T18>, Field<T19>, Field<T20>, Field<T21>, Field<T22>, Field<T23>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>, Field<T13>, Field<T14>, Field<T15>, Field<T16>, Field<T17>, Field<T18>, Field<T19>, Field<T20>, Field<T21>, Field<T22>, Field<T23>, Field<T24>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>, Field<T13>, Field<T14>, Field<T15>, Field<T16>, Field<T17>, Field<T18>, Field<T19>, Field<T20>, Field<T21>, Field<T22>, Field<T23>, Field<T24>, Field<T25>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>, Field<T13>, Field<T14>, Field<T15>, Field<T16>, Field<T17>, Field<T18>, Field<T19>, Field<T20>, Field<T21>, Field<T22>, Field<T23>, Field<T24>, Field<T25>, Field<T26>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>, Field<T13>, Field<T14>, Field<T15>, Field<T16>, Field<T17>, Field<T18>, Field<T19>, Field<T20>, Field<T21>, Field<T22>, Field<T23>, Field<T24>, Field<T25>, Field<T26>, Field<T27>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>, Field<T13>, Field<T14>, Field<T15>, Field<T16>, Field<T17>, Field<T18>, Field<T19>, Field<T20>, Field<T21>, Field<T22>, Field<T23>, Field<T24>, Field<T25>, Field<T26>, Field<T27>, Field<T28>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>, Field<T13>, Field<T14>, Field<T15>, Field<T16>, Field<T17>, Field<T18>, Field<T19>, Field<T20>, Field<T21>, Field<T22>, Field<T23>, Field<T24>, Field<T25>, Field<T26>, Field<T27>, Field<T28>, Field<T29>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>, Field<T13>, Field<T14>, Field<T15>, Field<T16>, Field<T17>, Field<T18>, Field<T19>, Field<T20>, Field<T21>, Field<T22>, Field<T23>, Field<T24>, Field<T25>, Field<T26>, Field<T27>, Field<T28>, Field<T29>, Field<T30>]
      ):
      | [Field<T1>]
      | [Field<T1>, Field<T2>]
      | [Field<T1>, Field<T2>, Field<T3>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>, Field<T13>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>, Field<T13>, Field<T14>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>, Field<T13>, Field<T14>, Field<T15>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>, Field<T13>, Field<T14>, Field<T15>, Field<T16>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>, Field<T13>, Field<T14>, Field<T15>, Field<T16>, Field<T17>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>, Field<T13>, Field<T14>, Field<T15>, Field<T16>, Field<T17>, Field<T18>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>, Field<T13>, Field<T14>, Field<T15>, Field<T16>, Field<T17>, Field<T18>, Field<T19>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>, Field<T13>, Field<T14>, Field<T15>, Field<T16>, Field<T17>, Field<T18>, Field<T19>, Field<T20>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>, Field<T13>, Field<T14>, Field<T15>, Field<T16>, Field<T17>, Field<T18>, Field<T19>, Field<T20>, Field<T21>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>, Field<T13>, Field<T14>, Field<T15>, Field<T16>, Field<T17>, Field<T18>, Field<T19>, Field<T20>, Field<T21>, Field<T22>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>, Field<T13>, Field<T14>, Field<T15>, Field<T16>, Field<T17>, Field<T18>, Field<T19>, Field<T20>, Field<T21>, Field<T22>, Field<T23>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>, Field<T13>, Field<T14>, Field<T15>, Field<T16>, Field<T17>, Field<T18>, Field<T19>, Field<T20>, Field<T21>, Field<T22>, Field<T23>, Field<T24>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>, Field<T13>, Field<T14>, Field<T15>, Field<T16>, Field<T17>, Field<T18>, Field<T19>, Field<T20>, Field<T21>, Field<T22>, Field<T23>, Field<T24>, Field<T25>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>, Field<T13>, Field<T14>, Field<T15>, Field<T16>, Field<T17>, Field<T18>, Field<T19>, Field<T20>, Field<T21>, Field<T22>, Field<T23>, Field<T24>, Field<T25>, Field<T26>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>, Field<T13>, Field<T14>, Field<T15>, Field<T16>, Field<T17>, Field<T18>, Field<T19>, Field<T20>, Field<T21>, Field<T22>, Field<T23>, Field<T24>, Field<T25>, Field<T26>, Field<T27>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>, Field<T13>, Field<T14>, Field<T15>, Field<T16>, Field<T17>, Field<T18>, Field<T19>, Field<T20>, Field<T21>, Field<T22>, Field<T23>, Field<T24>, Field<T25>, Field<T26>, Field<T27>, Field<T28>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>, Field<T13>, Field<T14>, Field<T15>, Field<T16>, Field<T17>, Field<T18>, Field<T19>, Field<T20>, Field<T21>, Field<T22>, Field<T23>, Field<T24>, Field<T25>, Field<T26>, Field<T27>, Field<T28>, Field<T29>]
      | [Field<T1>, Field<T2>, Field<T3>, Field<T4>, Field<T5>, Field<T6>, Field<T7>, Field<T8>, Field<T9>, Field<T10>, Field<T11>, Field<T12>, Field<T13>, Field<T14>, Field<T15>, Field<T16>, Field<T17>, Field<T18>, Field<T19>, Field<T20>, Field<T21>, Field<T22>, Field<T23>, Field<T24>, Field<T25>, Field<T26>, Field<T27>, Field<T28>, Field<T29>, Field<T30>]
    }

// eslint-disable-next-line import/prefer-default-export
export const createFields: CheckType = (fieldList: any) => fieldList;

interface Obj<T extends any = any> {
  [k: string]: T;
}
interface SchemaField {
  name: string;
  title?: string;
  default?: unknown;
  'x-decorator'?: string;
  'x-component'?: string;
  'x-component-props'?: Obj; // TODO
}

export const transformConfigRecursively = (fieldsConfig: Field[], componentMap: Map<CT, string>) => {
  const propertiesArray: SchemaField[] = map(fieldsConfig, (item) => {
    const {
      name,
      title,
      label,
      type = 'string',
      customProps,
      wrapperProps,
      defaultValue,
      component,
      required,
      validator,
      items,
      gridConfig,
      layoutConfig,
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
        properties: {
          layout: {
            type: 'void',
            'x-component': 'FormLayout',
            'x-component-props': { ...layoutConfig },
            properties: {
              grid: {
                type: 'void',
                'x-component': 'FormGrid',
                'x-component-props': {
                  ...gridConfig,
                },
                properties: _properties,
              },
            },
          },
        },
      };
    }

    return {
      name,
      title: title ?? label,
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
    (acc, item) => {
      const { name, ...rest } = item;
      acc[name] = rest;
      return acc;
    },
    {} as Obj<Omit<SchemaField, 'name'>>,
  );
  return properties as Obj<Omit<SchemaField, 'name'>>;
};

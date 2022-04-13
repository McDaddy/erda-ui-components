import { FormTab, IFormTabProps } from '@formily/antd';
import { map, reduce, uniqueId } from 'lodash';
import { defaultLayoutConfig } from '.';
import { CheckType, CT, Field, SchemaField } from './interface';

export const createFields: CheckType = (fieldList: any) => fieldList;

export const createTabsField = ({
  tabs,
  customProps,
  name,
}: {
  name: string;
  tabs: Array<{ tab: string; fields: Field[] }>;
  customProps: IFormTabProps;
}): Field => {
  const tabsProperties: Field[] = (tabs ?? []).map((tabItem) => {
    const { tab, fields } = tabItem;
    return {
      type: 'void',
      component: FormTab.TabPane,
      componentName: 'ErdaTabPane',
      name: tab,
      customProps: {
        tab,
      },
      properties: fields,
    };
  }, []);
  const result = {
    type: 'void',
    component: FormTab,
    name,
    customProps: {
      ...customProps,
      formTab: FormTab.createFormTab!(),
    },
    properties: tabsProperties,
  };
  return result;
};

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
      display,
      componentName: _componentName,
      properties: fieldProperties,
    } = item;

    let componentName = '';
    if (componentMap.has(component)) {
      componentName = componentMap.get(component)!;
    } else {
      componentName = _componentName ?? uniqueId('component-');
      componentMap.set(component, componentName);
    }

    let _items = {}; // for array fields
    if (items) {
      const _properties = transformConfigRecursively(items, componentMap);
      _items = {
        type: 'object',
        properties: {
          layout: {
            type: 'void',
            'x-component': 'FormLayout',
            'x-component-props': { ...defaultLayoutConfig, ...layoutConfig },
            properties: {
              grid: {
                type: 'void',
                'x-component': 'FormGrid',
                'x-component-props': {
                  maxColumns: 1,
                  ...gridConfig,
                },
                properties: _properties,
              },
            },
          },
        },
      };
    }

    let _properties;
    if (fieldProperties) {
      _properties = transformConfigRecursively(fieldProperties, componentMap);
    }

    return {
      name,
      title: title ?? label,
      type,
      required,
      items: _items,
      default: defaultValue,
      'x-validator': validator,
      'x-decorator': _properties ? undefined : 'FormItem',
      'x-component': componentName,
      'x-component-props': customProps,
      'x-display': display,
      'x-decorator-props': _properties ? undefined : { colon: false, ...wrapperProps },
      properties: _properties,
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

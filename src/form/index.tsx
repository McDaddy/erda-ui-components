import React, { Ref } from 'react';
import { map, reduce, uniqueId } from 'lodash';
import {
  createSchemaField,
  Field as ReactField,
  observer,
  useField,
  useFieldSchema,
  RecursionField,
  FormProvider,
  FormConsumer,
} from '@formily/react';
import {
  createForm,
  Form as FormType,
  onFieldValueChange,
  onFormValuesChange,
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
import {
  Form,
  FormItem,
  FormLayout,
  IFormLayoutProps,
  FormGrid,
  IFormGridProps,
  FormStep,
  IFormStep,
} from '@formily/antd';
import { createFields, Field as XField } from './utils';
import '@formily/antd/esm/form-item/style';

type Obj<T extends any = any> = { [k: string]: T };
type CT = React.ComponentClass | React.FunctionComponent;

// type IsUnion<T, U extends T = T> = (T extends any ? (U extends T ? false : true) : never) extends false ? false : true;

// type OnlyOneElementObj<T extends any = {}> = IsUnion<keyof T> extends false ? T : never;

interface StepConfig {
  stepName: string;
  stepTitle: string;
}

interface StepFields extends StepConfig {
  fields: XField[];
}

export interface FormProps<T extends Obj = any> {
  fieldsConfig: XField[];
  form?: FormType<T>;
  layoutConfig?: IFormLayoutProps;
  gridConfig?: IFormGridProps;
  style?: React.CSSProperties;
  className?: string;
  stepConfig?: StepConfig[];
  stepButtonGroup?: (formStep: IFormStep) => React.ReactChild;
}

interface SchemaField {
  name: string;
  title?: string;
  default?: unknown;
  'x-decorator'?: string;
  'x-component'?: string;
  'x-component-props'?: Obj; // TODO
}

interface FormRef {
  formStep?: IFormStep;
}

// const defaultVoidField = {
//   type: 'void',
//   name: 'void',
// };

const { createFormStep } = FormStep;

const transformConfigRecursively = (fieldsConfig: XField[], componentMap: Map<CT, string>) => {
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
    (result, item) => {
      const { name, ...rest } = item;
      result[name] = rest;
      return result;
    },
    {} as Obj<Omit<SchemaField, 'name'>>,
  );
  return properties as Obj<Omit<SchemaField, 'name'>>;
};

const ErdaForm = <T extends Obj>({
  fieldsConfig,
  form,
  layoutConfig,
  style,
  gridConfig,
  className,
  stepConfig,
  stepButtonGroup,
  formRef,
}: FormProps<T> & { formRef?: Ref<FormRef> }) => {
  const componentMap = React.useRef(new Map<CT, string>());
  let stepGroups: StepFields[] = [];

  if (stepConfig) {
    stepGroups = (fieldsConfig ?? []).reduce<StepFields[]>((acc, fItem) => {
      const { stepName } = fItem;
      if (!stepName) {
        // eslint-disable-next-line no-console
        console.warn('stepName is required when stepConfig is provided');
        return acc;
      }
      const existGroup = acc.find((group) => group.stepName === stepName);
      if (existGroup) {
        existGroup.fields.push(fItem);
      } else {
        acc.push({
          stepName,
          stepTitle: stepConfig.find((step) => step.stepName === stepName)?.stepTitle ?? '',
          fields: [fItem],
        });
      }
      return acc;
    }, []);
  }

  const properties = React.useMemo(
    () => (stepConfig ? {} : transformConfigRecursively(fieldsConfig, componentMap.current)),
    [stepConfig],
  );

  const stepProperties = React.useMemo(() => {
    const _stepProperties = (stepGroups ?? []).reduce<any>((acc, step) => {
      const { stepName, stepTitle, fields } = step;
      const _properties = transformConfigRecursively(fields, componentMap.current);
      acc[stepName] = {
        type: 'void',
        'x-component': 'FormStep.StepPane',
        'x-component-props': {
          title: stepTitle,
        },
        properties: _properties,
      };
      return acc;
    }, {});
    return _stepProperties;
  }, []);

  const stepSchemaConfig = {
    type: 'object',
    properties: {
      step: {
        type: 'void',
        'x-component': 'FormStep',
        'x-component-props': {
          formStep: '{{formStep}}',
        },
        properties: stepProperties,
      },
    },
  };

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

  const optionalComponents: Obj<CT> = stepConfig ? { FormStep } : {};
  const SchemaField = createSchemaField({
    components: { ...components, FormItem, FormLayout, FormGrid, ...optionalComponents },
  });

  const formStep = React.useMemo(() => {
    if (stepConfig) {
      // @ts-ignore
      return createFormStep();
    }
    return undefined;
  }, []);

  React.useImperativeHandle(
    formRef,
    () => {
      return {
        formStep,
      };
    },
    [formStep],
  );

  return (
    <FormProvider form={form!}>
      <Form style={style} className={className ?? ''} form={form!}>
        <SchemaField schema={stepConfig ? stepSchemaConfig : schemaConfig} scope={{ formStep }} />
        <FormConsumer>
          {() => {
            if (stepButtonGroup && stepConfig && formStep) {
              return stepButtonGroup(formStep);
            }
            return <></>;
          }}
        </FormConsumer>
      </Form>
    </FormProvider>
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
ErdaForm.onFormValuesChange = onFormValuesChange;
ErdaForm.onFormInitialValuesChange = onFormInitialValuesChange;
ErdaForm.onFormMount = onFormMount;
ErdaForm.takeAsyncDataSource = takeAsyncDataSource;
ErdaForm.registerValidateRules = registerValidateRules;
ErdaForm.observer = observer;
ErdaForm.Field = ReactField;
ErdaForm.useField = useField;
ErdaForm.useFieldSchema = useFieldSchema;
ErdaForm.RecursionField = RecursionField;
export type { FormType, Field, IFormLayoutProps, ArrayFieldType, IFormGridProps, FormLayout, FormGrid, FormRef };

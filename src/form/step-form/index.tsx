import React, { Ref } from 'react';
import { createSchemaField, FormProvider, FormConsumer } from '@formily/react';
import { Form as FormType } from '@formily/core';
import {
  Form,
  FormItem,
  FormLayout,
  FormGrid,
  FormStep,
  IFormStep,
  IFormLayoutProps,
  IFormGridProps,
} from '@formily/antd';
import { transformConfigRecursively } from '../utils';
import cn from 'classnames';
import { CT, Field as XField } from '../interface';

interface StepConfig {
  stepName: string;
  stepTitle: string;
  layoutConfig?: IFormLayoutProps;
  gridConfig?: IFormGridProps;
}

interface StepFields extends StepConfig {
  fields: XField[];
}

export interface FormRef {
  formStep?: IFormStep;
}

export interface StepFormProps<T extends Obj = any> {
  fieldsConfig: XField[];
  form?: FormType<T>;
  style?: React.CSSProperties;
  className?: string;
  stepConfig: StepConfig[];
  stepButtonGroup: (formStep: IFormStep) => React.ReactChild;
}

const { createFormStep } = FormStep;

const StepForm = <T extends Obj>({
  fieldsConfig,
  form,
  style,
  className,
  stepConfig,
  stepButtonGroup,
  formRef,
}: StepFormProps<T> & { formRef?: Ref<FormRef> }) => {
  const componentMap = React.useRef(new Map<CT, string>());

  const stepProperties = React.useMemo(() => {
    const stepGroups = fieldsConfig.reduce<StepFields[]>((acc, fItem) => {
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

    const _stepProperties = stepGroups.reduce<any>((acc, step) => {
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
  }, [fieldsConfig, stepConfig]);

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

  const components = Array.from(componentMap.current.entries()).reduce<Obj<CT>>(
    (main, [key, value]) => ({ ...main, [value]: key }),
    {},
  );

  const SchemaField = createSchemaField({
    components: { ...components, FormItem, FormLayout, FormGrid, FormStep },
  });

  const formStep = React.useMemo(() => createFormStep(), []);

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
      <Form style={style} className={cn(className)} form={form!}>
        <SchemaField schema={stepSchemaConfig} scope={{ formStep }} />
        <FormConsumer>{() => stepButtonGroup(formStep)}</FormConsumer>
      </Form>
    </FormProvider>
  );
};

export default StepForm;

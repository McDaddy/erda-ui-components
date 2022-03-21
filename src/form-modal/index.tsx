import React from 'react';
import { Modal, ModalProps } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import enUS from 'antd/lib/locale/en_US';
import Form from '../form';
import type { FormProps } from '../form';
import { Context } from '../context-provider';

const localeMap = {
  zh: zhCN.Modal,
  en: enUS.Modal,
};

export interface FormModalProps extends ModalProps {
  isEditing?: boolean;
  exactTitle?: boolean;
  formProps: FormProps;
}

const FormModal = (props: FormModalProps) => {
  const { formProps, isEditing, title, ...rest } = props;

  const { locale } = React.useContext(Context);

  const localeProps = localeMap[locale];

  const displayTitle = props.exactTitle ? title : `${isEditing ? '编辑' : '新建'}${title}`;

  return (
    <Modal title={displayTitle} {...localeProps} {...rest}>
      <Form {...formProps} />
    </Modal>
  );
};

export default FormModal;

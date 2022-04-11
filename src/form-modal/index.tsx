import React from 'react';
import { Modal, ModalProps, Spin } from 'antd';
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
  loading?: boolean;
}

const FormModal = (props: FormModalProps) => {
  const { formProps, isEditing, title, loading, ...rest } = props;

  React.useEffect(() => {
    return () => {
      formProps.form && formProps.form.reset();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { locale } = React.useContext(Context);

  const localeProps = localeMap[locale];

  const displayTitle = props.exactTitle ? title : `${isEditing ? '编辑' : '新建'}${title}`;

  return (
    <Modal title={displayTitle} {...localeProps} {...rest}>
      <Spin spinning={!!loading}>
        <Form {...formProps} />
      </Spin>
    </Modal>
  );
};

export default FormModal;

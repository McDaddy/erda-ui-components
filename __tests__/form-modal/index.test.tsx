import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Form from 'src/form';
import FormModal from 'src/form-modal';
import ConfigProvider from 'src/context-provider';
import { Input, Button } from 'antd';

const { createForm, createFields } = Form;

const form = createForm();

const formFieldsList = createFields([
  {
    component: Input,
    title: '姓名',
    name: 'username',
    customProps: {
      placeholder: '请输入姓名',
    },
  },
]);

const TestModalComp = () => {
  const [visible, setVisible] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [exactTitle, setExactTitle] = React.useState(false);

  const onSubmitForm = () => {
    // eslint-disable-next-line no-console
    console.log('value', form.values);
  };

  return (
    <ConfigProvider>
      <Button data-testid="showBtn" onClick={() => setVisible(true)}>
        新建
      </Button>
      <Button
        data-testid="editBtn"
        onClick={() => {
          setVisible(true);
          setIsEditing(true);
        }}
      >
        编辑
      </Button>
      <Button
        data-testid="titleBtn"
        onClick={() => {
          setVisible(true);
          setExactTitle(true);
        }}
      >
        精确标题
      </Button>
      <FormModal
        isEditing={isEditing}
        title="应用"
        exactTitle={exactTitle}
        visible={visible}
        onOk={onSubmitForm}
        onCancel={() => setVisible(false)}
        formProps={{
          form,
          layoutConfig: { layout: 'vertical' },
          fieldsConfig: formFieldsList,
        }}
      />
    </ConfigProvider>
  );
};

describe('erda form modal test', () => {
  it('render basic form modal', async () => {
    render(<TestModalComp />);
    userEvent.click(screen.getByTestId('showBtn'));
    await waitFor(() => {
      expect(screen.getByText('姓名')).toBeInTheDocument();
      expect(screen.getByText('新建应用')).toBeInTheDocument();
    });
    userEvent.click(screen.getByRole('button', { name: /取.*消/i }));
    userEvent.click(screen.getByTestId('editBtn'));
    await waitFor(() => {
      expect(screen.getByText('编辑应用')).toBeInTheDocument();
    });
    userEvent.click(screen.getByRole('button', { name: /取.*消/i }));
    userEvent.click(screen.getByTestId('titleBtn'));
    await waitFor(() => {
      expect(screen.getByText('应用')).toBeInTheDocument();
    });
  });
});

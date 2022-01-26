import React from 'react';
import { Button as AntButton } from 'antd';
import { ButtonProps as AntButtonProps } from 'antd/lib/button';

export interface ButtonProps extends AntButtonProps {
  children: React.ReactNode;
  type?: 'primary' | 'ghost' | 'dashed';
  size?: 'small' | 'large';
}

const Button = (props: ButtonProps) => {
  const { children, ...rest } = props;

  return (
    <AntButton {...rest}>
      <div>{children}</div>
    </AntButton>
  );
};

export default Button;

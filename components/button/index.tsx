import React from 'react';
import { Button as AntButton } from 'antd';

export interface ButtonProps {
  children: React.ReactNode;
  type?: 'primary' | 'ghost' | 'dashed';
  size?: 'small' | 'large';
}

const Button = (props: ButtonProps) => {
  const { children, ...rest } = props;
  return <AntButton {...rest}>{children}</AntButton>;
};

export default Button;

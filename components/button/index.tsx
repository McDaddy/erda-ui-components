import React from 'react';
import { Button as AntButton } from 'antd';
import { ButtonProps as AntButtonProps } from 'antd/es/button';
import { ConfigContext } from '../config-provider';

export interface ButtonProps extends AntButtonProps {
  children: React.ReactNode;
  type?: 'primary' | 'ghost' | 'dashed';
  size?: 'small' | 'large';
}

const Button = (props: ButtonProps) => {
  const { children, prefixCls: customizePrefixCls, ...rest } = props;

  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('btn', customizePrefixCls);

  return (
    <AntButton {...rest}>
      <div className={`${prefixCls}-test`}>{children}</div>
    </AntButton>
  );
};

export default Button;

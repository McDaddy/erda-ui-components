import React from 'react';
import { Select as AntSelect } from '@formily/antd';
import { SelectProps, SelectValue } from 'antd/es/select';
import { ConfigContext } from '../config-provider';

const Select = (props: SelectProps<SelectValue>) => {
  const { children, prefixCls: customizePrefixCls, ...rest } = props;

  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('select', customizePrefixCls);

  return (
    <AntSelect prefixCls={prefixCls} {...rest}>
      {children}
    </AntSelect>
  );
};

export default Select;

import React from 'react';
import { Tooltip } from 'antd';
import { ConfigContext } from '../config-provider';
import { ossImg } from '../_util';

import './style/index.less';

interface IProps {
  url?: string;
  showName?: boolean | 'tooltip'; // true means show name after img, tooltip means show name in tooltip
  name?: string | React.ReactNode;
  size?: number;
  className?: string;
  wrapClassName?: string;
  imgPresets?: (string | React.ReactNode)[];
}

const Avatar = (props: IProps) => {
  const { url, showName = false, name, size = 24, className = '', wrapClassName = '', imgPresets } = props;

  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('avatar');

  const userName = name || '';
  const style = { width: `${size}px`, height: `${size}px` };

  let wrapName = (child: any) => child;
  if (showName === true) {
    // show name after avatar img
    wrapName = (child) => (
      <span className={`${prefixCls}-wrapper ${wrapClassName}`}>
        {child}
        <Tooltip title={userName}>
          <span className={`${prefixCls}-inner-name`}>{userName}</span>
        </Tooltip>
      </span>
    );
  }

  if (showName === 'tooltip') {
    wrapName = (child) => (
      <Tooltip title={userName}>
        <span>{child}</span>
      </Tooltip>
    );
  }

  if (url) {
    return wrapName(
      <img
        className={`${prefixCls}-img ${className}`}
        style={style}
        src={ossImg(url, { w: Math.floor(size * 1.2) })}
        alt="user-avatar"
      />,
    );
  }

  if (typeof userName === 'string' && imgPresets?.length) {
    let asciiSum = 0;
    for (let index = 0; index < userName.length; index++) {
      asciiSum += userName.charCodeAt(index);
    }
    const iconIndex = asciiSum % imgPresets.length;
    const avatarImg = imgPresets[iconIndex];
    return wrapName(
      typeof avatarImg === 'string' ? (
        <img
          className={`${prefixCls}-img ${className}`}
          style={style}
          src={ossImg(avatarImg, { w: Math.floor(size * 1.2) })}
          alt="user-avatar"
        />
      ) : (
        avatarImg
      ),
    );
  }
};

export default Avatar;

import React from 'react';
import { Tooltip } from 'antd';
import { ossImg } from '../_util';

export interface AvatarProps {
  url?: string;
  showName?: boolean | 'tooltip'; // true means show name after img, tooltip means show name in tooltip
  name?: string | React.ReactNode;
  size?: number;
  className?: string;
  wrapClassName?: string;
  imgPresets?: (string | React.ReactNode)[];
}

const Avatar = (props: AvatarProps) => {
  const { url, showName = false, name, size = 24, className = '', wrapClassName = '', imgPresets } = props;

  const userName = name || '';
  const style = { width: `${size}px`, height: `${size}px` };

  let wrapName = (child: any) => child;
  if (showName === true) {
    // show name after avatar img
    wrapName = (child) => (
      <span className={wrapClassName}>
        {child}
        <Tooltip title={userName}>
          <span className={className}>{userName}</span>
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
      <img className={className} style={style} src={ossImg(url, { w: Math.floor(size * 1.2) })} alt="user-avatar" />,
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
          className={className}
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

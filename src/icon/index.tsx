import React from 'react';
import cn from 'classnames';

export let iconMap: Obj<string> = {};
let themeColor: Obj<string> = {};

export interface ErdaIconProps<T = any> {
  className?: string;
  type: string; // unique identification of icon
  style?: React.CSSProperties;
  width?: string; // with of svg, and it's more priority than size
  height?: string; // height of svg, and it's more priority than size
  spin?: boolean; // use infinite rotate animation like loading icon, the default value is false
  size?: string | number; // size of svg with default value of 1rem. Use width and height if width-to-height ratio is not 1
  fill?: T; // color of svg fill area, and it's more priority than color
  stroke?: T; // color of svg stroke, and it's more priority than color
  color?: T; // color of svg
  rtl?: boolean; // acoustic image, the default value is from left to right
  onClick?: React.MouseEventHandler;
  opacity?: number;
  disableCurrent?: boolean; // true = use origin color
}

const ErdaIcon = ({ type, fill, disableCurrent = false, color, stroke, className, ...rest }: ErdaIconProps) => {
  const [fillVal, colorVal, strokeVal] = disableCurrent
    ? []
    : [
        fill ? themeColor[fill] : 'currentColor',
        color ? themeColor[color] : 'currentColor',
        stroke ? themeColor[stroke] : 'currentColor',
      ];

  return (
    // @ts-ignore iconpark component
    <iconpark-icon
      name={iconMap[type] ?? type}
      fill={fillVal}
      color={colorVal}
      stroke={strokeVal}
      class={cn(className)}
      {...rest}
    />
  );
};

ErdaIcon.themeColor = themeColor;

export const useErdaIcon = ({
  url: scriptUrl,
  mapping,
  colors,
}: {
  url: string | string[];
  mapping?: Obj<string>;
  colors?: Obj<string>;
}) => {
  if (mapping) {
    iconMap = mapping;
  }
  if (colors) {
    themeColor = colors;
  }

  React.useLayoutEffect(() => {
    const scripts: HTMLScriptElement[] = [];
    const scriptUrls = Array.isArray(scriptUrl) ? scriptUrl : [scriptUrl];
    scriptUrls.forEach((url) => {
      const script = document.createElement('script');
      script.src = url;
      script.async = true;
      document.body.appendChild(script);
      scripts.push(script);
    });

    return () => {
      scripts.forEach((script) => {
        document.body.removeChild(script);
      });
    };
  }, [scriptUrl]);
};

export default ErdaIcon;

interface IOssConfig {
  w?: number;
  h?: number;
  op?: string;
}

export const removeProtocol = (src: string) => {
  if (src && src.startsWith('http://')) {
    return src.slice('http:'.length);
  }
  return src;
};

export const ossImg = (src: string | undefined | null, config: IOssConfig = { w: 200, h: 200 }) => {
  if (src === undefined || src === null) {
    return undefined;
  }
  if (!src.includes('oss')) {
    // local image
    return src;
  }
  const { op, ...params } = config;
  const _params = Object.keys(params).reduce((all, key) => `${all},${key}_${params[key as 'w' | 'h']}`, '');
  return `${removeProtocol(src)}?x-oss-process=image/${op || 'resize'}${_params}`;
};

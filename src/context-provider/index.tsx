import React from 'react';

interface IContext {
  locale: 'zh' | 'en';
  clsPrefix: string;
}

export const Context = React.createContext<IContext>({
  locale: 'zh',
  clsPrefix: 'erda',
});

const ContextProvider = ({ children, locale, clsPrefix }: Partial<IContext> & { children: React.ReactNode }) => {
  const contextValue = React.useMemo(
    () => ({ locale: locale ?? 'zh', clsPrefix: clsPrefix ?? 'erda' }),
    [clsPrefix, locale],
  );
  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default ContextProvider;

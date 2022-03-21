import React from 'react';

interface IContext {
  locale: 'zh' | 'en';
}

export const Context = React.createContext<IContext>({
  locale: 'zh',
});

const ContextProvider = ({ children, locale }: IContext & { children: React.ReactNode }) => {
  const contextValue = React.useMemo(() => ({ locale: locale ?? 'zh' }), [locale]);
  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default ContextProvider;

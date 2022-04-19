import React from 'react';
import LocaleContext from './context';
import defaultLocaleData from '../locale/default';

export type LocaleComponentName = Exclude<keyof Locale, 'locale'>;

export interface Locale {
  locale: string;
  FormModal: {
    newForm: string;
    editForm: string;
  };
  Table: {
    emptyText: string;
    firstPage: string;
    ascend: string;
    descend: string;
    cancelSort: string;
  };
}

export interface LocaleProviderProps {
  locale: Locale;
  children?: React.ReactNode;
}

const ErdaLocaleProvider = (props: LocaleProviderProps) => {
  const { locale, children } = props;

  const getMemoizedContextValue = React.useCallback(
    (localeValue: Locale): Locale & { exist?: boolean } => ({
      ...localeValue,
      exist: true,
    }),
    [],
  );

  const contextValue = getMemoizedContextValue(locale);

  return <LocaleContext.Provider value={contextValue}>{children}</LocaleContext.Provider>;
};

export function useLocaleReceiver<T extends LocaleComponentName>(
  componentName: T,
  defaultLocale?: Locale[T] | Function,
): [Locale[T]] {
  const erdaLocale = React.useContext(LocaleContext);

  const componentLocale = React.useMemo(() => {
    const locale = defaultLocale || defaultLocaleData[componentName || 'global'];
    const localeFromContext = componentName && erdaLocale ? erdaLocale[componentName] : {};

    return {
      ...(typeof locale === 'function' ? (locale as Function)() : locale),
      ...(localeFromContext || {}),
    };
  }, [componentName, defaultLocale, erdaLocale]);

  return [componentLocale];
}

export default ErdaLocaleProvider;

/**
 * Replace with template.
 *   `I'm ${name}` + { name: 'bamboo' } = I'm bamboo
 */
export function replaceMessage(template: string, kv: Record<string, string>): string {
  return template.replace(/\$\{\w+\}/g, (str: string) => {
    const key = str.slice(2, -1);
    return kv[key];
  });
}

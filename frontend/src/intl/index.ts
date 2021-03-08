import { IntlConfig } from 'react-intl';
import formats from './formats';
import getLocale from './getLocale';
import messages from './messages';

const defaultLanguages = ['pt'];

function getLocalizedObject(object: any, locale: any, depth = 0) {
  return Object.keys(object).reduce((localized: any, key) => {
    localized[key] = depth
      ? getLocalizedObject(object[key], locale, depth - 1)
      : object[key][locale];
    return localized;
  }, {});
}

export const getIntlProps = (availableLanguages: string[] = defaultLanguages): IntlConfig => {
  const locale = getLocale(availableLanguages);
  const defaultFormats = getLocalizedObject(formats, locale, 1);
  return {
    locale,
    messages: getLocalizedObject(messages, locale),
    formats: defaultFormats,
    defaultLocale: locale,
    defaultFormats,
    onError: (err: Error): void => {},
  };
};

export default function getLocale(supportedLocales: string[]): string {
  if (!navigator) {
    return supportedLocales[0];
  }

  let language;
  if (navigator.languages) {
    language = navigator.languages[0];
  } else {
    language = navigator.language || '';
  }

  const locale = language.split('-')[0];
  return supportedLocales.includes(locale) ? locale : supportedLocales[0];
}

import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({requestLocale}) => {
  // Get and await the locale from the request
  let locale = await requestLocale;
 
  // Fallback to 'en' if locale is undefined
  if (!locale) {
    locale = 'en';
  }
 
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});

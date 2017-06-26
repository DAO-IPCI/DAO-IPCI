/* eslint import/no-unresolved: 0 */
/* eslint import/no-extraneous-dependencies: 0 */
/* eslint import/no-webpack-loader-syntax: 0 */
/* eslint import/extensions: 0 */
import i18n from 'i18next';
// import XHR from 'i18next-xhr-backend';
import resBundle from 'i18next-resource-store-loader!../locales/index'

i18n
  // .use(XHR)
  .init({
    whitelist: ['en', 'ru'],
    resources: resBundle,

    fallbackLng: 'en',
    // lng: 'ru',

    // have a common namespace used around the full app
    ns: ['common'],
    defaultNS: 'common',

    // debug: true,

    interpolation: {
      escapeValue: false // not needed for react!!
    }
  });

export default i18n;

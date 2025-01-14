import { i18n } from '@lingui/core';
import { en, ko } from 'make-plural';
import catalogEn from '../locales/en/messages';
import catalogKo from '../locales/ko/messages';

i18n.loadLocaleData({
  en: { plurals: en },
  ko: { plurals: ko }
});

i18n.load({ en: catalogEn.messages, ko: catalogKo.messages });

export const changeActiveLanguage = (newActiveLanguage: string) => {
  i18n.activate(newActiveLanguage);
};

export default i18n;

import { clientTranslations } from './clientTranslations';
import { clientTranslationsExtra } from './clientTranslationsExtra';
import { clientTranslationsCoverage } from './clientTranslationsCoverage';
import { clientTranslationsCharter } from './clientTranslationsCharter';
import { clientTranslationsMembership } from './clientTranslationsMembership';
import { clientTranslationsForms } from './clientTranslationsForms';
import { clientTranslationsManual } from './clientTranslationsManual';
import type { Lang } from './utils';

export const dictionary: Record<Lang, Record<string, string>> = {
  en: {},
  'zh-cn': {
    ...clientTranslations['zh-cn'],
    ...clientTranslationsExtra['zh-cn'],
    ...clientTranslationsCoverage['zh-cn'],
    ...clientTranslationsCharter['zh-cn'],
    ...clientTranslationsMembership['zh-cn'],
    ...clientTranslationsForms['zh-cn'],
    ...clientTranslationsManual['zh-cn'],
  },
  'zh-tw': {
    ...clientTranslations['zh-tw'],
    ...clientTranslationsExtra['zh-tw'],
    ...clientTranslationsCoverage['zh-tw'],
    ...clientTranslationsCharter['zh-tw'],
    ...clientTranslationsMembership['zh-tw'],
    ...clientTranslationsForms['zh-tw'],
    ...clientTranslationsManual['zh-tw'],
  },
};

export function translate(lang: Lang, text: string): string {
  if (lang === 'en') return text;
  const trimmed = text.trim();
  return dictionary[lang]?.[trimmed] ?? text;
}

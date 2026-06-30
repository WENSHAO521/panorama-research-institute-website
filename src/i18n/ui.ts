import type { Lang } from './utils';

export const ui: Record<Lang, Record<string, string>> = {
  en: {
    'nav.institute': 'Institute',
    'nav.governance': 'Governance',
    'nav.research': 'Research',
    'nav.publications': 'Publications',
    'nav.events': 'Events',
    'nav.people': 'People',
    'nav.collaboration': 'Collaboration',
    'nav.resources': 'Resources',
    'nav.platforms': 'Our Platforms',

    'btn.contact': 'Contact',
    'btn.apply': 'Apply',
    'btn.download': 'Download',

    'footer.division': 'A Division of Panorama Scholarly Group',
    'footer.statement': 'Panorama Research Institute is an internal research and academic development division of Panorama Scholarly Group and is not a separate legal entity.',
    'footer.col.institute': 'Institute',
    'footer.col.governance': 'Governance',
    'footer.col.research': 'Research',
    'footer.col.platforms': 'Panorama Platforms',
    'footer.copyright': '© {year} Panorama Scholarly Group. All rights reserved.',
    'footer.charter': 'Charter',
    'footer.ethics': 'Research Ethics',
    'footer.contact': 'Contact',

    'breadcrumb.home': 'Home',

    'tag.active': 'Active',
    'tag.upcoming': 'Upcoming',
    'tag.planned': 'Planned',
    'tag.in-prep': 'In Preparation',
    'tag.in-dev': 'In Development',
    'tag.open': 'Open',
    'tag.ongoing': 'Ongoing',
  },
  'zh-cn': {},
  'zh-tw': {},
};

export function useTranslations(lang: Lang) {
  return function t(key: string): string {
    return ui[lang][key] ?? ui.en[key] ?? key;
  };
}

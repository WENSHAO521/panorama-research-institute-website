import type { Lang } from './utils';

export const ui: Record<Lang, Record<string, string>> = {
  en: {
    'nav.institute':     'Institute',
    'nav.governance':    'Governance',
    'nav.research':      'Research',
    'nav.publications':  'Publications',
    'nav.events':        'Events',
    'nav.people':        'People',
    'nav.collaboration': 'Collaboration',
    'nav.resources':     'Resources',
    'nav.platforms':     'Our Platforms',

    'btn.contact':  'Contact',
    'btn.apply':    'Apply',
    'btn.download': 'Download',

    'footer.division':   'A Division of Panorama Scholarly Group',
    'footer.statement':  'Panorama Research Institute is an internal research and academic development division of Panorama Scholarly Group and is not a separate legal entity.',
    'footer.col.institute':  'Institute',
    'footer.col.governance': 'Governance',
    'footer.col.research':   'Research',
    'footer.col.platforms':  'Panorama Platforms',
    'footer.copyright':  '© {year} Panorama Scholarly Group. All rights reserved.',
    'footer.charter':    'Charter',
    'footer.ethics':     'Research Ethics',
    'footer.contact':    'Contact',

    'breadcrumb.home': 'Home',

    'tag.active':        'Active',
    'tag.upcoming':      'Upcoming',
    'tag.planned':       'Planned',
    'tag.in-prep':       'In Preparation',
    'tag.in-dev':        'In Development',
    'tag.open':          'Open',
    'tag.ongoing':       'Ongoing',

    'lang.notice.title': 'Page available in English only',
    'lang.notice.body':  'This page has not yet been translated. You are viewing the English version.',
  },

  'zh-cn': {
    'nav.institute':     '研究院',
    'nav.governance':    '治理',
    'nav.research':      '研究',
    'nav.publications':  '出版物',
    'nav.events':        '活动',
    'nav.people':        '人员',
    'nav.collaboration': '合作',
    'nav.resources':     '资源',
    'nav.platforms':     '平台',

    'btn.contact':  '联系我们',
    'btn.apply':    '申请',
    'btn.download': '下载',

    'footer.division':   '全景学术集团下设部门',
    'footer.statement':  '全景研究院是全景学术集团的内部研究与学术发展部门，不具备独立法人资格。',
    'footer.col.institute':  '研究院',
    'footer.col.governance': '治理',
    'footer.col.research':   '研究',
    'footer.col.platforms':  '全景平台',
    'footer.copyright':  '© {year} 全景学术集团。保留所有权利。',
    'footer.charter':    '研究院章程',
    'footer.ethics':     '研究伦理',
    'footer.contact':    '联系我们',

    'breadcrumb.home': '首页',

    'tag.active':        '进行中',
    'tag.upcoming':      '即将开展',
    'tag.planned':       '规划中',
    'tag.in-prep':       '筹备中',
    'tag.in-dev':        '开发中',
    'tag.open':          '开放',
    'tag.ongoing':       '持续进行',

    'lang.notice.title': '此页面仅提供英文版本',
    'lang.notice.body':  '此页面尚未翻译为中文，您正在浏览英文版本。',
  },

  'zh-tw': {
    'nav.institute':     '研究院',
    'nav.governance':    '治理',
    'nav.research':      '研究',
    'nav.publications':  '出版物',
    'nav.events':        '活動',
    'nav.people':        '人員',
    'nav.collaboration': '合作',
    'nav.resources':     '資源',
    'nav.platforms':     '平台',

    'btn.contact':  '聯絡我們',
    'btn.apply':    '申請',
    'btn.download': '下載',

    'footer.division':   '全景學術集團下設部門',
    'footer.statement':  '全景研究院是全景學術集團的內部研究與學術發展部門，不具備獨立法人資格。',
    'footer.col.institute':  '研究院',
    'footer.col.governance': '治理',
    'footer.col.research':   '研究',
    'footer.col.platforms':  '全景平台',
    'footer.copyright':  '© {year} 全景學術集團。保留所有權利。',
    'footer.charter':    '研究院章程',
    'footer.ethics':     '研究倫理',
    'footer.contact':    '聯絡我們',

    'breadcrumb.home': '首頁',

    'tag.active':        '進行中',
    'tag.upcoming':      '即將開展',
    'tag.planned':       '規劃中',
    'tag.in-prep':       '籌備中',
    'tag.in-dev':        '開發中',
    'tag.open':          '開放',
    'tag.ongoing':       '持續進行',

    'lang.notice.title': '此頁面僅提供英文版本',
    'lang.notice.body':  '此頁面尚未翻譯為中文，您正在瀏覽英文版本。',
  },
};

export function useTranslations(lang: Lang) {
  return function t(key: string): string {
    return ui[lang][key] ?? ui['en'][key] ?? key;
  };
}

import type { Lang } from './utils';
import type { NavItem } from '../data/navigation';
import { navigation as enNav } from '../data/navigation';
import { localizedSecondarySlugs } from './secondaryPages';

// Pages available in each locale (overview pages only)
const localizedSet = new Set([
  '/', '/about', '/charter', '/research-areas', '/research-centers',
  '/projects', '/framework', '/publications', '/events', '/people',
  '/collaboration', '/resources', '/contact',
]);

function localizeHref(lang: Lang, href: string, external?: boolean): string {
  if (lang === 'en' || external || href === '#' || href.startsWith('http')) return href;
  if (href.startsWith(`/${lang}`)) return href;
  if (localizedSet.has(href) || localizedSecondarySlugs.has(href)) {
    return `/${lang}${href === '/' ? '' : href}`;
  }
  return href;
}

function localizeNav(items: NavItem[], lang: Lang): NavItem[] {
  return items.map((item) => ({
    ...item,
    href: localizeHref(lang, item.href),
    children: item.children?.map((child) => ({
      ...child,
      href: localizeHref(lang, child.href, child.external),
    })),
    groups: item.groups?.map((group) => ({
      ...group,
      links: group.links.map((link) => ({
        ...link,
        href: localizeHref(lang, link.href, link.external),
      })),
    })),
  }));
}

const zhCnNav: NavItem[] = [
  {
    label: '研究院',
    href: '/zh-cn/about',
    children: [
      { label: '简介',         href: '/zh-cn/about' },
      { label: '使命与愿景',   href: '/about/mission-vision' },
      { label: '机构性质',     href: '/about/institutional-status' },
      { label: '研究院框架',   href: '/zh-cn/framework' },
      { label: '组织架构',     href: '/framework/organizational-structure' },
      { label: '发展路线图',   href: '/framework/development-roadmap' },
      { label: '联系我们',     href: '/zh-cn/contact' },
    ],
  },
  {
    label: '治理',
    href: '/zh-cn/charter',
    children: [
      { label: '研究院章程',           href: '/zh-cn/charter' },
      { label: '治理规则',             href: '/governance/rules' },
      { label: '学术独立声明',         href: '/governance/academic-independence' },
      { label: '研究伦理政策',         href: '/governance/research-ethics' },
      { label: '利益冲突政策',         href: '/governance/conflict-of-interest' },
      { label: '出版与报告政策',       href: '/governance/publication-report-policy' },
      { label: '数据与文档政策',       href: '/governance/data-documentation-policy' },
      { label: '名称与标志使用规定',   href: '/governance/name-logo-usage' },
      { label: '章程修订程序',         href: '/governance/amendment-procedure' },
    ],
  },
  {
    label: '研究',
    href: '/zh-cn/research-areas',
    mega: true,
    groups: [
      {
        title: '研究结构',
        links: [
          { label: '研究领域',   href: '/zh-cn/research-areas' },
          { label: '研究中心',   href: '/zh-cn/research-centers' },
          { label: '研究项目',   href: '/zh-cn/projects' },
          { label: '当前项目',   href: '/projects/current' },
          { label: '项目档案',   href: '/projects/archive' },
        ],
      },
      {
        title: '研究中心',
        links: [
          { label: '学术出版研究中心',     href: '/research-centers/scholarly-publishing-studies' },
          { label: '学术索引与评价研究中心', href: '/research-centers/scholarly-indexing-evaluation' },
          { label: '政策与社会研究中心',   href: '/research-centers/policy-social-research' },
          { label: '人工智能与未来社会研究中心', href: '/research-centers/ai-future-society' },
        ],
      },
      {
        title: '当前项目',
        links: [
          { label: '全景开放学术索引项目', href: '/projects/posi-scholarly-indexing' },
          { label: '第十五个五年规划研究', href: '/projects/fifteenth-five-year-plan-studies' },
          { label: '人工智能与未来社会',   href: '/projects/ai-future-society' },
          { label: '青少年数字治理研究',   href: '/projects/youth-digital-governance' },
        ],
      },
    ],
  },
  {
    label: '出版物',
    href: '/zh-cn/publications',
    children: [
      { label: '出版物总览',     href: '/zh-cn/publications' },
      { label: '研究报告',       href: '/publications/research-reports' },
      { label: '工作论文',       href: '/publications/working-papers' },
      { label: '政策简报',       href: '/publications/policy-briefs' },
      { label: '主编学术文集',   href: '/publications/edited-volumes' },
      { label: '年度报告',       href: '/publications/annual-reports' },
      { label: '出版指南',       href: '/publications/guidelines' },
      { label: '引用格式',       href: '/publications/citation' },
    ],
  },
  {
    label: '活动',
    href: '/zh-cn/events',
    children: [
      { label: '活动总览',     href: '/zh-cn/events' },
      { label: '学术会议',     href: '/events/conferences' },
      { label: '学术研讨会',   href: '/events/seminars' },
      { label: '工作坊',       href: '/events/workshops' },
      { label: '征稿启事',     href: '/events/calls-for-papers' },
      { label: '征集书稿',     href: '/events/calls-for-chapters' },
      { label: '培训项目',     href: '/events/training-programs' },
      { label: '往期活动',     href: '/events/archive' },
    ],
  },
  {
    label: '人员',
    href: '/zh-cn/people',
    children: [
      { label: '研究院领导',     href: '/zh-cn/people' },
      { label: '研究员',         href: '/people/research-fellows' },
      { label: '副研究员',       href: '/people/associate-research-fellows' },
      { label: '访问学者',       href: '/people/visiting-scholars' },
      { label: '研究助理',       href: '/people/research-assistants' },
      { label: '顾问委员会',     href: '/people/advisory-board' },
      { label: '项目合作者',     href: '/people/project-contributors' },
      { label: '加入研究团队',   href: '/people/join' },
    ],
  },
  {
    label: '合作',
    href: '/zh-cn/collaboration',
    children: [
      { label: '合作总览',           href: '/zh-cn/collaboration' },
      { label: '机构合作',           href: '/collaboration/institutional-cooperation' },
      { label: '提交研究项目方案',   href: '/collaboration/research-project-proposal' },
      { label: '主编学术文集方案',   href: '/collaboration/edited-volume-proposal' },
      { label: '特刊合作方案',       href: '/collaboration/special-issue-proposal' },
      { label: '访问学者申请',       href: '/collaboration/visiting-scholar-application' },
      { label: '研究员申请',         href: '/collaboration/research-fellow-application' },
      { label: '活动合作',           href: '/collaboration/event-cooperation' },
      { label: '提交合作申请',       href: '/collaboration/submit' },
    ],
  },
  {
    label: '资源',
    href: '/zh-cn/resources',
    children: [
      { label: '资源总览',           href: '/zh-cn/resources' },
      { label: '表格',               href: '/resources/forms' },
      { label: '模板',               href: '/resources/templates' },
      { label: '指南',               href: '/resources/guidelines' },
      { label: '研究院章程PDF',       href: '/resources/charter-pdf' },
      { label: '研究方案模板',       href: '/resources/research-proposal-template' },
      { label: '研究报告模板',       href: '/resources/report-template' },
      { label: '政策简报模板',       href: '/resources/policy-brief-template' },
      { label: '标志使用指南',       href: '/resources/logo-usage-guidelines' },
    ],
  },
  {
    label: '平台',
    href: '#',
    children: [
      { label: '全景学术集团',   href: 'https://www.panorama-sg.com',        external: true },
      { label: '全景期刊',       href: 'https://journals.panorama-sg.com',   external: true },
      { label: '全景图书',       href: 'https://books.panorama-sg.com',      external: true },
      { label: 'POSI数据库',     href: 'https://posi.panorama-sg.com',       external: true },
      { label: '学者档案',       href: 'https://scholars.panorama-sg.com',   external: true },
    ],
  },
];

const zhTwNav: NavItem[] = [
  {
    label: '研究院',
    href: '/zh-tw/about',
    children: [
      { label: '簡介',         href: '/zh-tw/about' },
      { label: '使命與願景',   href: '/about/mission-vision' },
      { label: '機構性質',     href: '/about/institutional-status' },
      { label: '研究院框架',   href: '/zh-tw/framework' },
      { label: '組織架構',     href: '/framework/organizational-structure' },
      { label: '發展路線圖',   href: '/framework/development-roadmap' },
      { label: '聯絡我們',     href: '/zh-tw/contact' },
    ],
  },
  {
    label: '治理',
    href: '/zh-tw/charter',
    children: [
      { label: '研究院章程',           href: '/zh-tw/charter' },
      { label: '治理規則',             href: '/governance/rules' },
      { label: '學術獨立聲明',         href: '/governance/academic-independence' },
      { label: '研究倫理政策',         href: '/governance/research-ethics' },
      { label: '利益衝突政策',         href: '/governance/conflict-of-interest' },
      { label: '出版與報告政策',       href: '/governance/publication-report-policy' },
      { label: '資料與文件政策',       href: '/governance/data-documentation-policy' },
      { label: '名稱與標誌使用規定',   href: '/governance/name-logo-usage' },
      { label: '章程修訂程序',         href: '/governance/amendment-procedure' },
    ],
  },
  {
    label: '研究',
    href: '/zh-tw/research-areas',
    mega: true,
    groups: [
      {
        title: '研究結構',
        links: [
          { label: '研究領域',   href: '/zh-tw/research-areas' },
          { label: '研究中心',   href: '/zh-tw/research-centers' },
          { label: '研究項目',   href: '/zh-tw/projects' },
          { label: '當前項目',   href: '/projects/current' },
          { label: '項目檔案',   href: '/projects/archive' },
        ],
      },
      {
        title: '研究中心',
        links: [
          { label: '學術出版研究中心',       href: '/research-centers/scholarly-publishing-studies' },
          { label: '學術索引與評價研究中心', href: '/research-centers/scholarly-indexing-evaluation' },
          { label: '政策與社會研究中心',     href: '/research-centers/policy-social-research' },
          { label: '人工智慧與未來社會研究中心', href: '/research-centers/ai-future-society' },
        ],
      },
      {
        title: '當前項目',
        links: [
          { label: '全景開放學術索引項目', href: '/projects/posi-scholarly-indexing' },
          { label: '第十五個五年規劃研究', href: '/projects/fifteenth-five-year-plan-studies' },
          { label: '人工智慧與未來社會',   href: '/projects/ai-future-society' },
          { label: '青少年數位治理研究',   href: '/projects/youth-digital-governance' },
        ],
      },
    ],
  },
  {
    label: '出版物',
    href: '/zh-tw/publications',
    children: [
      { label: '出版物總覽',     href: '/zh-tw/publications' },
      { label: '研究報告',       href: '/publications/research-reports' },
      { label: '工作論文',       href: '/publications/working-papers' },
      { label: '政策簡報',       href: '/publications/policy-briefs' },
      { label: '主編學術文集',   href: '/publications/edited-volumes' },
      { label: '年度報告',       href: '/publications/annual-reports' },
      { label: '出版指南',       href: '/publications/guidelines' },
      { label: '引用格式',       href: '/publications/citation' },
    ],
  },
  {
    label: '活動',
    href: '/zh-tw/events',
    children: [
      { label: '活動總覽',     href: '/zh-tw/events' },
      { label: '學術會議',     href: '/events/conferences' },
      { label: '學術研討會',   href: '/events/seminars' },
      { label: '工作坊',       href: '/events/workshops' },
      { label: '徵稿啟事',     href: '/events/calls-for-papers' },
      { label: '徵集書稿',     href: '/events/calls-for-chapters' },
      { label: '培訓項目',     href: '/events/training-programs' },
      { label: '往期活動',     href: '/events/archive' },
    ],
  },
  {
    label: '人員',
    href: '/zh-tw/people',
    children: [
      { label: '研究院領導',     href: '/zh-tw/people' },
      { label: '研究員',         href: '/people/research-fellows' },
      { label: '副研究員',       href: '/people/associate-research-fellows' },
      { label: '訪問學者',       href: '/people/visiting-scholars' },
      { label: '研究助理',       href: '/people/research-assistants' },
      { label: '顧問委員會',     href: '/people/advisory-board' },
      { label: '項目合作者',     href: '/people/project-contributors' },
      { label: '加入研究團隊',   href: '/people/join' },
    ],
  },
  {
    label: '合作',
    href: '/zh-tw/collaboration',
    children: [
      { label: '合作總覽',           href: '/zh-tw/collaboration' },
      { label: '機構合作',           href: '/collaboration/institutional-cooperation' },
      { label: '提交研究項目方案',   href: '/collaboration/research-project-proposal' },
      { label: '主編學術文集方案',   href: '/collaboration/edited-volume-proposal' },
      { label: '特刊合作方案',       href: '/collaboration/special-issue-proposal' },
      { label: '訪問學者申請',       href: '/collaboration/visiting-scholar-application' },
      { label: '研究員申請',         href: '/collaboration/research-fellow-application' },
      { label: '活動合作',           href: '/collaboration/event-cooperation' },
      { label: '提交合作申請',       href: '/collaboration/submit' },
    ],
  },
  {
    label: '資源',
    href: '/zh-tw/resources',
    children: [
      { label: '資源總覽',         href: '/zh-tw/resources' },
      { label: '表格',             href: '/resources/forms' },
      { label: '範本',             href: '/resources/templates' },
      { label: '指南',             href: '/resources/guidelines' },
      { label: '研究院章程PDF',     href: '/resources/charter-pdf' },
      { label: '研究方案範本',     href: '/resources/research-proposal-template' },
      { label: '研究報告範本',     href: '/resources/report-template' },
      { label: '政策簡報範本',     href: '/resources/policy-brief-template' },
      { label: '標誌使用指南',     href: '/resources/logo-usage-guidelines' },
    ],
  },
  {
    label: '平台',
    href: '#',
    children: [
      { label: '全景學術集團',   href: 'https://www.panorama-sg.com',        external: true },
      { label: '全景期刊',       href: 'https://journals.panorama-sg.com',   external: true },
      { label: '全景圖書',       href: 'https://books.panorama-sg.com',      external: true },
      { label: 'POSI資料庫',     href: 'https://posi.panorama-sg.com',       external: true },
      { label: '學者檔案',       href: 'https://scholars.panorama-sg.com',   external: true },
    ],
  },
];

export function getNavigation(lang: Lang): NavItem[] {
  if (lang === 'zh-cn') return localizeNav(zhCnNav, lang);
  if (lang === 'zh-tw') return localizeNav(zhTwNav, lang);
  return enNav;
}

import type { Lang } from '../i18n/utils';

export type AnnouncementCategory = 'recruitment' | 'notice' | 'update';

export interface Announcement {
  slug: string;
  category: AnnouncementCategory;
  date: string;
  tag: string;
  title: string;
  summary: string;
  body: string[];
  cta?: { label: string; href: string };
}

export interface CategoryMeta {
  key: AnnouncementCategory;
  label: string;
  desc: string;
}

// Add new announcements at the top of the relevant language array below.
// Each entry needs: slug (used in the URL, keep it stable once published),
// category, date, tag (short display label), title, summary (used in list
// views), and body (an array of paragraphs for the announcement's own page).
// "cta" is optional — an extra button on the announcement page.

const en: Announcement[] = [
  {
    slug: 'institute-officially-open-2026',
    category: 'notice',
    date: '2026-08-23',
    tag: 'Notice',
    title: 'Panorama Research Institute Is Now Officially Open',
    summary: 'Panorama Research Institute has completed its foundational phase and is now officially open, accepting membership, fellowship, and research assistant applications, as well as research proposals and academic collaboration inquiries.',
    body: [
      'Panorama Research Institute has completed its foundational development phase and is now officially open. The Institute is accepting applications and submissions across all of its programs, including membership applications, Research Fellow, Associate Research Fellow, and Research Assistant recruitment, Visiting Scholar applications, research project and publication proposals, and academic collaboration inquiries.',
      'Prospective members, fellows, and collaborators can find the relevant application forms and official templates under the Collaboration and People sections of this website. The Institute welcomes researchers, practitioners, and institutions who share its commitment to open, evidence-based, and independent scholarship.',
      'For general inquiries, please contact research@panorama-sg.com.',
    ],
    cta: { label: 'Explore Ways to Collaborate', href: '/collaboration' },
  },
  {
    slug: 'research-recruitment-2027',
    category: 'recruitment',
    date: '2026-08-23',
    tag: 'Recruitment',
    title: 'Now Recruiting: Research Fellows, Associate Research Fellows, and Research Assistants',
    summary: 'Panorama Research Institute is accepting applications for Research Fellow, Associate Research Fellow, and Research Assistant positions. Application deadline: February 15, 2027.',
    body: [
      'Panorama Research Institute is currently recruiting for three academic roles: Research Fellow, Associate Research Fellow, and Research Assistant.',
      'Research Fellow positions are open to mid- and senior-career researchers holding a PhD or equivalent qualification. Associate Research Fellow positions are open to doctoral students and early-career researchers. Research Assistant positions are open to Masters or PhD students, or recent graduates with relevant research experience, who support Institute projects under the supervision of a Research Fellow.',
      'All three roles are remote (distributed) positions and do not require relocation.',
      'Applications for this recruitment round should be submitted by February 15, 2027. Please visit the Join the Institute page for eligibility details and to apply.',
    ],
    cta: { label: 'View Positions & Apply', href: '/people/join' },
  },
  {
    slug: 'attachment-upload-fix-2026-08',
    category: 'update',
    date: '2026-08-23',
    tag: 'Update',
    title: 'Improved multi-file attachment uploads on collaboration forms',
    summary: 'The Membership and Research Fellow application forms now reliably receive every uploaded attachment, with a 10MB total size limit.',
    body: [
      'Panorama Research Institute has updated the attachment upload feature on its Membership Application and Research Fellow Application forms.',
      'Previously, when applicants selected multiple files, only the first attachment was reliably received. This has been corrected: uploaded files are now received in full, regardless of how many are selected.',
      'To keep submissions within the email delivery limits of the form service, the combined size of all attachments in a single submission must not exceed 10MB. The upload interface will indicate if a selected file cannot be added because this limit would be exceeded.',
    ],
  },
];

const zhCn: Announcement[] = [
  {
    slug: 'institute-officially-open-2026',
    category: 'notice',
    date: '2026-08-23',
    tag: '通知',
    title: '全景研究院正式开业',
    summary: '全景研究院已完成筹建阶段，正式开始运作，现正接受会员申请、研究员及研究助理招募申请，以及研究提案和学术合作咨询。',
    body: [
      '全景研究院已完成筹建阶段，正式开始运作。研究院现正在其各项目中接受申请与提交，包括会员申请、研究员／副研究员／研究助理招募、访问学者申请、研究项目与出版提案，以及学术合作咨询。',
      '有意申请会员、研究员或开展合作的人士，可在本网站"学术合作"与"学术成员"栏目中查找相应申请表单及官方模板。研究院欢迎认同其开放、循证、独立学术理念的研究者、实务工作者及机构。',
      '一般咨询请联系 research@panorama-sg.com。',
    ],
    cta: { label: '查看合作方式', href: '/zh-cn/collaboration' },
  },
  {
    slug: 'research-recruitment-2027',
    category: 'recruitment',
    date: '2026-08-23',
    tag: '招募',
    title: '招募研究员、副研究员及研究助理',
    summary: '全景研究院现正招募研究员、副研究员及研究助理，申请截止日期为 2027 年 2 月 15 日。',
    body: [
      '全景研究院目前正在招募三类学术岗位：研究员、副研究员及研究助理。',
      '研究员岗位面向具有博士学位或同等资历的中高级研究人员；副研究员岗位面向博士生及早期职业研究者；研究助理岗位面向硕士/博士研究生或具有相关研究经验的应届毕业生，在研究员指导下参与研究院项目工作。',
      '以上三类岗位均为远程（分布式）工作形式，无需搬迁。',
      '本轮招募申请截止日期为 2027 年 2 月 15 日。具体资格要求及申请方式请前往"加入研究院"页面查看。',
    ],
    cta: { label: '查看岗位并申请', href: '/zh-cn/people/join' },
  },
  {
    slug: 'attachment-upload-fix-2026-08',
    category: 'update',
    date: '2026-08-23',
    tag: '更新',
    title: '合作申请表单的多附件上传功能已优化',
    summary: '会员申请与研究员申请表单现在可以完整接收上传的所有附件，附件总大小上限为 10MB。',
    body: [
      '全景研究院已更新会员申请表单与研究员申请表单的附件上传功能。',
      '此前，当申请人一次选择多个文件时，系统通常只能可靠接收到第一个附件。该问题现已修复：无论选择多少个文件，均可完整接收。',
      '为使提交内容符合表单服务的邮件发送限制，单次提交的全部附件总大小不得超过 10MB。若某个文件会导致超出该限制，上传界面会提示该文件未被添加。',
    ],
  },
];

const zhTw: Announcement[] = [
  {
    slug: 'institute-officially-open-2026',
    category: 'notice',
    date: '2026-08-23',
    tag: '通知',
    title: '全景研究院正式開業',
    summary: '全景研究院已完成籌建階段，正式開始運作，現正接受會員申請、研究員及研究助理招募申請，以及研究提案和學術合作諮詢。',
    body: [
      '全景研究院已完成籌建階段，正式開始運作。研究院現正在其各項目中接受申請與提交，包括會員申請、研究員／副研究員／研究助理招募、訪問學者申請、研究項目與出版提案，以及學術合作諮詢。',
      '有意申請會員、研究員或開展合作的人士，可在本網站「學術合作」與「學術成員」欄目中查找相應申請表單及官方範本。研究院歡迎認同其開放、循證、獨立學術理念的研究者、實務工作者及機構。',
      '一般諮詢請聯絡 research@panorama-sg.com。',
    ],
    cta: { label: '查看合作方式', href: '/zh-tw/collaboration' },
  },
  {
    slug: 'research-recruitment-2027',
    category: 'recruitment',
    date: '2026-08-23',
    tag: '招募',
    title: '招募研究員、副研究員及研究助理',
    summary: '全景研究院現正招募研究員、副研究員及研究助理，申請截止日期為 2027 年 2 月 15 日。',
    body: [
      '全景研究院目前正在招募三類學術職位：研究員、副研究員及研究助理。',
      '研究員職位面向具有博士學位或同等資歷的中高級研究人員；副研究員職位面向博士生及早期職業研究者；研究助理職位面向碩士/博士研究生或具有相關研究經驗的應屆畢業生，在研究員指導下參與研究院項目工作。',
      '以上三類職位均為遠程（分佈式）工作形式，無需搬遷。',
      '本輪招募申請截止日期為 2027 年 2 月 15 日。具體資格要求及申請方式請前往「加入研究院」頁面查看。',
    ],
    cta: { label: '查看職位並申請', href: '/zh-tw/people/join' },
  },
  {
    slug: 'attachment-upload-fix-2026-08',
    category: 'update',
    date: '2026-08-23',
    tag: '更新',
    title: '合作申請表單的多附件上傳功能已優化',
    summary: '會員申請與研究員申請表單現在可以完整接收上傳的所有附件，附件總大小上限為 10MB。',
    body: [
      '全景研究院已更新會員申請表單與研究員申請表單的附件上傳功能。',
      '此前，當申請人一次選擇多個文件時，系統通常只能可靠接收到第一個附件。該問題現已修復：無論選擇多少個文件，均可完整接收。',
      '為使提交內容符合表單服務的郵件發送限制，單次提交的全部附件總大小不得超過 10MB。若某個文件會導致超出該限制，上傳介面會提示該文件未被加入。',
    ],
  },
];

const categoriesEn: CategoryMeta[] = [
  { key: 'recruitment', label: 'Recruitment', desc: 'Open positions and calls for applications.' },
  { key: 'notice', label: 'Notices', desc: 'General notices from the Institute.' },
  { key: 'update', label: 'Site & Service Updates', desc: 'Changes to the website and application forms.' },
];

const categoriesZhCn: CategoryMeta[] = [
  { key: 'recruitment', label: '招募', desc: '岗位招募与申请通知。' },
  { key: 'notice', label: '通知', desc: '研究院发布的一般性通知。' },
  { key: 'update', label: '网站与服务更新', desc: '网站与申请表单的功能更新。' },
];

const categoriesZhTw: CategoryMeta[] = [
  { key: 'recruitment', label: '招募', desc: '職位招募與申請通知。' },
  { key: 'notice', label: '通知', desc: '研究院發布的一般性通知。' },
  { key: 'update', label: '網站與服務更新', desc: '網站與申請表單的功能更新。' },
];

function listFor(lang: Lang): Announcement[] {
  if (lang === 'zh-cn') return zhCn;
  if (lang === 'zh-tw') return zhTw;
  return en;
}

export function getAnnouncements(lang: Lang): Announcement[] {
  return listFor(lang);
}

export function getAnnouncementsByCategory(lang: Lang, category: AnnouncementCategory): Announcement[] {
  return listFor(lang).filter((a) => a.category === category);
}

export function getAnnouncement(lang: Lang, slug: string): Announcement | undefined {
  return listFor(lang).find((a) => a.slug === slug);
}

export function getAnnouncementCategories(lang: Lang): CategoryMeta[] {
  if (lang === 'zh-cn') return categoriesZhCn;
  if (lang === 'zh-tw') return categoriesZhTw;
  return categoriesEn;
}

export function localizeAnnouncementHref(lang: Lang, slug: string): string {
  return lang === 'en' ? `/announcements/${slug}` : `/${lang}/announcements/${slug}`;
}

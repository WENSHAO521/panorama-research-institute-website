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
    slug: 'sponsorship-first-articles-2026',
    category: 'notice',
    date: '2026-10-10',
    tag: 'Notice',
    title: 'Institute Sponsorship: First Journal Articles Published',
    summary: 'Four journal articles supported by Panorama Research Institute sponsorship have been published, two of them with Institute members among the authors. A new Sponsorship section lists sponsored works.',
    body: [
      'Four journal articles supported by Panorama Research Institute sponsorship have been published in Panorama journals: two in Health Nexus: Digital Health and Medical AI, one in Resonance: Journal of Global Music Studies, and one in PoliEcoM Administration Review.',
      'Two of the articles include Institute members among their authors and are listed under Publications. The other two, by scholars and institutions outside the Institute, are listed in the new Sponsorship section, which will also list sponsored books.',
      'Each sponsorship is recorded by a sponsorship number and disclosed in the article. Sponsorship does not confer authority over editorial decisions or peer review outcomes.',
    ],
    cta: { label: 'View Sponsorship', href: '/sponsorship' },
  },
  {
    slug: 'new-members-2026-10',
    category: 'notice',
    date: '2026-10-10',
    tag: 'Notice',
    title: 'New Research Fellow and Associate Research Fellows Join the Institute',
    summary: 'Dr. Sebastian Lenz has joined as a Research Fellow, and Dr. Yanlin Feng, Jiahong Ao, Xiaoyue Yan, and Dr. Jiale Li have joined as Associate Research Fellows.',
    body: [
      'Panorama Research Institute welcomes Dr. Sebastian Lenz as a Research Fellow, with research interests in art theory and aesthetics, philosophy of culture, and social theory and cultural sociology.',
      'The Institute also welcomes four Associate Research Fellows: Dr. Yanlin Feng (classical music studies; vocal music and performance), Jiahong Ao and Xiaoyue Yan (School of Music, Guangzhou College of Applied Science and Technology; music analysis and theory, and music education), and Dr. Jiale Li (vocal performance and pedagogy; opera studies).',
      'Their profiles are listed on the Research Fellows and Associate Research Fellows pages. The Institute continues to accept applications on a rolling basis.',
    ],
    cta: { label: 'Meet the Research Fellows', href: '/people/research-fellows' },
  },
  {
    slug: 'charter-v1-2-effective-2026',
    category: 'notice',
    date: '2026-10-10',
    tag: 'Notice',
    title: 'Institute Charter Version 1.2 Takes Effect',
    summary: 'Version 1.2 of the Institute Charter took effect on 10 October 2026. Earlier versions remain publicly available on the Charter Version History page.',
    body: [
      'Panorama Research Institute announces that Version 1.2 of the Institute Charter took effect on 10 October 2026.',
      'Revision 1.2 updates the list of Research Centers; adds the categories of scholarly affiliation and coordinator roles now in use, journal articles, and the Membership Program; clarifies copyright, internal documents, and protection periods; and adds provisions on appointments, the handling of misconduct, conflicts of interest, personal information, generative AI, language versions, and institutional continuity. The related governance policies have been aligned accordingly.',
      'The Charter and its earlier versions (1.0 and 1.1) are available on the Charter Version History page.',
    ],
    cta: { label: 'View Charter Version History', href: '/charter/version-history' },
  },
  {
    slug: 'posi-official-launch-2026',
    category: 'notice',
    date: '2026-09-27',
    tag: 'Notice',
    title: 'POSI Database Officially Launched',
    summary: 'The Panorama Open Scholarly Index (POSI) was officially launched on 27 September 2026 and is now publicly accessible at posi.panorama-sg.com.',
    body: [
      'Panorama Research Institute is pleased to announce that the Panorama Open Scholarly Index (POSI) was officially launched on 27 September 2026. The database is now publicly accessible at https://posi.panorama-sg.com.',
      'POSI is a flagship infrastructure project led by the Center for Scholarly Indexing and Evaluation. It provides a transparent, comprehensive, and methodologically rigorous open index of academic journals, covering editorial standards, peer review practice, indexing status, open access policies, publication ethics, and metadata quality.',
      'Following the launch, work will focus on expanding journal coverage to additional disciplines and regions, refining the public interface based on user feedback, and developing structured data access options. Feedback and collaboration inquiries are welcome at research@panorama-sg.com.',
    ],
    cta: { label: 'View POSI Project', href: '/projects/posi-scholarly-indexing' },
  },
  {
    slug: 'institute-officially-open-2026',
    category: 'notice',
    date: '2026-08-23',
    tag: 'Notice',
    title: 'Panorama Research Institute Formally Established',
    summary: 'Panorama Research Institute was formally established by Panorama Scholarly Group on 23 August 2026 and has commenced operations. It is accepting membership, fellowship, and research assistant applications, as well as research proposals and academic collaboration inquiries.',
    body: [
      'Panorama Research Institute was formally established by Panorama Scholarly Group on 23 August 2026, following the completion of its preparatory phase, and has commenced operations. The Institute is accepting applications and submissions across all of its programs, including membership applications, Research Fellow, Associate Research Fellow, and Research Assistant recruitment, Visiting Scholar applications, research project and publication proposals, and academic collaboration inquiries.',
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
    summary: 'Panorama Research Institute is accepting applications for Research Fellow, Associate Research Fellow, and Research Assistant positions. Applications are accepted on a rolling basis, with no fixed deadline.',
    body: [
      'Panorama Research Institute is currently recruiting for three academic roles: Research Fellow, Associate Research Fellow, and Research Assistant.',
      'Research Fellow positions are open to mid- and senior-career researchers holding a PhD or equivalent qualification. Associate Research Fellow positions are open to doctoral students and early-career researchers. Research Assistant positions are open to Masters or PhD students, or recent graduates with relevant research experience, who support Institute projects under the supervision of a Research Fellow.',
      'All three roles are remote (distributed) positions and do not require relocation.',
      'Applications are accepted on a rolling basis, with no fixed deadline. Please visit the Join the Institute page for eligibility details and to apply.',
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
    slug: 'sponsorship-first-articles-2026',
    category: 'notice',
    date: '2026-10-10',
    tag: '通知',
    title: '研究院资助：首批期刊论文发表',
    summary: '获全景研究院资助的四篇期刊论文已发表，其中两篇的作者含研究院成员。新设“资助”栏目列示获资助成果。',
    body: [
      '获全景研究院资助的四篇期刊论文已在全景期刊发表：两篇发表于 Health Nexus: Digital Health and Medical AI，一篇发表于 Resonance: Journal of Global Music Studies，一篇发表于 PoliEcoM Administration Review。',
      '其中两篇的作者含研究院成员，列于“出版成果”；另外两篇作者来自研究院以外的学者和机构，列于新设的“资助”栏目，该栏目今后也将列示获资助的图书。',
      '每项资助均以资助编号记录，并在论文中披露。资助不赋予对编辑决定或同行评审结果的任何权限。',
    ],
    cta: { label: '查看资助', href: '/zh-cn/sponsorship' },
  },
  {
    slug: 'new-members-2026-10',
    category: 'notice',
    date: '2026-10-10',
    tag: '通知',
    title: '新任研究员与副研究员加入研究院',
    summary: 'Dr. Sebastian Lenz 已加入研究院担任研究员，Dr. Yanlin Feng、Jiahong Ao、Xiaoyue Yan 和 Dr. Jiale Li 已加入担任副研究员。',
    body: [
      '全景研究院欢迎 Dr. Sebastian Lenz 担任研究员，其研究方向为艺术理论与美学、文化哲学、社会理论与文化社会学。',
      '研究院同时欢迎四位副研究员：Dr. Yanlin Feng（古典音乐研究；声乐艺术与演唱实践）、Jiahong Ao 与 Xiaoyue Yan（广州应用科技学院音乐学院；分别从事音乐分析与音乐教育方向研究）、Dr. Jiale Li（声乐表演与教学；歌剧研究）。',
      '各位学者的简介已列于“研究员”和“副研究员”页面。研究院继续滚动接受申请。',
    ],
    cta: { label: '查看研究员', href: '/zh-cn/people/research-fellows' },
  },
  {
    slug: 'charter-v1-2-effective-2026',
    category: 'notice',
    date: '2026-10-10',
    tag: '通知',
    title: '研究院章程 1.2 版生效',
    summary: '研究院章程 1.2 版已于 2026 年 10 月 10 日生效，历史版本仍可在“章程版本历史”页面公开查阅。',
    body: [
      '全景研究院宣布，研究院章程 1.2 版已于 2026 年 10 月 10 日生效。',
      '1.2 版更新了研究中心名单，增列现行学者类别与协调员设置、期刊论文及会员计划，明确版权、内部文件和保护期，并增加任命、研究不端处理、利益冲突、个人信息、生成式人工智能、语言版本及机构延续等规定，相关治理政策已同步调整。',
      '章程及其历史版本（1.0 版和 1.1 版）可在“章程版本历史”页面查阅。',
    ],
    cta: { label: '查看章程版本历史', href: '/zh-cn/charter/version-history' },
  },
  {
    slug: 'posi-official-launch-2026',
    category: 'notice',
    date: '2026-09-27',
    tag: '通知',
    title: 'POSI 数据库正式上线',
    summary: '全景开放学术索引（POSI）已于 2026 年 9 月 27 日正式上线，现可通过 posi.panorama-sg.com 公开访问。',
    body: [
      '全景研究院欣然宣布，全景开放学术索引（POSI）已于 2026 年 9 月 27 日正式上线。数据库现已向公众开放，访问地址为 https://posi.panorama-sg.com。',
      'POSI 是由学术索引与评价研究中心牵头的旗舰基础设施项目，提供一个透明、全面且方法严谨的开放学术期刊索引，涵盖编辑标准、同行评审实践、索引状态、开放获取政策、出版伦理及元数据质量等维度。',
      '上线后，工作重点将转向扩大期刊的学科与地区覆盖范围、根据用户反馈优化公共界面，以及开发结构化数据访问方式。欢迎通过 research@panorama-sg.com 提出意见或洽谈合作。',
    ],
    cta: { label: '查看 POSI 项目', href: '/zh-cn/projects/posi-scholarly-indexing' },
  },
  {
    slug: 'institute-officially-open-2026',
    category: 'notice',
    date: '2026-08-23',
    tag: '通知',
    title: '全景研究院正式成立',
    summary: '全景研究院由全景学术集团设立，于 2026 年 8 月 23 日正式成立并开始运作，现正接受会员申请、研究员及研究助理招募申请，以及研究提案和学术合作咨询。',
    body: [
      '全景研究院完成筹备工作后，由全景学术集团于 2026 年 8 月 23 日正式设立，并开始运作。研究院现正在其各项目中接受申请与提交，包括会员申请、研究员／副研究员／研究助理招募、访问学者申请、研究项目与出版提案，以及学术合作咨询。',
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
    summary: '全景研究院现正招募研究员、副研究员及研究助理，采取滚动申请，无固定截止日期。',
    body: [
      '全景研究院目前正在招募三类学术岗位：研究员、副研究员及研究助理。',
      '研究员岗位面向具有博士学位或同等资历的中高级研究人员；副研究员岗位面向博士生及早期职业研究者；研究助理岗位面向硕士/博士研究生或具有相关研究经验的应届毕业生，在研究员指导下参与研究院项目工作。',
      '以上三类岗位均为远程（分布式）工作形式，无需搬迁。',
      '申请采取滚动方式，无固定截止日期。具体资格要求及申请方式请前往"加入研究院"页面查看。',
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
    slug: 'sponsorship-first-articles-2026',
    category: 'notice',
    date: '2026-10-10',
    tag: '通知',
    title: '研究院資助：首批期刊論文發表',
    summary: '獲全景研究院資助的四篇期刊論文已發表，其中兩篇的作者含研究院成員。新設“資助”欄目列示獲資助成果。',
    body: [
      '獲全景研究院資助的四篇期刊論文已在全景期刊發表：兩篇發表於 Health Nexus: Digital Health and Medical AI，一篇發表於 Resonance: Journal of Global Music Studies，一篇發表於 PoliEcoM Administration Review。',
      '其中兩篇的作者含研究院成員，列於“出版成果”；另外兩篇作者來自研究院以外的學者和機構，列於新設的“資助”欄目，該欄目今後也將列示獲資助的圖書。',
      '每項資助均以資助編號記錄，並在論文中披露。資助不賦予對編輯決定或同行評審結果的任何權限。',
    ],
    cta: { label: '查看資助', href: '/zh-tw/sponsorship' },
  },
  {
    slug: 'new-members-2026-10',
    category: 'notice',
    date: '2026-10-10',
    tag: '通知',
    title: '新任研究員與副研究員加入研究院',
    summary: 'Dr. Sebastian Lenz 已加入研究院擔任研究員，Dr. Yanlin Feng、Jiahong Ao、Xiaoyue Yan 和 Dr. Jiale Li 已加入擔任副研究員。',
    body: [
      '全景研究院歡迎 Dr. Sebastian Lenz 擔任研究員，其研究方向為藝術理論與美學、文化哲學、社會理論與文化社會學。',
      '研究院同時歡迎四位副研究員：Dr. Yanlin Feng（古典音樂研究；聲樂藝術與演唱實踐）、Jiahong Ao 與 Xiaoyue Yan（廣州應用科技學院音樂學院；分別從事音樂分析與音樂教育方向研究）、Dr. Jiale Li（聲樂表演與教學；歌劇研究）。',
      '各位學者的簡介已列於“研究員”和“副研究員”頁面。研究院繼續滾動接受申請。',
    ],
    cta: { label: '查看研究員', href: '/zh-tw/people/research-fellows' },
  },
  {
    slug: 'charter-v1-2-effective-2026',
    category: 'notice',
    date: '2026-10-10',
    tag: '通知',
    title: '研究院章程 1.2 版生效',
    summary: '研究院章程 1.2 版已於 2026 年 10 月 10 日生效，歷史版本仍可在“章程版本歷史”頁面公開查閱。',
    body: [
      '全景研究院宣布，研究院章程 1.2 版已於 2026 年 10 月 10 日生效。',
      '1.2 版更新了研究中心名單，增列現行學者類別與協調員設置、期刊論文及會員計劃，明確版權、內部文件和保護期，並增加任命、研究不端處理、利益衝突、個人信息、生成式人工智慧、語言版本及機構延續等規定，相關治理政策已同步調整。',
      '章程及其歷史版本（1.0 版和 1.1 版）可在“章程版本歷史”頁面查閱。',
    ],
    cta: { label: '查看章程版本歷史', href: '/zh-tw/charter/version-history' },
  },
  {
    slug: 'posi-official-launch-2026',
    category: 'notice',
    date: '2026-09-27',
    tag: '通知',
    title: 'POSI 資料庫正式上線',
    summary: '全景開放學術索引（POSI）已於 2026 年 9 月 27 日正式上線，現可透過 posi.panorama-sg.com 公開存取。',
    body: [
      '全景研究院欣然宣布，全景開放學術索引（POSI）已於 2026 年 9 月 27 日正式上線。資料庫現已向公眾開放，網址為 https://posi.panorama-sg.com。',
      'POSI 是由學術索引與評價研究中心牽頭的旗艦基礎設施項目，提供一個透明、全面且方法嚴謹的開放學術期刊索引，涵蓋編輯標準、同儕評審實踐、索引狀態、開放取用政策、出版倫理及後設資料品質等維度。',
      '上線後，工作重點將轉向擴大期刊的學科與地區覆蓋範圍、根據用戶反饋優化公共介面，以及開發結構化資料存取方式。歡迎透過 research@panorama-sg.com 提出意見或洽談合作。',
    ],
    cta: { label: '查看 POSI 項目', href: '/zh-tw/projects/posi-scholarly-indexing' },
  },
  {
    slug: 'institute-officially-open-2026',
    category: 'notice',
    date: '2026-08-23',
    tag: '通知',
    title: '全景研究院正式成立',
    summary: '全景研究院由全景學術集團設立，於 2026 年 8 月 23 日正式成立並開始運作，現正接受會員申請、研究員及研究助理招募申請，以及研究提案和學術合作諮詢。',
    body: [
      '全景研究院完成籌備工作後，由全景學術集團於 2026 年 8 月 23 日正式設立，並開始運作。研究院現正在其各項目中接受申請與提交，包括會員申請、研究員／副研究員／研究助理招募、訪問學者申請、研究項目與出版提案，以及學術合作諮詢。',
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
    summary: '全景研究院現正招募研究員、副研究員及研究助理，採取滾動申請，無固定截止日期。',
    body: [
      '全景研究院目前正在招募三類學術職位：研究員、副研究員及研究助理。',
      '研究員職位面向具有博士學位或同等資歷的中高級研究人員；副研究員職位面向博士生及早期職業研究者；研究助理職位面向碩士/博士研究生或具有相關研究經驗的應屆畢業生，在研究員指導下參與研究院項目工作。',
      '以上三類職位均為遠程（分佈式）工作形式，無需搬遷。',
      '申請採取滾動方式，無固定截止日期。具體資格要求及申請方式請前往「加入研究院」頁面查看。',
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

// Version history of the Institute Charter (Article 20: the Institute Office maintains the complete version history).
// Superseded PDFs are archived unaltered in public/documents/archive/. Add the next version here when it is adopted.
export type CharterLang = 'en' | 'zh-cn' | 'zh-tw';

export interface CharterVersion {
  version: string;
  effective: Record<CharterLang, string>;
  current: boolean;
  summary: Record<CharterLang, string>;
  pdf: Record<CharterLang, string>;
}

const archive = (v: string, f: string) => `/documents/archive/panorama-research-institute-charter-v${v}-${f}.pdf`;
const live = (f: string) => `/documents/panorama-research-institute-charter-${f}.pdf`;

export const charterVersions: CharterVersion[] = [
  {
    version: '1.2',
    effective: { en: '2026-10-10', 'zh-cn': '2026-10-10', 'zh-tw': '2026-10-10' },
    current: true,
    summary: {
      en: 'Updates the list of Research Centers; adds the categories of scholarly affiliation, coordinator roles, journal articles, and the Membership Program; clarifies copyright, internal documents, and protection periods; adds provisions on appointments, impartial handling of misconduct, conflicts of interest, personal information, generative AI, language versions, public archiving of superseded versions, and institutional continuity; and aligns the amendment procedure and subsidiary governance documents with the Charter.',
      'zh-cn': '更新研究中心名单；增列学者类别、协调员设置、期刊论文及会员计划；明确版权、内部文件和保护期；增加任命、研究不端公正处理、利益冲突、个人信息、生成式人工智能、语言版本、历史版本公开存档及机构延续等规定；并使修订程序及附属治理文件与章程保持一致。',
      'zh-tw': '更新研究中心名單；增列學者類別、協調員設置、期刊論文及會員計劃；明確版權、內部文件和保護期；增加任命、研究不端公正處理、利益衝突、個人資訊、生成式人工智慧、語言版本、歷史版本公開存檔及機構延續等規定；並使修訂程序及附屬治理文件與章程保持一致。',
    },
    pdf: { en: live('en'), 'zh-cn': live('cn'), 'zh-tw': live('cn-tw') },
  },
  {
    version: '1.1',
    effective: { en: '2026-10-05', 'zh-cn': '2026-10-05', 'zh-tw': '2026-10-05' },
    current: false,
    summary: {
      en: 'Clarifies institutional status, academic affiliation, legal execution, and financial administration.',
      'zh-cn': '明确机构地位、学术署名、法律文件签署及财务行政安排。',
      'zh-tw': '明確機構地位、學術署名、法律文件簽署及財務行政安排。',
    },
    pdf: { en: archive('1.1', 'en'), 'zh-cn': archive('1.1', 'cn'), 'zh-tw': archive('1.1', 'cn-tw') },
  },
  {
    version: '1.0',
    effective: { en: '2026', 'zh-cn': '2026 年', 'zh-tw': '2026 年' },
    current: false,
    summary: {
      en: 'The initial Charter of Panorama Research Institute.',
      'zh-cn': '全景研究院的首版章程。',
      'zh-tw': '全景研究院的首版章程。',
    },
    pdf: { en: archive('1.0', 'en'), 'zh-cn': archive('1.0', 'cn'), 'zh-tw': archive('1.0', 'cn-tw') },
  },
];

// Version history of the Institute Charter (Article 20: the Institute Office maintains the complete version history).
// Superseded PDFs are archived unaltered in public/documents/archive/. Add the next version here when it is adopted.
export type CharterLang = 'en' | 'zh-cn' | 'zh-tw';

export interface CharterVersion {
  version: string;
  effective: Record<CharterLang, string>;
  current: boolean;
  summary: Record<CharterLang, string>;
  /** Optional editorial note, e.g. a wording standardization that did not change any provision. */
  note?: Record<CharterLang, string>;
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
    note: {
      en: 'Corrections (10 October 2026): termination of affiliation for misconduct now follows Article 13; journal articles are excluded from the blanket CC BY and open access rules in Articles 11 and 17; confidentiality duties limit, rather than authorize, disclosure of internal documents; and protection-period agreements are made by the Group for the Institute\'s use. Spelling and terminology were also standardized across language versions.',
      'zh-cn': '更正说明（2026-10-10）：研究不端导致的隶属关系终止依第 13 条办理；第 11 条和第 17 条的开放获取与 CC BY 规定不适用于期刊论文；保密义务限制而非授权内部文件的公开；保护期协议由集团（供本院使用）订立。同时统一了各语言版本的拼写与用词。',
      'zh-tw': '更正說明（2026-10-10）：研究不端導致的隸屬關係終止依第 13 條辦理；第 11 條和第 17 條的開放取用與 CC BY 規定不適用於期刊論文；保密義務限制而非授權內部文件的公開；保護期協議由集團（供本院使用）訂立。同時統一了各語言版本的拼寫與用詞。',
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
    effective: { en: '2026-07-20', 'zh-cn': '2026-07-20', 'zh-tw': '2026-07-20' },
    current: false,
    summary: {
      en: 'The initial Charter of Panorama Research Institute.',
      'zh-cn': '全景研究院的首版章程。',
      'zh-tw': '全景研究院的首版章程。',
    },
    pdf: { en: archive('1.0', 'en'), 'zh-cn': archive('1.0', 'cn'), 'zh-tw': archive('1.0', 'cn-tw') },
  },
];

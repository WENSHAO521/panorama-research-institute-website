// Single source for the phased development roadmap shown on the Institute Framework page and the Development Roadmap page.
// `done: true` marks an item that has already been achieved. Update this file when milestones are completed.
import type { Lang } from '../i18n/utils';

export interface RoadmapGoal { text: string; done: boolean }
export interface RoadmapPhase {
  key: 'current' | 'upcoming' | 'planned' | 'longterm';
  phase: string;
  label: string;
  period: string;
  status: string;
  color: string;
  goals: RoadmapGoal[];
}

export const roadmapDoneLabel: Record<Lang, string> = { en: 'Completed', 'zh-cn': '已完成', 'zh-tw': '已完成' };

const periods = ['2026', '2027', '2028', '2029+'];

const data: Record<Lang, Array<{ key: RoadmapPhase['key']; color: string; phase: string; label: string; status: string; goals: Array<[string, boolean]> }>> = {
  en: [
    { key: 'current', color: 'var(--text-main)', phase: "Phase 1", label: "Foundation", status: "Current", goals: [
      ["Establish the Institute's governance framework, charter, and core policies", true],
      ["Launch the Institute's public website and digital presence", true],
      ["Establish five initial research centers: Scholarly Publishing Studies, Scholarly Indexing and Evaluation, Policy and Social Research, Arts, Culture and Embodiment, and Health and Medical Research", true],
      ["Complete development of the POSI database and officially launch it (launched 27 September 2026)", true],
      ["Initiate the Fifteenth Five-Year Plan Studies Project", true],
      ["Launch the Institute's collaboration, fellowship, and membership application processes", true],
      ["Publish the Institute's first journal articles and begin sponsoring journal articles", true],
      ["Recruit initial research fellows and visiting scholars", false],
      ["Announce the Center for AI and Future Society, now in establishment", false],
      ["Publish the inaugural set of working papers", false],
    ] },
    { key: 'upcoming', color: 'var(--accent-steel)', phase: "Phase 2", label: "Development", status: "Upcoming", goals: [
      ["Bring the Center for AI and Future Society into full operation as the fourth research center", false],
      ["Expand the research fellow network to include scholars from at least five countries", false],
      ["Expand the visiting scholar and fellowship programs", false],
      ["Publish the first annual report of Panorama Research Institute", false],
      ["Expand POSI public access operations and user services", false],
      ["Produce and publish the first full-length research reports from active projects", false],
      ["Extend Institute sponsorship to books and monographs", false],
      ["Organize the first Institute-branded academic seminar series", false],
      ["Complete the formation of the Advisory Board and announce its members", false],
      ["Begin formal institutional cooperation discussions with partner institutions", false],
    ] },
    { key: 'planned', color: 'var(--text-muted)', phase: "Phase 3", label: "Expansion", status: "Planned", goals: [
      ["Launch the first Institute-organized international conference", false],
      ["Establish formal institutional cooperation agreements with at least three partner institutions", false],
      ["Establish the Center for Education and Learning Research as the seventh research center", false],
      ["Expand the POSI database to a broader range of scholarly journals", false],
      ["Launch the first Institute-edited volume in partnership with an academic publisher", false],
      ["Introduce training programs for journal editors and research teams", false],
    ] },
    { key: 'longterm', color: 'var(--text-muted)', phase: "Phase 4", label: "Consolidation", status: "Long-term", goals: [
      ["Bring all seven research centers to full operational capacity", false],
      ["Achieve a sustained annual publication output across all publication types", false],
      ["Develop a recognized and regularly cited journal and policy evaluation framework", false],
      ["Establish a multi-year research grant program in collaboration with partner institutions", false],
      ["Build a community of practice around the Institute's research themes", false],
      ["Develop a major conference series on scholarly communication and academic publishing", false],
      ["Expand the POSI database to become a recognized global resource", false],
    ] },
  ],
  'zh-cn': [
    { key: 'current', color: 'var(--text-main)', phase: "第一阶段", label: "基础建设", status: "当前", goals: [
      ["建立研究院治理框架、章程和核心政策", true],
      ["上线研究院官方网站，建立数字化形象", true],
      ["设立五个首批研究中心：学术出版研究中心、学术索引与评价研究中心、政策与社会研究中心、艺术、文化与具身研究中心、健康与医学研究中心", true],
      ["完成 POSI 数据库开发并正式上线（2026 年 9 月 27 日已上线）", true],
      ["启动“十五五”规划研究项目", true],
      ["开通合作、研究员及会员申请流程", true],
      ["发表研究院首批期刊论文，并开始资助期刊论文", true],
      ["招募首批研究员和访问学者", false],
      ["宣布成立人工智能与未来社会研究中心（筹建中）", false],
      ["发布首批工作论文", false],
    ] },
    { key: 'upcoming', color: 'var(--accent-steel)', phase: "第二阶段", label: "发展建设", status: "即将开展", goals: [
      ["使人工智能与未来社会研究中心全面运行，成为第四个研究中心", false],
      ["扩大研究员网络，纳入至少五个国家的学者", false],
      ["扩大访问学者和研究员计划", false],
      ["发布全景研究院首份年度报告", false],
      ["扩大 POSI 公共访问运营和用户服务", false],
      ["产出并发布进行中项目的首批完整研究报告", false],
      ["将研究院资助扩展至图书和专著", false],
      ["举办首个以研究院名义组织的学术研讨系列", false],
      ["完成顾问委员会组建并公布成员", false],
      ["开始与合作机构进行正式机构合作洽谈", false],
    ] },
    { key: 'planned', color: 'var(--text-muted)', phase: "第三阶段", label: "拓展建设", status: "规划中", goals: [
      ["举办首次研究院组织的国际学术会议", false],
      ["与至少三家合作机构建立正式机构合作协议", false],
      ["设立教育与学习研究中心，作为第七个研究中心", false],
      ["将 POSI 数据库扩展至更广泛的学术期刊", false],
      ["与学术出版社合作推出首部研究院主编文集", false],
      ["开设面向期刊编辑和研究团队的培训项目", false],
    ] },
    { key: 'longterm', color: 'var(--text-muted)', phase: "第四阶段", label: "巩固发展", status: "长期", goals: [
      ["使全部七个研究中心达到完全运行能力", false],
      ["在各类出版成果上实现持续的年度产出", false],
      ["建立获得认可并被持续引用的期刊与政策评价框架", false],
      ["与合作机构共同设立多年期研究资助计划", false],
      ["围绕研究院研究主题建设实践共同体", false],
      ["打造以学术传播和学术出版为主题的大型会议系列", false],
      ["使 POSI 数据库发展成为公认的全球性资源", false],
    ] },
  ],
  'zh-tw': [
    { key: 'current', color: 'var(--text-main)', phase: "第一階段", label: "基礎建設", status: "當前", goals: [
      ["建立研究院治理框架、章程和核心政策", true],
      ["上線研究院官方網站，建立數字化形象", true],
      ["設立五個首批研究中心：學術出版研究中心、學術索引與評價研究中心、政策與社會研究中心、藝術、文化與具身研究中心、健康與醫學研究中心", true],
      ["完成 POSI 資料庫開發並正式上線（2026 年 9 月 27 日已上線）", true],
      ["啓動“十五五”規劃研究項目", true],
      ["開通合作、研究員及會員申請流程", true],
      ["發表研究院首批期刊論文，並開始資助期刊論文", true],
      ["招募首批研究員和訪問學者", false],
      ["宣佈成立人工智能與未來社會研究中心（籌建中）", false],
      ["發佈首批工作論文", false],
    ] },
    { key: 'upcoming', color: 'var(--accent-steel)', phase: "第二階段", label: "發展建設", status: "即將開展", goals: [
      ["使人工智能與未來社會研究中心全面運行，成爲第六個研究中心", false],
      ["擴大研究員網絡，納入至少五個國家的學者", false],
      ["擴大訪問學者和研究員計劃", false],
      ["發佈全景研究院首份年度報告", false],
      ["擴大 POSI 公共訪問運營和用戶服務", false],
      ["產出併發布進行中項目的首批完整研究報告", false],
      ["將研究院資助擴展至圖書和專著", false],
      ["舉辦首個以研究院名義組織的學術研討系列", false],
      ["完成顧問委員會組建並公佈成員", false],
      ["開始與合作機構進行正式機構合作洽談", false],
    ] },
    { key: 'planned', color: 'var(--text-muted)', phase: "第三階段", label: "拓展建設", status: "規劃中", goals: [
      ["舉辦首次研究院組織的國際學術會議", false],
      ["與至少三家合作機構建立正式機構合作協議", false],
      ["設立教育與學習研究中心，作爲第七個研究中心", false],
      ["將 POSI 資料庫擴展至更廣泛的學術期刊", false],
      ["與學術出版社合作推出首部研究院主編文集", false],
      ["開設面向期刊編輯和研究團隊的培訓項目", false],
    ] },
    { key: 'longterm', color: 'var(--text-muted)', phase: "第四階段", label: "鞏固發展", status: "長期", goals: [
      ["使全部七個研究中心達到完全運行能力", false],
      ["在各類出版成果上實現持續的年度產出", false],
      ["建立獲得認可並被持續引用的期刊與政策評價框架", false],
      ["與合作機構共同設立多年期研究資助計劃", false],
      ["圍繞研究院研究主題建設實踐共同體", false],
      ["打造以學術傳播和學術出版爲主題的大型會議系列", false],
      ["使 POSI 資料庫發展成爲公認的全球性資源", false],
    ] },
  ],
};

export function getRoadmap(lang: Lang): RoadmapPhase[] {
  return data[lang].map((p, i) => ({
    key: p.key,
    phase: p.phase,
    label: p.label,
    period: periods[i],
    status: p.status,
    color: p.color,
    goals: p.goals.map(([text, done]) => ({ text, done })),
  }));
}

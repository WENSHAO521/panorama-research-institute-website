// Journal articles supported by Panorama Research Institute sponsorship.
// `instituteAuthors`: at least one author publishes under the Institute's name / is Institute leadership or staff.
export interface JournalArticle {
  title: string;
  authors: string;
  journal: string;
  volume: string;
  pages: string;
  year: string;
  doi: string;
  url: string;
  sponsorNo: string;
  instituteAuthors: boolean;
  /** Set to false while the DOI is not yet registered at doi.org (it would 404); remove once it resolves. */
  doiRegistered?: boolean;
  /** Research center slugs this article belongs to; drives the counts on the center pages. */
  centers: string[];
}

export const journalArticles: JournalArticle[] = [
  {
    title: "From Urban–Rural Antagonism to Urban–Rural Integration: A Contemporary Interpretation of Marx’s Theory of Urban–Rural Relations",
    authors: "Xinmeng Wang, Junyu Zhu",
    journal: "Contemporary Review of Political Thought",
    volume: "Vol. 1", pages: "27–37", year: "2026",
    doi: "10.63802/cropt.2026.363",
    url: "https://journals.panorama-sg.com/cropt/article/view/363",
    sponsorNo: "PSG-PRI-SPN-2026-000024", instituteAuthors: false, centers: [],
  },
  {
    title: "Quality and Reliability of Chinese-Language Lumbar Disc Herniation Videos on TikTok and Bilibili: A Cross-Sectional Multiplatform Study",
    authors: "Chen Wang, Chao Yan, Yibo Ma, Guoyi Wang, Yuyu Zhang, Yayan Wang, Qian Wu, Xin Qi, Qilong Wang, Chengwen Song",
    journal: "Health Nexus: Digital Health and Medical AI",
    volume: "Vol. 1, No. 1", pages: "37–60", year: "2026",
    doi: "10.63802/hndh.V1.I1.361",
    url: "https://journals.panorama-sg.com/hndh/article/view/361",
    sponsorNo: "PSG-PRI-SPN-2026-000019", instituteAuthors: true, centers: ["health-medical-research"],
  },
  {
    title: "Human Oversight Is Not Enough: Rethinking Accountability in AI-Assisted Clinical Decision-Making",
    authors: "Yangyi Ren",
    journal: "Health Nexus: Digital Health and Medical AI",
    volume: "Vol. 1, No. 1", pages: "61–71", year: "2026",
    doi: "10.63802/hndh.V1.I1.362",
    url: "https://journals.panorama-sg.com/hndh/article/view/362",
    sponsorNo: "PSG-PRI-SPN-2026-000018", instituteAuthors: false, centers: ["health-medical-research"],
  },
  {
    title: "Assessing the quality and reliability of short video platforms as sources of information on depression among Chinese adolescents: a comparative study with data from Douyin, Bilibili, WeChat, and Xiaohongshu APPs",
    authors: "Qilong Wang, Xixi Fan, Xin Qi, Yuyu Zhang, Yayan Wang, Chen Wang, Qian Wu, Chengwen Song, Siheng Ma",
    journal: "Health Nexus: Digital Health and Medical AI",
    volume: "Vol. 1, No. 1", pages: "14–36", year: "2026",
    doi: "10.63802/hndh.V1.I1.356",
    url: "https://journals.panorama-sg.com/hndh/article/view/356",
    sponsorNo: "PSG-PRI-SPN-2026-000017", doiRegistered: false, instituteAuthors: true, centers: ["health-medical-research"],
  },
  {
    title: "Digital Phenotyping for Relapse Prediction in Depression and Schizophrenia: A Narrative Review of Signals, Models, and Clinical Translation",
    authors: "Qian Wu, Xixi Fan, Xin Qi",
    journal: "Health Nexus: Digital Health and Medical AI",
    volume: "Vol. 1, No. 1", pages: "1–13", year: "2026",
    doi: "10.63802/hndh.V1.I1.358",
    url: "https://journals.panorama-sg.com/hndh/article/view/358",
    sponsorNo: "PSG-PRI-SPN-2026-000016", doiRegistered: false, instituteAuthors: false, centers: ["health-medical-research"],
  },
  {
    title: "Liturgical Sonic Order in the Catholic Mass: Music, Participation, and the German-Language Gotteslob",
    authors: "Yanlin Feng, Sebastian Lenz",
    journal: "Resonance: Journal of Global Music Studies",
    volume: "Vol. 2, No. 2", pages: "31–43", year: "2026",
    doi: "10.63802/rjgms.V2.I2.360",
    url: "https://journals.panorama-sg.com/Resonance/article/view/360",
    sponsorNo: "PSG-PRI-SPN-2026-000015", instituteAuthors: true, centers: ["arts-culture-embodiment"],
  },
  {
    title: "From Technological Capability to Disaster Governance in North Korea: An Evidence-Bounded Framework from Scientific Publications",
    authors: "Leyuan Liu",
    journal: "PoliEcoM Administration Review",
    volume: "Vol. 2, No. 2", pages: "1–18", year: "2026",
    doi: "10.63802/pemr.V2.I2.357",
    url: "https://journals.panorama-sg.com/pemr/article/view/357",
    sponsorNo: "PSG-PRI-SPN-2026-000014", instituteAuthors: false, centers: ["policy-social-research"],
  },
];

export const countForCenter = (slug: string) =>
  journalArticles.filter((a) => a.centers.includes(slug)).length;

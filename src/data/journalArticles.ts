// Articles published in Panorama journals that carry Panorama Research Institute sponsorship.
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
}

export const journalArticles: JournalArticle[] = [
  {
    title: "Assessing the quality and reliability of short video platforms as sources of information on depression among Chinese adolescents: a comparative study with data from Douyin, Bilibili, WeChat, and Xiaohongshu APPs",
    authors: "Qilong Wang, Xixi Fan, Xin Qi, Yuyu Zhang, Yayan Wang, Chen Wang, Qian Wu, ChengWen Song, Siheng Ma",
    journal: "Health Nexus: Digital Health and Medical AI",
    volume: "Vol. 1, No. 1", pages: "14–36", year: "2026",
    doi: "10.63802/hndh.V1.I1.356",
    url: "https://journals.panorama-sg.com/hndh/article/view/356",
    sponsorNo: "PSG-PRI-SPN-2026-000017", instituteAuthors: true,
  },
  {
    title: "Digital Phenotyping for Relapse Prediction in Depression and Schizophrenia: A Narrative Review of Signals, Models, and Clinical Translation",
    authors: "Qian Wu, Xixi Fan, Xin Qi",
    journal: "Health Nexus: Digital Health and Medical AI",
    volume: "Vol. 1, No. 1", pages: "1–13", year: "2026",
    doi: "10.63802/hndh.V1.I1.358",
    url: "https://journals.panorama-sg.com/hndh/article/view/358",
    sponsorNo: "PSG-PRI-SPN-2026-000016", instituteAuthors: false,
  },
  {
    title: "Liturgical Sonic Order in the Catholic Mass: Music, Participation, and the German-Language Gotteslob",
    authors: "Yanlin Feng, Sebastian Lenz",
    journal: "Resonance: Journal of Global Music Studies",
    volume: "Vol. 2, No. 2", pages: "31–43", year: "2026",
    doi: "10.63802/rjgms.V2.I2.360",
    url: "https://journals.panorama-sg.com/Resonance/article/view/360",
    sponsorNo: "PSG-PRI-SPN-2026-000015", instituteAuthors: true,
  },
  {
    title: "From Technological Capability to Disaster Governance in North Korea: An Evidence-Bounded Framework from Scientific Publications",
    authors: "Leyuan Liu",
    journal: "PoliEcoM Administration Review",
    volume: "Vol. 2, No. 2", pages: "1–18", year: "2026",
    doi: "10.63802/pemr.V2.I2.357",
    url: "https://journals.panorama-sg.com/pemr/article/view/357",
    sponsorNo: "PSG-PRI-SPN-2026-000014", instituteAuthors: false,
  },
];

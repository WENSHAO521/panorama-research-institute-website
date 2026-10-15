// Working papers published by Panorama Research Institute, newest first.
// Each paper is deposited on Zenodo, which assigns its DOI.
// Numbering: PRI-WP-<year>-<three-digit sequence>, e.g. "PRI-WP-2026-001".
// While this list is empty the working papers page shows the "not released yet" notice.
export interface WorkingPaper {
  title: string;
  authors: string;
  /** Series number, e.g. "PRI-WP-2026-001". */
  number: string;
  /** Publication date, YYYY-MM-DD. */
  date: string;
  abstract: string;
  doi: string;
  /** Page for the paper (landing page or PDF). */
  url: string;
  /** Set to false while the DOI is not yet registered at doi.org (it would 404); remove once it resolves. */
  doiRegistered?: boolean;
}

export const workingPapers: WorkingPaper[] = [];

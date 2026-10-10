// Books and other monographs supported by Panorama Research Institute sponsorship.
// Add an entry here when a sponsored book is published; the Sponsorship pages update automatically.
export interface SponsoredBook {
  title: string;
  authors: string;
  publisher: string;
  year: string;
  isbn?: string;
  doi?: string;
  url?: string;
  sponsorNo: string;
}

export const sponsoredBooks: SponsoredBook[] = [];

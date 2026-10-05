# Panorama Research Institute

**Panorama Research Institute (PRI)** is a research institute established by **Panorama Scholarly Group (PSG)**, with its own academic governance and institutional identity. It exercises independent academic judgment within PSG's overall governance, legal, and administrative framework. It conducts and coordinates research, organizes research projects, and supports scholarly publishing studies, journal indexing and evaluation, policy and social research, and international academic collaboration.

PRI's work spans seven research areas:

- Scholarly Publishing Studies
- Journal Indexing and Evaluation
- Policy and Social Research
- AI and Future Society
- Education and Learning Research
- Arts, Culture and Embodiment
- Health and Medical Research

The Institute operates through dedicated research centers, publishes working papers, research reports, and policy briefs, organizes academic conferences and seminars, and engages research fellows, visiting scholars, and research assistants through its fellowship program. It also links to the wider Panorama Scholarly Group platforms: Panorama Journals, Panorama Books, the POSI scholarly indexing database, and Panorama Scholar Profiles.

> PSG serves as PRI's parent organization and legal and administrative entity. PRI is not a separate legal entity. Formal contracts and legal instruments relating to PRI activities identify PSG as the legal party and are signed by PSG-authorized representatives.

## Charter versions and downloadable documents

Charter v1.1 is effective on 2026-10-05. The English, Simplified Chinese, and Traditional Chinese web pages and PDFs contain the same 20 articles. The revision clarifies institutional status, academic affiliation, legal execution, and financial administration, while preserving Article 20's amendment procedure.

To regenerate the charter PDFs, build the site and run `node scripts/generate-charter-pdfs.mjs` with an installed Chromium browser, `playwright-core`, Python, and `pypdf`. Set `PRI_BROWSER_EXECUTABLE` to the browser executable if needed. `PRI_PLAYWRIGHT_MODULE` may point to an existing runtime-provided module, and `PRI_PYTHON` may point to a Python executable with `pypdf`; the generator does not install dependencies. The PDFs are generated directly from the built charter pages. The generator then embeds a non-printing provenance identifier in every PDF page and its document metadata. This identifier assists provenance checks but does not prevent copying or removal. Intermediate HTML and article manifests are written to `.charter-preview/`.

Word templates are v1.1 (2026-10-05). Their generators carry the updated institutional statements so regeneration preserves the new positioning.

## Contact

Email: research@panorama-sg.com
Website: [research.panorama-sg.com](https://research.panorama-sg.com)

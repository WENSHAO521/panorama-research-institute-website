export interface NavChild {
  label: string;
  href: string;
  external?: boolean;
}

export interface NavGroup {
  title: string;
  links: NavChild[];
}

export interface NavItem {
  label: string;
  href: string;
  mega?: boolean;
  children?: NavChild[];
  groups?: NavGroup[];
}

export const navigation: NavItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Institute",
    href: "/about",
    mega: true,
    groups: [
      {
        title: "About",
        links: [
          { label: "Overview",                href: "/about" },
          { label: "Mission & Vision",        href: "/about/mission-vision" },
          { label: "Institutional Status",    href: "/about/institutional-status" },
          { label: "Contact the Institute",   href: "/contact" },
        ],
      },
      {
        title: "Framework",
        links: [
          { label: "Institute Framework",     href: "/framework" },
          { label: "Organizational Structure",href: "/framework/organizational-structure" },
          { label: "Development Roadmap",     href: "/framework/development-roadmap" },
        ],
      },
      {
        title: "Governance",
        links: [
          { label: "Institute Charter",               href: "/charter" },
          { label: "Governance Rules",                href: "/governance/rules" },
          { label: "Academic Independence Statement", href: "/governance/academic-independence" },
          { label: "Research Ethics",                 href: "/governance/research-ethics" },
          { label: "Conflict of Interest Policy",     href: "/governance/conflict-of-interest" },
          { label: "Publication & Report Policy",     href: "/governance/publication-report-policy" },
          { label: "Data & Documentation Policy",     href: "/governance/data-documentation-policy" },
          { label: "Name and Logo Usage",             href: "/governance/name-logo-usage" },
          { label: "Amendment Procedure",             href: "/governance/amendment-procedure" },
        ],
      },
    ],
  },
  {
    label: "Research",
    href: "/research-areas",
    mega: true,
    groups: [
      {
        title: "Research Structure",
        links: [
          { label: "Research Areas",       href: "/research-areas" },
          { label: "Research Centers",     href: "/research-centers" },
          { label: "Research Projects",    href: "/projects" },
          { label: "Current Initiatives",  href: "/projects/current" },
          { label: "Research Archive",     href: "/projects/archive" },
        ],
      },
      {
        title: "Research Centers",
        links: [
          { label: "Scholarly Publishing Studies",  href: "/research-centers/scholarly-publishing-studies" },
          { label: "Scholarly Indexing & Evaluation", href: "/research-centers/scholarly-indexing-evaluation" },
          { label: "Policy and Social Research",    href: "/research-centers/policy-social-research" },
          { label: "AI and Future Society",         href: "/research-centers/ai-future-society" },
          { label: "Arts, Culture and Embodiment",  href: "/research-centers/arts-culture-embodiment" },
          { label: "Health and Medical Research",   href: "/research-centers/health-medical-research" },
        ],
      },
      {
        title: "Current Projects",
        links: [
          { label: "POSI Scholarly Indexing Project",    href: "/projects/posi-scholarly-indexing" },
          { label: "Fifteenth Five-Year Plan Studies",   href: "/projects/fifteenth-five-year-plan-studies" },
          { label: "AI and Future Society",              href: "/projects/ai-future-society" },
          { label: "Youth Digital Governance",           href: "/projects/youth-digital-governance" },
        ],
      },
    ],
  },
  {
    label: "Publications",
    href: "/publications",
    mega: true,
    groups: [
      {
        title: "Publications",
        links: [
          { label: "Overview",              href: "/publications" },
          { label: "Research Reports",      href: "/publications/research-reports" },
          { label: "Working Papers",        href: "/publications/working-papers" },
          { label: "Policy Briefs",         href: "/publications/policy-briefs" },
          { label: "Edited Volumes",        href: "/publications/edited-volumes" },
          { label: "Annual Reports",        href: "/publications/annual-reports" },
        ],
      },
      {
        title: "Guidelines & Citation",
        links: [
          { label: "Publication Guidelines",  href: "/publications/guidelines" },
          { label: "Suggested Citation",      href: "/publications/citation" },
          { label: "Institutional Guidelines",href: "/resources/guidelines" },
          { label: "Logo Usage Guidelines",   href: "/resources/logo-usage-guidelines" },
        ],
      },
      {
        title: "Resources & Templates",
        links: [
          { label: "Downloads",                     href: "/resources" },
          { label: "Forms",                         href: "/resources/forms" },
          { label: "Templates",                     href: "/resources/templates" },
          { label: "Institute Charter PDF",         href: "/resources/charter-pdf" },
          { label: "Research Proposal Template",    href: "/resources/research-proposal-template" },
          { label: "Report Template",               href: "/resources/report-template" },
          { label: "Policy Brief Template",         href: "/resources/policy-brief-template" },
        ],
      },
    ],
  },
  {
    label: "Events",
    href: "/events",
    children: [
      { label: "Upcoming Events",   href: "/events" },
      { label: "Conferences",       href: "/events/conferences" },
      { label: "Seminars",          href: "/events/seminars" },
      { label: "Workshops",         href: "/events/workshops" },
      { label: "Calls for Papers",  href: "/events/calls-for-papers" },
      { label: "Calls for Chapters",href: "/events/calls-for-chapters" },
      { label: "Training Programs", href: "/events/training-programs" },
      { label: "Past Events",       href: "/events/archive" },
    ],
  },
  {
    label: "People",
    href: "/people",
    children: [
      { label: "Institute Leadership",         href: "/people/leadership" },
      { label: "Research Fellows",             href: "/people/research-fellows" },
      { label: "Associate Research Fellows",   href: "/people/associate-research-fellows" },
      { label: "Visiting Scholars",            href: "/people/visiting-scholars" },
      { label: "Research Assistants",          href: "/people/research-assistants" },
      { label: "Advisory Board",               href: "/people/advisory-board" },
      { label: "Project Contributors",         href: "/people/project-contributors" },
      { label: "Join as a Researcher",         href: "/people/join" },
    ],
  },
  {
    label: "Collaboration",
    href: "/collaboration",
    children: [
      { label: "Overview",                      href: "/collaboration" },
      { label: "Membership Program",            href: "/collaboration/membership" },
      { label: "Institutional Cooperation",     href: "/collaboration/institutional-cooperation" },
      { label: "Research Project Proposal",     href: "/collaboration/research-project-proposal" },
      { label: "Edited Volume Proposal",        href: "/collaboration/edited-volume-proposal" },
      { label: "Special Issue Proposal",        href: "/collaboration/special-issue-proposal" },
      { label: "Visiting Scholar Application",  href: "/collaboration/visiting-scholar-application" },
      { label: "Research Fellow Application",   href: "/collaboration/research-fellow-application" },
      { label: "Undergraduate Intern Application", href: "/collaboration/undergraduate-research-intern-application" },
      { label: "Event Cooperation",             href: "/collaboration/event-cooperation" },
      { label: "Submit a Proposal",             href: "/collaboration/submit" },
    ],
  },
];

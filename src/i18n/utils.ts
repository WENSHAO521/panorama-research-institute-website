export type Lang = 'en' | 'zh-cn' | 'zh-tw';

export const defaultLang: Lang = 'en';

export function getLangFromUrl(url: URL): Lang {
  const seg = url.pathname.split('/')[1];
  if (seg === 'zh-cn' || seg === 'zh-tw') return seg;
  return defaultLang;
}

export function getBasePath(pathname: string): string {
  if (pathname.startsWith('/zh-cn')) return pathname.slice(6) || '/';
  if (pathname.startsWith('/zh-tw')) return pathname.slice(6) || '/';
  return pathname;
}

export function getLocalizedPath(targetLang: Lang, currentPathname: string): string {
  const base = getBasePath(currentPathname);
  if (targetLang === 'en') return base;
  return `/${targetLang}${base === '/' ? '' : base}`;
}

import type { Lang } from './utils';
import type { NavItem, NavChild, NavGroup } from '../data/navigation';
import { navigation as enNav } from '../data/navigation';
import { translate } from './dictionary';

function localizeHref(href: string, lang: Lang): string {
  if (lang === 'en' || href === '#' || href.startsWith('http')) return href;
  return `/${lang}${href}`;
}

function translateChild(child: NavChild, lang: Lang): NavChild {
  return {
    ...child,
    label: translate(lang, child.label),
    href: child.external ? child.href : localizeHref(child.href, lang),
  };
}

function translateGroup(group: NavGroup, lang: Lang): NavGroup {
  return {
    title: translate(lang, group.title),
    links: group.links.map((link) => translateChild(link, lang)),
  };
}

export function getNavigation(lang: Lang): NavItem[] {
  if (lang === 'en') return enNav;
  return enNav.map((item) => ({
    ...item,
    label: translate(lang, item.label),
    href: localizeHref(item.href, lang),
    children: item.children?.map((child) => translateChild(child, lang)),
    groups: item.groups?.map((group) => translateGroup(group, lang)),
  }));
}

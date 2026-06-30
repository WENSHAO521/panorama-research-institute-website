import type { Lang } from './utils';
import type { NavItem } from '../data/navigation';
import { navigation as enNav } from '../data/navigation';

export function getNavigation(_lang: Lang): NavItem[] {
  return enNav;
}

export interface INavItem {
  index: string,
  icon?: string,
  title: string,
  component?: string,
  htmlClass?: string,
  router?: string,
}

export const nav : INavItem[] = [
  {
    index: '/',
    icon: 'fa-list-check',
    title: 'Conferences',
  },
  {
    index: '/room',
    icon: 'fa-table',
    title: 'Rooms',
  },
  {
    index: '/logout',
    icon: 'fa-right-from-bracket',
    title: 'Log out',
    htmlClass: 'absolute bottom-0 w-full',
  },
];

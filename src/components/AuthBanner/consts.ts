import { LinkMetadata } from './types';

export const publicLinks: Readonly<LinkMetadata[]> = [
  {
    titleTKey: 'sign_in_link',
    href: '/sign-in',
  },
  {
    titleTKey: 'sign_up_link',
    href: '/sign-up',
    variant: 'outlined',
  },
];

export const privateLinks: Readonly<LinkMetadata[]> = [
  {
    titleTKey: 'rest_link',
    href: '/GET',
  },
  {
    titleTKey: 'graphql_link',
    href: '/GRAPHQL',
  },
  {
    titleTKey: 'history_link',
    href: '/history',
  },
];

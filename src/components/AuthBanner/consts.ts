import { LinkMetadata } from './types';

export const publicLinks: Readonly<LinkMetadata[]> = [
  {
    title: 'Sign In',
    href: '/sign-in',
  },
  {
    title: 'Sign Up',
    href: '/sign-up',
    variant: 'outlined',
  },
];

export const privateLinks: Readonly<LinkMetadata[]> = [
  {
    title: 'RESTfull Client',
    href: '/GET',
  },
  {
    title: 'GraphiQL Client',
    href: '/GRAPHQL',
  },
  {
    title: 'History',
    href: '/history',
  },
];

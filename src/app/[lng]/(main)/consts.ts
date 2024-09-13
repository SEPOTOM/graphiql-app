import { TeamMember } from './types';

export const teamMembers: Readonly<TeamMember[]> = [
  {
    devTKey: 'artyom',
    githubName: 'sepotom',
    githubLink: 'https://github.com/sepotom',
    contributionsTKeys: ['main_page', 'forms', 'setup', 'auth'],
  },
  {
    devTKey: 'svetlana',
    githubName: 'svetailina',
    githubLink: 'https://github.com/svetailina',
    contributionsTKeys: ['rest_page', 'rest_logic', 'history_page', 'history_logic'],
  },
  {
    devTKey: 'pavel',
    githubName: 'pavel-kuvshinov',
    githubLink: 'https://github.com/pavel-kuvshinov',
    contributionsTKeys: ['graphql_page', 'graphql_logic', 'not_found_page'],
  },
];

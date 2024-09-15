import { http, HttpHandler, HttpResponse } from 'msw';
import { mockedGraphQlError, mockedGraphQlSchema } from './mocks';

import { TokenRes } from '@/types';

export const handlers: HttpHandler[] = [
  http.post('https://rickandmortyapi.com/graphql', () => HttpResponse.json(mockedGraphQlSchema)),
  http.post('h', () => HttpResponse.json(mockedGraphQlError)),
  http.post('/sign-up/api', () => {
    const resBody: TokenRes = {
      token: 'test-token',
    };

    return HttpResponse.json(resBody);
  }),
];

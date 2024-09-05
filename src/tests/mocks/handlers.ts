import { http, HttpHandler, HttpResponse } from 'msw';
import { mockedGraphQlError, mockedGraphQlSchema } from './mocks';

export const handlers: HttpHandler[] = [
  http.post('https://rickandmortyapi.com/graphql', () => HttpResponse.json(mockedGraphQlSchema)),
  http.post('h', () => HttpResponse.json(mockedGraphQlError)),
];

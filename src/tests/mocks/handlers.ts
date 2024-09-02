import { HttpHandler, HttpResponse, http } from 'msw';

import { TokenRes } from '@/types';

export const handlers: HttpHandler[] = [
  http.post('/sign-up/api', () => {
    const resBody: TokenRes = {
      token: 'test-token',
    };

    return HttpResponse.json(resBody);
  }),
];

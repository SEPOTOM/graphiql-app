import { NextRequest } from 'next/server';

type reqBody = {
  method: string;
  endpoint: string;
  body: Nullable<string>;
  headers: Record<string, string>;
};

export async function POST(req: NextRequest) {
  const reqBody: reqBody = await req.json();
  const response = await fetch(reqBody.endpoint, {
    method: reqBody.method,
    body: reqBody.body,
    headers: reqBody.headers,
  });

  const status = response.status;
  const statusText = response.statusText;
  const init = { status: status, statusText: statusText };
  const data = response.body;
  const myResponse = new Response(data, init);

  return myResponse;
}

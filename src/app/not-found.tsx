'use client';

import Error from 'next/error';

export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <p>Custom 404 page</p>
        <Error statusCode={404} />
      </body>
    </html>
  );
}

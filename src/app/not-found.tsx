import { BasicNotFound } from '@/components';
import { fallbackLng } from '@/utils';

export default function NotFound() {
  const lng = fallbackLng;

  return (
    <html lang={lng}>
      <body>
        <BasicNotFound lng={lng} />
      </body>
    </html>
  );
}

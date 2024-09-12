import CustomNotFound from '@/components/404/404';
import { LngParam } from '@/types';

export default function NotFound({ params }: { params: LngParam }) {
  const { lng } = params;

  return (
    <html lang={lng}>
      <body>
        <CustomNotFound lng={lng} />
      </body>
    </html>
  );
}

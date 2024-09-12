'use client';

import { useTranslation } from '@/hooks';
import { useEffect, useState } from 'react';

interface CustomNotFoundProps {
  lng: string;
}

export default function CustomNotFound({ lng }: CustomNotFoundProps) {
  const { t } = useTranslation(lng);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return <>{isClient && <p>{t('not_found')}</p>}</>;
}

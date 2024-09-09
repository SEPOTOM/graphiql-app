import { Languages } from '@/types';

export interface LngSelectProps {
  lng: string;
}

export type LanguagesMap = Record<Languages, string>;

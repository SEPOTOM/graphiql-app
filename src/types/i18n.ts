import { languages } from '@/utils';

export interface LngParam {
  lng: string;
}

export type Languages = (typeof languages)[number];

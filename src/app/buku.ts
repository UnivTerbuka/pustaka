import { Modul } from './modul';

export interface Buku {
  id: string;
  name?: string;
  author?: string;
  thumbUrl?: string;
  initial?: boolean;
  modul?: Modul[];
  current?: string;
}

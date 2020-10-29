import { from } from 'rxjs';
import { Modul } from './modul';

export interface Buku {
  id: string;
  initial?: boolean;
  modul?: Modul[];
}

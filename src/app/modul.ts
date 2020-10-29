export interface Modul {
  doc: string;
  end: number;
  form?: Form;
  nama?: string;
  subfolder: string;
  url?: string;
}

export enum Form {
  Img = 'img',
  Txt = 'txt',
}

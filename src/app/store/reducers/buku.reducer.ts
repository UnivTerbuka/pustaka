import { act } from '@ngrx/effects';
import { createReducer, on } from '@ngrx/store';
import { Action } from 'rxjs/internal/scheduler/Action';
import {
  BukuAction,
  BukuActionTypes,
  GetBukuSuccessAction,
} from '../actions/buku.actions';
import { Buku } from '../models/buku';

export interface BukuState {
  list: Array<Buku>;
  loading: boolean;
  error?: string;
}

const initialState: BukuState = {
  list: [
    {
      id: 'BING330102',
      initial: true,
      modul: [
        {
          doc: 'DAFIS',
          end: 8,
          form: 'img',
          nama: '[Daftar Isi]',
          subfolder: 'BING330102',
          url:
            'http://www.pustaka.ut.ac.id/reader/index.php?subfolder=BING330102/&doc=DAFIS.pdf',
        },
        {
          doc: 'TINJAUAN',
          end: 2,
          form: 'img',
          nama: '[Tinjauan Mata Kuliah]',
          subfolder: 'BING330102',
          url:
            'http://www.pustaka.ut.ac.id/reader/index.php?subfolder=BING330102/&doc=TINJAUAN.pdf',
        },
        {
          doc: 'M1',
          end: 39,
          form: 'img',
          nama: '[Modul 1]',
          subfolder: 'BING330102',
          url:
            'http://www.pustaka.ut.ac.id/reader/index.php?subfolder=BING330102/&doc=M1.pdf',
        },
        {
          doc: 'M2',
          end: 50,
          form: 'img',
          nama: '[Modul 2]',
          subfolder: 'BING330102',
          url:
            'http://www.pustaka.ut.ac.id/reader/index.php?subfolder=BING330102/&doc=M2.pdf',
        },
        {
          doc: 'M3',
          end: 41,
          form: 'img',
          nama: '[Modul 3]',
          subfolder: 'BING330102',
          url:
            'http://www.pustaka.ut.ac.id/reader/index.php?subfolder=BING330102/&doc=M3.pdf',
        },
        {
          doc: 'M4',
          end: 45,
          form: 'img',
          nama: '[Modul 4]',
          subfolder: 'BING330102',
          url:
            'http://www.pustaka.ut.ac.id/reader/index.php?subfolder=BING330102/&doc=M4.pdf',
        },
        {
          doc: 'M5',
          end: 46,
          form: 'img',
          nama: '[Modul 5]',
          subfolder: 'BING330102',
          url:
            'http://www.pustaka.ut.ac.id/reader/index.php?subfolder=BING330102/&doc=M5.pdf',
        },
        {
          doc: 'M6',
          end: 40,
          form: 'img',
          nama: '[Modul 6]',
          subfolder: 'BING330102',
          url:
            'http://www.pustaka.ut.ac.id/reader/index.php?subfolder=BING330102/&doc=M6.pdf',
        },
        {
          doc: 'M7',
          end: 30,
          form: 'img',
          nama: '[Modul 7]',
          subfolder: 'BING330102',
          url:
            'http://www.pustaka.ut.ac.id/reader/index.php?subfolder=BING330102/&doc=M7.pdf',
        },
        {
          doc: 'M8',
          end: 30,
          form: 'img',
          nama: '[Modul 8]',
          subfolder: 'BING330102',
          url:
            'http://www.pustaka.ut.ac.id/reader/index.php?subfolder=BING330102/&doc=M8.pdf',
        },
        {
          doc: 'M9',
          end: 38,
          form: 'img',
          nama: '[Modul 9]',
          subfolder: 'BING330102',
          url:
            'http://www.pustaka.ut.ac.id/reader/index.php?subfolder=BING330102/&doc=M9.pdf',
        },
      ],
    },
  ],
  loading: false,
  error: undefined,
};

export function BukuReducer(
  state: BukuState = initialState,
  action: BukuAction
) {
  switch (action.type) {
    case BukuActionTypes.GET_BUKU:
      return { ...state, loading: true };
    case BukuActionTypes.GET_BUKU_SUCCESS:
      return { list: action.payload, loading: false, ...state };
    case BukuActionTypes.GET_BUKU_FAILURE:
      return { ...state, error: action.payload, loading: false };
    default:
      return { ...state };
  }
}

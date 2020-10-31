import { BukuAction, BukuActionTypes } from '../actions/buku.actions';
import { Buku } from '../models/buku';

export interface BukuState {
  list: Array<Buku>;
  loading: boolean;
  error?: string;
}

const initialState: BukuState = {
  list: [],
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
      return {
        loading: false,
        list: [...state.list, action.payload],
        error: undefined,
      };
    case BukuActionTypes.GET_BUKU_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case BukuActionTypes.DELETE_BUKU:
      return {
        ...state,
        list: state.list.filter((item) => item.id !== action.payload),
      };
    default:
      return { ...state };
  }
}

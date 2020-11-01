import { PageAction, PageActionTypes } from '../actions/page.actions';
import { Page } from '../models/page';
import { PageInfo } from '../models/page-info';

export interface PageState {
  list: Array<Page>;
  current?: PageInfo;
  loading: boolean;
  error?: string;
}

const initialState: PageState = {
  list: [],
  loading: false,
  current: undefined,
  error: undefined,
};

export function PageReducer(
  state: PageState = initialState,
  action: PageAction
): PageState {
  switch (action.type) {
    case PageActionTypes.GET_PAGE:
      return { ...state, loading: true };
    case PageActionTypes.GET_PAGE_SUCCESS:
      return {
        ...state,
        list: [...state.list, ...action.payload],
        loading: false,
      };
    case PageActionTypes.GET_PAGE_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case PageActionTypes.CHANGE_PAGE:
      return { ...state, loading: true };
    case PageActionTypes.CHANGE_PAGE_SUCCESS:
      return {
        ...state,
        list: [...action.payload],
        loading: false,
      };
    case PageActionTypes.CHANGE_PAGE_FAILURE:
      return { ...state, error: action.payload, loading: false };
    default:
      return { ...state };
  }
}

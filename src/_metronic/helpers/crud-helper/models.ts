import { Dispatch, SetStateAction } from 'react';

export type ID = undefined | null | number;

export type PaginationState = {
  items_per_page: 10 | 30 | 50 | 100;
  page: number;
  links?: Array<{ active: boolean; label: string; page: number | null; url: string | null }>;
};

export type SortState = {
  order?: 'asc' | 'desc';
  sort?: string;
};

export type FilterState = {
  filter?: unknown;
};

export type SearchState = {
  search?: string;
};

export type Response<T> = {
  data?: T;
  payload?: {
    errors?: {
      [key: string]: Array<string>;
    };
    message?: string;
    pagination?: PaginationState;
  };
};

export type QueryState = PaginationState & SortState & FilterState & SearchState;

export type QueryRequestContextProps = {
  state: QueryState;
  updateState: (updates: Partial<QueryState>) => void;
};

export const initialQueryState: QueryState = {
  items_per_page: 10,
  page: 1,
};

export const initialQueryRequest: QueryRequestContextProps = {
  state: initialQueryState,
  updateState: () => {
    /*empty*/
  },
};

export type QueryResponseContextProps<T> = {
  isLoading: boolean;
  query: string;
  refetch: () => void;
  response?: Response<Array<T>> | undefined;
};

export const initialQueryResponse = {
  isLoading: false,
  query: '',
  refetch: () => {
    /*empty*/
  },
};

export type ListViewContextProps = {
  clearSelected: () => void;
  disabled: boolean;
  isAllSelected: boolean;
  onSelect: (selectedId: ID) => void;
  onSelectAll: () => void;
  selected: Array<ID>;
  setItemIdForUpdate: Dispatch<SetStateAction<ID>>;

  // NULL => (CREATION MODE) | MODAL IS OPENED
  // NUMBER => (EDIT MODE) | MODAL IS OPENED
  // UNDEFINED => MODAL IS CLOSED
  itemIdForUpdate?: ID;
};

export const initialListView: ListViewContextProps = {
  clearSelected: () => {
    /*empty*/
  },
  disabled: false,
  isAllSelected: false,
  onSelect: () => {
    /*empty*/
  },
  onSelectAll: () => {
    /*empty*/
  },
  selected: [],
  setItemIdForUpdate: () => {
    /*empty*/
  },
};

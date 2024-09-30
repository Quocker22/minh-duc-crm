import { SortingState } from '@tanstack/react-table';
import { debounce } from 'lodash-es';
import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { SEARCH_DEBOUNCE_TIME } from '@/constants';
import { QueryState } from '@/models';
import { parseRequestQuery, stringifyRequestQuery } from '@/utils';

/**
 * It provides a set of hooks and functions to manage the query state of a table
 * @param [onGlobalSearchChange] - A callback function that will be called when the global search is
 * updated.
 * @param [isSyncQueryStringToUrl=true] - Whether to sync the query string to the URL.
 */
function useQueryRequest<T extends object>(
  defaultState?: Partial<QueryState<T>>,
  onGlobalSearchChange?: (search: string) => void,
  isSyncQueryStringToUrl = true
) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [queryState, setQueryState] = useState<QueryState<T>>(getInitialQueryState);

  // current string version of queryState
  const queryStateStringified = useMemo(() => stringifyRequestQuery(queryState), [queryState]);

  // old string version of queryState
  const [queryString, setQueryString] = useState<string>(queryStateStringified);

  // if queryString !== queryStateStringified => set queryString = queryStateStringified => sync to url if allowed
  useEffect(() => {
    if (queryString === queryStateStringified) return;
    setQueryString(queryStateStringified);
    isSyncQueryStringToUrl && setSearchParams(queryStateStringified, { replace: true });
  }, [queryStateStringified]);

  function getInitialQueryState(): QueryState<T> {
    return searchParams.toString()
      ? { ...defaultState, ...parseRequestQuery(searchParams.toString()) }
      : { ...defaultState, limit: 20, page: 1 };
  }

  // set state is asynchronous so if call multiple func in one time => on has effect at latest call
  function updateQueryState(updates: Partial<QueryState<T>>) {
    const updatedState = { ...queryState, ...updates };
    setQueryState(updatedState);
  }

  // HANDLE FILTERS
  function updateFiltersState(updates: Partial<T>) {
    updateQueryState({ filters: { ...queryState.filters!, ...updates } });
  }

  // HANDLE SORT
  function updateSortStateByTable(sorting: SortingState) {
    if (!sorting.length) {
      return updateQueryState({ column: undefined, kind: undefined });
    }

    const { id, desc } = sorting[sorting.length - 1];
    updateQueryState({ column: id, kind: desc ? 'desc' : 'asc' });
  }

  function getTableSortState(): SortingState {
    return !queryState.column ? [] : [{ desc: queryState.kind === 'desc', id: queryState.column }];
  }

  // HANDLE GLOBAL SEARCH
  const [globalSearch, setGlobalSearch] = useState(() => getInitialQueryState().query || '');

  const debounceSearch = useCallback(
    debounce((search: string) => {
      updateQueryState({ query: search });
      onGlobalSearchChange?.(search);
    }, SEARCH_DEBOUNCE_TIME),
    []
  );

  function handleUpdateGlobalSearch(e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const search = (e.target as HTMLInputElement).value;
    setGlobalSearch(search);
    debounceSearch(search);
  }

  return {
    getTableSortState,
    globalSearch,
    handleUpdateGlobalSearch,
    queryState,
    queryString,
    updateFiltersState,
    updateQueryState,
    updateSortStateByTable,
  };
}

export { useQueryRequest };

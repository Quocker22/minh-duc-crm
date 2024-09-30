import {
  ColumnResizeMode,
  RowSelectionState,
  SortingState,
  Table as ReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';

function useTable<TData>(
  initSorting?: () => SortingState | SortingState,
  columnResizeMode: ColumnResizeMode = 'onChange'
) {
  const [sorting, setSorting] = useState<SortingState>(initSorting || []);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [table, setTable] = useState<ReactTable<TData>>();

  return {
    columnResizeMode,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onUpdateTable: setTable,
    rowSelection,
    sorting,
    table,
  };
}

export { useTable };

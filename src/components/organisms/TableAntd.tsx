import { Pagination, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { ExpandableConfig, TableRowSelection } from 'antd/lib/table/interface';
import clsx from 'clsx';
import type { TableProps as RcTableProps } from 'rc-table/lib/Table';

interface IProps<TData extends object> {
  readonly columns: ColumnsType<TData>;
  readonly data: TData[];
  readonly PaginationClassName?: string;
  readonly PaginationOnchange?: (page: number, pageSize: number) => void;
  readonly TableClassName?: string;
  readonly className?: string;
  readonly currentPage?: number;
  readonly expandable?: ExpandableConfig<TData> | undefined;
  readonly isHidePagination?: boolean;
  readonly isLoading?: boolean;
  readonly limit?: number;
  readonly rowSelection?: TableRowSelection<TData>;
  readonly scroll?: RcTableProps<TData>['scroll'] & {
    scrollToFirstRowOnChange?: boolean;
  };
  readonly showSizeChanger?: boolean;
  readonly sticky?:
    | boolean
    | {
        getContainer?: () => Window | HTMLElement;
        offsetHeader?: number;
        offsetScroll?: number;
        offsetSummary?: number;
      }
    | undefined;
  readonly total?: number;
}

const TableAntd = <TData extends object>(props: IProps<TData>) => {
  return (
    <div className={clsx(props.className)}>
      <Table
        className={clsx('mb-5', props.TableClassName)}
        columns={props.columns}
        dataSource={props.data}
        expandable={props.expandable}
        loading={props.isLoading}
        pagination={false}
        rowSelection={props.rowSelection}
        scroll={props.scroll}
        sticky={props.sticky}
      />
      {!props.isHidePagination && (
        <Pagination
          className={clsx(props.PaginationClassName)}
          current={props.currentPage || 1}
          onChange={props.PaginationOnchange}
          pageSize={props.limit || 10}
          showSizeChanger={props.showSizeChanger}
          total={props.total}
        />
      )}
    </div>
  );
};

export { TableAntd };

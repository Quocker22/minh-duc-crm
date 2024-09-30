import clsx from 'clsx';
import { isNumber } from 'lodash-es';
import { FC, useEffect } from 'react';
import ReactPaginate from 'react-paginate';

interface IProps {
  readonly className?: string;
  readonly currentPage?: number;
  readonly limit?: number;
  readonly onChange?: (page: number) => void;
  readonly pageRangeDisplayed?: number;
  readonly total?: number;
}

const defaultProps: IProps = {
  pageRangeDisplayed: 3,
};

const Pagination: FC<IProps> = (props) => {
  const totalPages = Math.ceil((props.total || 0) / (props.limit || 0));

  useEffect(() => {
    if (isNumber(props.currentPage) && (props.currentPage <= 0 || totalPages < props.currentPage)) {
      props.onChange?.(1);
    }
  }, [props.total, props.limit, props.currentPage]);

  if (!totalPages || !props.currentPage) return null;

  return (
    <ReactPaginate
      activeClassName="active"
      breakClassName="page-item select-none"
      breakLinkClassName="page-link"
      className={clsx('pagination', props.className)}
      forcePage={props.currentPage - 1}
      nextClassName="page-item select-none"
      nextLabel={
        <>
          <span aria-hidden="true">›</span>
          <span className="visually-hidden">Next</span>
        </>
      }
      nextLinkClassName="page-link"
      onPageChange={({ selected }) => props.onChange?.(selected + 1)}
      pageClassName="page-item select-none"
      pageCount={totalPages}
      pageLinkClassName="page-link"
      pageRangeDisplayed={props.pageRangeDisplayed}
      previousClassName="page-item select-none"
      previousLabel={
        <>
          <span aria-hidden="true">‹</span>
          <span className="visually-hidden">Previous</span>
        </>
      }
      previousLinkClassName="page-link"
    />
  );
};

Pagination.defaultProps = defaultProps;

export { Pagination };

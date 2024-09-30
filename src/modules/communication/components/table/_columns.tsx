/* eslint-disable simple-import-sort/imports */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable sort-keys-fix/sort-keys-fix */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable  @typescript-eslint/no-explicit-any */
import { ColumnDef, ColumnResizeMode, createColumnHelper } from '@tanstack/react-table';
import { Avatar, Badge, Button } from 'antd';

import defaultAvatar from '@/assets/images/defaultAvatar.png';
import { TableHeaderCell } from '@/components/molecules/TableHeaderCell';
import { DateTimeFormat } from '@/constants';
import { SURVEY_STATUS_OPTION, SurveyModel } from '@/modules/communication/models';
import { getTimeFormat, history } from '@/utils';
import { DeleteOutlined } from '@ant-design/icons';

export const statusSurvey = (status: any) => {
  return SURVEY_STATUS_OPTION.find((item) => item.value === status);
};

function getColumnDef(
  columnResizeMode: ColumnResizeMode = 'onChange',
  handleOpenModalDelete: (surveyId: string) => void
): ColumnDef<SurveyModel, any>[] {
  const columnHelper = createColumnHelper<SurveyModel>();

  return [
    columnHelper.accessor('name', {
      cell: ({ row }) => {
        return (
          <span
            style={{ color: '#1E70DD' }}
            onClick={() => {
              history.push(`${row.original.id}`);
            }}
          >
            {row.original.name}
          </span>
        );
      },
      enableSorting: false,
      header: ({ header }) => (
        <TableHeaderCell className="w-290px" header={header} title={'Tên đợt khảo sát'} />
      ),
    }),
    columnHelper.accessor('created_at', {
      cell: ({ row }) => {
        return `${getTimeFormat(
          row.original.start_date,
          DateTimeFormat.fe_date_2
        )} - ${getTimeFormat(row.original.end_date, DateTimeFormat.fe_date_2)}`;
      },
      enableResizing: false,
      header: ({ header }) => (
        <TableHeaderCell
          className="w-200px"
          columnResizeMode={columnResizeMode}
          header={header}
          title={'Bắt đầu - kết thúc'}
        />
      ),
    }),
    columnHelper.accessor('result', {
      cell: ({ row }) => (
        <div className="text-center">
          {row.original.total_workers_submitted}/{row.original.total_workers}
        </div>
      ),
      enableResizing: false,
      header: ({ header }) => (
        <TableHeaderCell
          className="w-200px text-center"
          columnResizeMode={columnResizeMode}
          header={header}
          title={'Kết quả/Người nhận'}
        />
      ),
    }),
    columnHelper.accessor('status', {
      cell: ({ row }) => {
        return row.original.status ? (
          <Badge
            className="site-badge-count-109"
            count={statusSurvey(row.original?.status)?.label}
            style={{
              backgroundColor: statusSurvey(row.original?.status)?.bgColor,
              color: statusSurvey(row.original?.status)?.textColor,
            }}
          />
        ) : null;
      },
      enableResizing: false,
      header: ({ header }) => (
        <TableHeaderCell
          className="w-200px"
          columnResizeMode={columnResizeMode}
          header={header}
          title={'Trạng thái'}
        />
      ),
    }),

    columnHelper.accessor('created_by_user', {
      cell: ({ row }) => {
        const avatar = row.original.created_by_user?.avatar || defaultAvatar;

        return row.original.created_by_user ? (
          <div className="d-flex items-center gap-3">
            <Avatar src={avatar} style={{ flexShrink: 0 }} />
            <div style={{ flexGrow: 1, width: '120px' }}>{row.original.created_by_user.name}</div>
          </div>
        ) : null;
      },
      enableSorting: false,
      header: ({ header }) => (
        <TableHeaderCell className="w-290px" header={header} title={'Người tạo'} />
      ),
    }),

    columnHelper.accessor('deleted_at', {
      cell: ({ row }) => {
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '.5rem',
            }}
          >
            <Button
              onClick={() => handleOpenModalDelete(row.original.id)}
              shape="circle"
              icon={<DeleteOutlined rev={undefined} />}
              danger
              type="primary"
            />
          </div>
        );
      },
      enableSorting: false,
      header: ({ header }) => (
        <TableHeaderCell className="w-180px text-center" header={header} title={'Thao tác'} />
      ),
    }),
  ];
}

export { getColumnDef };

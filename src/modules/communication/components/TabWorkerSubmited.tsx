/* eslint-disable simple-import-sort/imports */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable sort-keys-fix/sort-keys-fix */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable  @typescript-eslint/no-explicit-any */
import { KTCard, KTCardBody } from '@/_metronic/helpers';
import defaultAvatar from '@/assets/images/defaultAvatar.png';
import { Button } from '@/components/molecules/Button';
import { useQueryRequest } from '@/hooks/useQueryRequest';
import { useGetSubmitWorkers } from '@/modules/communication/hooks/useGetSubmitedWorker';
import { FormSurveyModel, Question, StatsAnswer } from '@/modules/communication/models';
import { DataListFilterModel } from '@/modules/recruitment-plan/models';
import { history } from '@/utils';
import { Avatar, Spin, Table, TableColumnsType, TablePaginationConfig } from 'antd';
import { Fragment } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useParams } from 'react-router-dom';

interface Props {
  formMethods: UseFormReturn<FormSurveyModel, object>;
  totalWorkers: number;
}

function isValidArray<T>(arr: any): arr is T[] {
  return Boolean(arr && Array.isArray(arr) && arr?.length);
}

function DetailStep2({ formMethods, totalWorkers }: Props) {
  const { id } = useParams();
  const statusValue = formMethods.getValues('status');
  const isEnableFetching = Boolean(statusValue === 'END' || statusValue === 'WORKING');

  const { queryState, updateQueryState, queryString } = useQueryRequest<DataListFilterModel>(
    {},
    () => undefined,
    false
  );

  const {
    isLoading,
    isFetching,
    isFetched,
    data: dataStatWorkers,
  } = useGetSubmitWorkers(id as string, queryString, {
    enabled: isEnableFetching,
  });

  const dataSource = isValidArray<StatsAnswer>(dataStatWorkers?.rows)
    ? dataStatWorkers?.rows.map((worker) => ({ ...worker, key: worker.worker_id }))
    : [];

  const columnSurveys: () => TableColumnsType<StatsAnswer> = () => {
    if (!isValidArray<StatsAnswer>(dataStatWorkers?.rows)) return [];

    const questionList = dataStatWorkers?.rows[0].question;

    if (!isValidArray<Question>(questionList)) return [];

    return questionList.map((item, index) => ({
      title: `Câu ${index + 1}: ${item.questions.title}`,
      width: 200,
      dataIndex: `Cau_${index + 1}`,
      render(value, record, index) {
        const question = record.question.find((x) => x.question_id === item.question_id);

        if (!question?.answers)
          return <span style={{ fontStyle: 'italic' }}>Chưa có câu trả lời</span>;

        return <span>{question?.answers?.content}</span>;
      },
    }));
  };

  const columns: TableColumnsType<StatsAnswer> = [
    // {
    //   align: 'center',
    //   dataIndex: 'index',
    //   width: 100,
    //   title: 'STT',
    //   fixed: 'left',
    //   render(value, record, index) {
    //     return <span>{queryState.page * queryState.limit - queryState.limit + index + 1}</span>;
    //   },
    // },
    // {
    //   dataIndex: 'code',
    //   title: 'Mã NLĐ',
    //   fixed: 'left',
    //   width: 150,
    // },
    // {
    //   dataIndex: 'full_name',
    //   render(_, record) {
    //     const avatar = defaultAvatar;

    //     return (
    //       <div className="d-flex items-center gap-3">
    //         <Avatar src={avatar} style={{ flexShrink: 0 }} />
    //         <div style={{ flexGrow: 1 }}>{record.full_name}</div>
    //       </div>
    //     );
    //   },
    //   title: 'Tên NLĐ',
    //   fixed: 'left',
    //   width: 250,
    // },
    // {
    //   dataIndex: 'phone',
    //   title: 'Số điện thoại',
    //   fixed: 'left',
    //   width: 150,
    // },
    {
      dataIndex: 'full_name',
      fixed: 'left',
      width: 300,
      title: 'Thông tin NLĐ',
      render(value, record, index) {
        const worker = record.worker;

        const avatar = defaultAvatar;

        const info: string[] = [];

        if (worker?.code) info.push(worker?.code.toString());
        if (worker?.phone) info.push(worker?.phone.toString());

        return (
          <div>
            <div className="d-flex items-center gap-3 mb-4">
              <Avatar src={avatar} style={{ flexShrink: 0 }} />
              <div style={{ flexGrow: 1 }}>{worker?.full_name}</div>
            </div>
            <div>{info.join(' - ')}</div>
          </div>
        );
      },
    },
    ...columnSurveys(),
  ];

  const handleChangePagination = ({ current, pageSize }: TablePaginationConfig) => {
    updateQueryState({
      limit: pageSize as any,
      page: current,
    });
  };

  return (
    <Fragment>
      {isEnableFetching ? (
        <KTCard>
          <Spin spinning={isFetching || isLoading}>
            {isFetched && dataStatWorkers ? (
              <>
                <KTCardBody className="py-4">
                  <div className="my-4">
                    <span style={{ fontWeight: 'bold' }}>
                      Số người trả lời / Tổng người nhận: {dataStatWorkers.total_rows}/
                      {totalWorkers}
                    </span>
                  </div>

                  <Table
                    columns={columns}
                    dataSource={dataSource}
                    loading={isLoading}
                    onChange={handleChangePagination}
                    pagination={{
                      current: queryState.page,
                      pageSize: queryState.limit,
                      total: dataStatWorkers?.total_rows,
                    }}
                    scroll={{ x: 800 }}
                  />
                </KTCardBody>

                <div className="d-flex justify-content-end mt-4">
                  <Button
                    className="me-3 rounded-pill py-1 px-6"
                    onClick={() => history.push(`list`)}
                    variant="outline"
                  >
                    Đóng
                  </Button>
                  <Button className="rounded-pill py-1 px-6" variant="primary">
                    Export EXCEL
                  </Button>
                </div>
              </>
            ) : isFetched && !dataStatWorkers ? (
              <div>Không có dữ liệu</div>
            ) : null}
          </Spin>
        </KTCard>
      ) : null}
    </Fragment>
  );
}

export default DetailStep2;

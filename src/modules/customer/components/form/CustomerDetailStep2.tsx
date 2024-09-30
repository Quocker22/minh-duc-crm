import { FC } from 'react';

import { TableTagCell } from '@/components/molecules/TableTagCell';
import { RecruitmentDataList } from '@/modules/customer/components/recruitment-data-table/RecruitmentDataList';
import { useGetCustomerData } from '@/modules/customer/hooks/useGetCustomerData';
import { getClientDate } from '@/utils';

interface IProps {
  readonly id?: string;
}

const CustomerDetailStep2: FC<IProps> = ({ id }) => {
  const { data: customerData } = useGetCustomerData(id || '');

  return (
    <div>
      <div className="row">
        <div className="col-12">
          <div className="card card-body d-flex">
            <div>
              <b className="pe-4">Khung thời gian</b>{' '}
              <TableTagCell className="p-3 rounded-pill fs-6" color="secondary">
                Từ ngày {getClientDate(customerData?.start)} đến ngày{' '}
                {getClientDate(customerData?.end)}
              </TableTagCell>
            </div>
          </div>
          <div className="card card-body">
            <b className="pe-4 mb-3">Tổng quan</b>
            <div className="card-toolbar d-flex">
              <div className="w-50">
                <TableTagCell className="p-3 rounded-4 fs-6 me-5" color="secondary">
                  <div className="row container">
                    <div className="col-4 text-start">Tổng chỉ tiêu tuyển dụng</div>
                    <div className="col-4 text-end">{customerData?.total_target}</div>
                    <div className="col-4 text-end">Luợt</div>

                    <div className="col-4 mt-4 text-start">Đã vào làm</div>
                    <div className="col-4 mt-4 text-end">{customerData?.working}</div>
                    <div className="col-4 mt-4 text-end">Luợt</div>

                    <div className="col-4 mt-4 text-start">Số chiến dịch tuyển dụng</div>
                    <div className="col-4 mt-4 text-end">{customerData?.got_work}</div>
                    <div className="col-4 mt-4 text-end">Đợt</div>
                  </div>
                </TableTagCell>
              </div>
              <TableTagCell className="p-3 rounded-4 fs-6 w-50" color="secondary">
                <div className="row container">
                  <div className="col-4 text-start">Đã vào làm:</div>
                  <div className="col-4 text-end">{customerData?.got_work}</div>
                  <div className="col-4 text-end">Luợt</div>

                  <div className="col-4 mt-4 text-start">Đang làm</div>
                  <div className="col-4 mt-4 text-end">{customerData?.working}</div>
                  <div className="col-4 mt-4 text-end">Luợt</div>

                  <div className="col-4 mt-4 text-start">Đã nghỉ</div>
                  <div className="col-4 mt-4 text-end">{customerData?.quited}</div>
                  <div className="col-4 mt-4 text-end">Luợt</div>
                </div>
              </TableTagCell>
            </div>
          </div>
          <div className="card card-body">
            <RecruitmentDataList customerId={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export { CustomerDetailStep2 };

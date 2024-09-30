import { Slider, SliderSingleProps } from 'antd';
import moment from 'moment';
import { FC } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { ChartOverViewRecruitmentOrganization } from '@/components/chart/ChartMoneyUser';
import { ProtectedComponent } from '@/components/molecules/ProtectedComponent';
import { TableTagCell } from '@/components/molecules/TableTagCell';
import { useOverviewResultDetail } from '@/modules/recruitment-organization/hooks/useOverviewResultDetail';
import { FormRecruitmentPlanModel, RecruitmentPlanModel } from '@/modules/recruitment-plan/models';
import { getClientDate } from '@/utils';

interface IProps {
  readonly permission: boolean;
  formMethods?: UseFormReturn<FormRecruitmentPlanModel, object>;
  readonly isSubmit?: boolean;
  readonly organization?: boolean;
  readonly recruitmentDetail?: RecruitmentPlanModel;
}

const OverviewResult: FC<IProps> = (props: IProps) => {
  const { id } = useParams();
  const marks: SliderSingleProps['marks'] = {
    0: '0',
    100: '100',
  };

  const { data } = useOverviewResultDetail(id || '');

  return (
    <ProtectedComponent hasAccess={props.permission}>
      <div className="row">
        <div className="col-12">
          <div className="card card-body">
            <h4>Thời gian triển khai chiến dịch</h4>
            <p className="ps-5">
              Từ {getClientDate(data?.start_date)} đến {getClientDate(data?.end_date)} | Tổng số
              ngày: {moment(data?.end_date).diff(moment(data?.start_date), 'days')}
              <span className="text-danger ps-10">
                {Number(data?.remain) <= 0 ? 'Đã kết thúc' : `Còn lại: ${data?.remain} ngày`}
              </span>
            </p>
          </div>
          <div className="card card-body">
            <h4>Tỉ lệ NLĐ đã đến làm</h4>
            <p>
              <span className="ps-5">
                Nam: {data?.result_by_gender.male} / {data?.result_by_gender.target_male}
              </span>
              <span className="ps-5">
                Nữ: {data?.result_by_gender.female} / {data?.result_by_gender.target_female}
              </span>
            </p>
            <Slider marks={marks} value={data?.target_percentage} />
          </div>

          <div className="card card-body">
            <ChartOverViewRecruitmentOrganization
              data={data?.result_by_team}
              dataMember={data?.result_by_member}
              organization={props.organization}
              totalData={(data?.result_by_gender.female || 0) + (data?.result_by_gender.male || 0)}
            />
          </div>

          <div className="card card-body">
            <h4>Phân loại % các data theo trạng thái</h4>
            <div className="row">
              <div className="col-5">
                {data?.result_by_worker_type?.map((i) => (
                  <div key={i.worker_type} className="row mb-2">
                    <div className="col-sm-4">
                      <span className="mb-0">{i.worker_type}</span>
                    </div>
                    <div className="col-sm-8">
                      <span className="mb-0">
                        <TableTagCell className="px-15 rounded-pill fs-6" color="secondary">
                          {i.percentage}%
                        </TableTagCell>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedComponent>
  );
};

export { OverviewResult };

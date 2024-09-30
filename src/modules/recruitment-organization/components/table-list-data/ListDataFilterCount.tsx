import { FC } from 'react';

import { useGetRecruitmentWorkerList } from '@/hooks/useGetRecruitmentWorkerList';

interface IProps {
  readonly id?: string;
  readonly status?: string;
}

const ListDataFilterCount: FC<IProps> = (props) => {
  const { data: workerList } = useGetRecruitmentWorkerList(
    `recruitment_plan_id=${props.id}&status=${props.status}`
  );

  return <>({workerList?.rows.length})</>;
};

export { ListDataFilterCount };

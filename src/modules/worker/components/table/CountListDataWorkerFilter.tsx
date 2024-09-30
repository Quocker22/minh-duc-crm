import { FC } from 'react';

import { useGetWorkerList } from '@/modules/worker/hooks/useGetWorkerList';

interface IProps {
  readonly status?: string;
}

const CountListDataWorkerFilter: FC<IProps> = (props) => {
  const { data: workerList } = useGetWorkerList(
    props.status === undefined ? '' : `operational_status_id=${props.status}`
  );

  return <>({workerList?.total_rows})</>;
};

export { CountListDataWorkerFilter };

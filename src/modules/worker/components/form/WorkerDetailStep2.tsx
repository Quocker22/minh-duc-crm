import { FC } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { FormWorkerModel } from '@/modules/worker/models';

interface IProps {
  formMethods: UseFormReturn<FormWorkerModel, object>;
}

const WorkerDetailStep2: FC<IProps> = () => {
  return <div>Chưa làm</div>;
};

export { WorkerDetailStep2 };

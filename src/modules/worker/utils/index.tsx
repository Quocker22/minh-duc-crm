import { Color } from '@/models';
import { CampaignOptions } from '@/modules/recruitment-plan/models';
import { WorkerStatus } from '@/modules/worker/models';

export const getRecruitmentStatus = (status?: CampaignOptions) => {
  switch (status) {
    case CampaignOptions.pending:
      return {
        color: Color.warning,
        status: 'Chờ bắt đầu',
      };
    case CampaignOptions.active:
      return {
        color: Color.primary,
        status: 'Đang triển khai',
      };
    case CampaignOptions.done:
      return {
        color: Color.secondary,
        status: 'Đã kết thúc',
      };
  }
};

export const getWorkerStatus = (status?: WorkerStatus) => {
  switch (status) {
    case WorkerStatus.blacklist:
      return {
        color: Color.danger,
        status: 'Danh sách đen',
      };
    case WorkerStatus.active:
      return {
        color: Color.success,
        status: 'Đang hoạt đông',
      };
    case WorkerStatus.inactive:
      return {
        color: Color.secondary,
        status: 'Dừng hoạt đông',
      };
  }
};

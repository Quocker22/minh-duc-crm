import { Color } from '@/models';
import { CampaignOptions } from '@/modules/recruitment-plan/models';

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

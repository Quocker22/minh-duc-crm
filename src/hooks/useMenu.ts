import { useAppDispatch, useAppSelector } from '@/hooks';
import { useAuth } from '@/hooks/useAuth';
import { MenuModel } from '@/models';
import { MenuRole } from '@/models/role';
import { HRRole } from '@/modules/hr-management/models';
import { menuActions, selectMenuList } from '@/modules/menu/core/menuSlice';
import { getRoleEmployee } from '@/roles';
import { trans } from '@/utils';

function useMenu() {
  const dispatch = useAppDispatch();
  const menuList = useAppSelector(selectMenuList);
  const { currentUser } = useAuth();

  const vhnldQL = getRoleEmployee(MenuRole.vhnld_ql);
  const qlttHT = getRoleEmployee(MenuRole.qltt_ht);
  const qlttKSL = getRoleEmployee(MenuRole.qltt_ksl);
  const qlttKSTD = getRoleEmployee(MenuRole.qltt_kstd);
  const QLNhaMay = currentUser?.account_type === HRRole.factory;

  const defaultMenuList: MenuModel[] = [
    {
      aside: { fontIcon: 'bi-app-indicator', icon: '/media/icons/duotune/art/art002.svg' },
      icon: '/media/icons/duotune/general/ic_dashboad.svg',
      title: trans('MENU.DASHBOARD'),
      to: '/dashboard',
    },
    {
      aside: { isContent: true },
      children: [
        {
          aside: { fontIcon: 'bi-app-indicator', icon: '/media/icons/duotune/art/art002.svg' },
          icon: '/media/icons/duotune/menu/recruitment_plan.svg',
          title: 'Kế hoạch tuyển dụng',
          to: '/recruitment-plan/list',
        },
        {
          aside: { fontIcon: 'bi-app-indicator', icon: '/media/icons/duotune/art/art002.svg' },
          icon: '/media/icons/duotune/menu/recruitment_organization.svg',
          title: 'Tổ chức tuyển dụng',
          to: '/recruitment-organization/list',
        },
        ...(vhnldQL
          ? [
              {
                aside: {
                  fontIcon: 'bi-app-indicator',
                  icon: '/media/icons/duotune/art/art002.svg',
                },
                icon: '/media/icons/duotune/menu/labor_operation.svg',
                title: 'Vận hành lao động',
                to: '/operate-worker/list',
              },
            ]
          : []),
        {
          aside: { fontIcon: 'bi-app-indicator', icon: '/media/icons/duotune/art/art002.svg' },
          children: [
            ...(qlttKSTD
              ? [
                  {
                    hasBullet: true,
                    title: 'Tổ chức khảo sát tự do NLĐ',
                    to: '/communication/free-survey/list',
                  },
                ]
              : []),
            ...(qlttKSL
              ? [
                  {
                    hasBullet: true,
                    title: 'Tổ chức khảo sát lương NLĐ',
                    to: '/communication/salary-survey/list',
                  },
                ]
              : []),
            ...(qlttHT
              ? [
                  {
                    hasBullet: true,
                    title: 'Hỗ trợ NLĐ',
                    to: '/communication/worker-support',
                  },
                ]
              : []),
          ],
          icon: '/media/icons/duotune/menu/communication.svg',
          title: 'Quản lý truyền thông',
          to: '/communication',
        },
        {
          aside: { fontIcon: 'bi-app-indicator', icon: '/media/icons/duotune/art/art002.svg' },
          children: [
            {
              hasBullet: true,
              title: 'Danh sách khách hàng',
              to: '/customer/list',
            },
          ],
          icon: '/media/icons/duotune/menu/customer.svg',
          title: 'Quản lý khách hàng',
          to: '/customer',
        },
        {
          aside: { fontIcon: 'bi-app-indicator', icon: '/media/icons/duotune/art/art002.svg' },
          icon: '/media/icons/duotune/menu/workers.svg',
          title: 'Quản lý NLĐ',
          to: '/worker/list',
        },
        {
          aside: { fontIcon: 'bi-app-indicator', icon: '/media/icons/duotune/art/art002.svg' },
          children: [
            {
              hasBullet: true,
              title: trans('MENU.HR_MANAGEMENT.LIST'),
              to: '/hr-management/management/list',
            },
            {
              hasBullet: true,
              title: 'Danh sách quyền',
              to: '/hr-management/role-list',
            },
            {
              hasBullet: true,
              title: trans('MENU.HR_MANAGEMENT.LIST_OF_RECRUITMENT_TEAMS'),
              to: '/hr-management/recruitment-teams',
            },
          ],
          icon: '/media/icons/duotune/menu/human_resources_management.svg',
          menu: {
            hasArrow: true,
            menuPlacement: 'right-start',
            menuTrigger: `{default:'click', lg: 'hover'}`,
          },
          title: trans('MENU.HR_MANAGEMENT'),
          to: '/hr-management',
        },
      ],
      menu: { menuPlacement: 'bottom-start', menuTrigger: 'click' },
      title: 'menu',
      to: '/',
    },
  ];

  const factoryMenuList: MenuModel[] = [
    {
      aside: { fontIcon: 'bi-app-indicator', icon: '/media/icons/duotune/art/art002.svg' },
      icon: '/media/icons/duotune/menu/recruitment_plan.svg',
      title: 'Kế hoạch tuyển dụng',
      to: '/recruitment-plan/list',
    },
    {
      aside: {
        fontIcon: 'bi-app-indicator',
        icon: '/media/icons/duotune/art/art002.svg',
      },
      icon: '/media/icons/duotune/menu/labor_operation.svg',
      title: 'Vận hành lao động',
      to: '/operate-worker/list',
    },
  ];

  function setMenuList(menuList: MenuModel[]) {
    dispatch(menuActions.setMenuList(menuList));
  }

  function setDefaultMenuList() {
    if (QLNhaMay) {
      setMenuList(factoryMenuList);
    } else {
      setMenuList(defaultMenuList);
    }
  }

  return { menuList, setDefaultMenuList, setMenuList };
}

export { useMenu };

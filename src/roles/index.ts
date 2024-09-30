import { useAuth } from '@/hooks/useAuth';
import { HRRole } from '@/modules/hr-management/models';

export function getRoleEmployee(role: string): boolean {
  const { currentUser } = useAuth();

  if (currentUser?.account_type === HRRole.member)
    return !!currentUser?.permission_codes?.find((i) => i === role);

  return true;
}

// ProtectedRoute.tsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';
import { HRRole } from '@/modules/hr-management/models';

interface ProtectedRouteProps {
  children: JSX.Element;
  roles: HRRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, roles }) => {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (!currentUser || !roles.includes(currentUser.account_type)) {
    // Chuyển hướng đến trang AccessDenied nếu người dùng không có quyền truy cập
    return <Navigate state={{ from: location }} to="/access-denied" replace />;
  }

  return children;
};

export default ProtectedRoute;

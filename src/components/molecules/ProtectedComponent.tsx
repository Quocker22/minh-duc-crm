// ProtectedComponent.tsx
import React from 'react';

import { AccessDenied } from '@/_metronic/layout/components/AccessDenied';

interface ProtectedComponentProps {
  children: React.ReactNode;
  hasAccess: boolean;
}

const ProtectedComponent: React.FC<ProtectedComponentProps> = ({ hasAccess, children }) => {
  if (!hasAccess) {
    return <AccessDenied />;
  }

  return <>{children}</>;
};

export { ProtectedComponent };

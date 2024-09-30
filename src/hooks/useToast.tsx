import { useRef } from 'react';
import { toast } from 'react-toastify';

import { IPropsToastTemplate, ToastTemplate } from '@/components/molecules/Toast';

function useToast() {
  const toastId = useRef<string | number>();

  function toastSuccess(props: IPropsToastTemplate, canDuplicate = false) {
    if (!canDuplicate && isDuplicate()) toast.dismiss(toastId.current);
    toastId.current = toast.success(<ToastTemplate {...props} />);
  }

  function toastError(props: IPropsToastTemplate, canDuplicate = false) {
    if (!canDuplicate && isDuplicate()) toast.dismiss(toastId.current);
    toastId.current = toast.error(<ToastTemplate {...props} />);
  }

  function isDuplicate() {
    return toastId.current && toast.isActive(toastId.current);
  }

  return { toastError, toastSuccess };
}

export { useToast };

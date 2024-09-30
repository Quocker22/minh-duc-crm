import { FC, forwardRef, ReactNode } from 'react';
import { Button as BootstrapButton, ButtonProps } from 'react-bootstrap';

import { WithChildren } from '@/_metronic/helpers';
import { trans } from '@/utils';

interface IProps extends WithChildren {
  isLoading?: boolean;
  loadingLabel?: ReactNode;
}

const Button: FC<ButtonProps & IProps> = forwardRef<
  HTMLButtonElement,
  ButtonProps & IProps & WithChildren
>(({ isLoading, ...props }, ref) => {
  return (
    <BootstrapButton
      ref={ref}
      {...props}
      data-testid="button-element"
      disabled={props.disabled || isLoading}
    >
      {!isLoading && <span className="indicator-label">{props.children}</span>}
      {isLoading && (
        <span className="indicator-progress" style={{ display: 'block' }}>
          {props.loadingLabel || trans('BUTTON.LOADING')}
          <span className="spinner-border spinner-border-sm align-middle ms-2" />
        </span>
      )}
    </BootstrapButton>
  );
});

export { Button };

import { FC, ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';

import { DateTimeFormat } from '@/constants';
import { getCurrentTimeFormat, trans } from '@/utils';

interface IProps {
  readonly autoClose?: number;
  readonly limit?: number;
  readonly theme?: 'light' | 'dark' | 'colored';
}

const defaultProps: IProps = {
  autoClose: 5000, // ms
  limit: 5,
  theme: 'colored',
};

const Toast: FC<IProps> = (props) => {
  return <ToastContainer autoClose={props.autoClose} limit={props.limit} theme={props.theme} />;
};

Toast.defaultProps = defaultProps;

export interface IPropsToastTemplate {
  i18nSubTitle?: string;
  i18nTitle?: string;
  icon?: ReactNode;
  subtitle?: string;
  title?: string;
}

const ToastTemplate: FC<IPropsToastTemplate> = (props) => {
  const title = props.title || (props.i18nTitle ? trans(props.i18nTitle) : '');
  const subtitle = props.subtitle || (props.i18nSubTitle ? trans(props.i18nSubTitle) : '');

  return (
    <div
      aria-atomic="true"
      aria-live="assertive"
      className="toast show w-auto bg-transparent shadow-none me-1"
      role="alert"
    >
      <div className="cs-toast-header px-0 pt-0 pb-1">
        {props.icon && (
          <span className="svg-icon svg-icon-2 svg-icon-primary me-3">{props.icon}</span>
        )}
        <strong className="me-auto">{title}</strong>
        <small>{getCurrentTimeFormat(DateTimeFormat.fe_full_date_time)}</small>
      </div>
      <div className="toast-body px-0 pb-0 pt-1">{subtitle}</div>
    </div>
  );
};

export { Toast, ToastTemplate };

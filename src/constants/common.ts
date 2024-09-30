import { toAbsoluteUrl } from '@/_metronic/helpers';

export const IS_PRODUCTION_MODE = import.meta.env.MODE === 'production';

export const IS_TESTING_MODE = import.meta.env.MODE === 'testing';

export const TOKEN = 'minh-đuc-crm-token';

export const REFRESH_TOKEN = 'minh-đuc-crm-refresh-token';

export const SEARCH_DEBOUNCE_TIME = 300; // ms

export const BLANK_IMG = toAbsoluteUrl('/media/svg/general/camera.svg');

export const APP_COLOR = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark'];

export const PHONE_RULE_REGEX = /^(84|0[3|5|7|8|9])+([0-9]{8})\b$/;

export const PHONE_RULE_REGEX_NULLABLE = /^$|^(84|0[3|5|7|8|9])+([0-9]{8})\b$/;

export const PASSWORD_REGEX_NULLABLE =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

import React from 'react';
import SVG from 'react-inlinesvg';

import { toAbsoluteUrl } from '@/_metronic/helpers/AssetHelpers';

type Props = {
  path: string;
  className?: string;
  svgClassName?: string;
};

const KTSVG: React.FC<Props> = ({ className = '', path, svgClassName = 'mh-50px' }) => {
  return (
    <span className={`svg-icon ${className}`}>
      <SVG className={svgClassName} src={toAbsoluteUrl(path)} />
    </span>
  );
};

export { KTSVG };

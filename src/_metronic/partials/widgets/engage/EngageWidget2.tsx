import clsx from 'clsx';
import React from 'react';

type Props = {
  className: string;
  color?: string;
  imagePath?: string;
  innerPadding?: string;
};

const EngageWidget2: React.FC<Props> = ({
  className,
  imagePath = '',
  innerPadding: _ = '',
  color = 'primary',
}) => {
  return (
    <div className={`card overflow-hidden ${className}`}>
      <div className={`card-body p-0 d-flex card-rounded bg-light-${color}`}>
        <div className="py-18 px-12">
          <h3 className="fs-2x">
            <a className="text-dark text-hover-primary fw-bold" href="#">
              Nike Sneakers
            </a>
          </h3>
          <div className={clsx('fs-3', `text-${color}`)}>Get Amazing Nike Sneakers</div>
        </div>
        {imagePath && (
          <div
            className="d-none d-md-flex flex-row-fluid bgi-no-repeat bgi-position-y-center bgi-position-x-right bgi-size-cover"
            style={{
              backgroundImage: `url('${imagePath}')`,
              transform: 'translateX(10%) rotate(-26deg)',
            }}
          />
        )}
      </div>
    </div>
  );
};

export { EngageWidget2 };

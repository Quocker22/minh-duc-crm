import clsx from 'clsx';

import { toAbsoluteUrl } from '@/_metronic/helpers';

type Props = {
  bgImage?: string;
  className?: string;
  title?: string;
};
const TilesWidget1 = ({
  className,
  bgImage = toAbsoluteUrl('/media/stock/600x400/img-75.jpg'),
  title = 'Properties',
}: Props) => {
  return (
    <div
      className={clsx('card h-150px bgi-no-repeat bgi-size-cover', className)}
      style={{
        backgroundImage: `url("${bgImage}")`,
      }}
    >
      <div className="card-body p-6">
        <a
          className="text-black text-hover-primary fw-bold fs-2"
          data-bs-target="#kt_modal_create_app"
          data-bs-toggle="modal"
          href="#"
        >
          {title}
        </a>
      </div>
    </div>
  );
};

export { TilesWidget1 };

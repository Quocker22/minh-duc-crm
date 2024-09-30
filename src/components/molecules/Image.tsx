import { CSSProperties, FC } from 'react';
import { Image as BootstrapImage } from 'react-bootstrap';
import LazyLoad from 'react-lazyload';

import { toAbsoluteUrl } from '@/_metronic/helpers';
import { DEFAULT_FALLBACK_IMAGE } from '@/constants';

interface IProps {
  readonly alt?: string;
  readonly className?: string;
  readonly debounce?: number;
  readonly fallbackUrl?: string;
  readonly height?: number;
  readonly isImageFluid?: boolean;
  readonly isImageRounded?: boolean;
  readonly isImageRoundedCircle?: boolean;
  readonly isImageThumbnailStyle?: boolean;
  readonly placeholderUrl?: string;
  readonly src?: string;
  readonly style?: CSSProperties;
  readonly width?: number;
}

const defaultProps: IProps = {
  debounce: 300,
  fallbackUrl: DEFAULT_FALLBACK_IMAGE,
  placeholderUrl: toAbsoluteUrl('/media/avatars/300-1.jpg'),
};

const Image: FC<IProps> = (props) => {
  return (
    <LazyLoad
      debounce={props.debounce}
      height={props.height}
      placeholder={
        <BootstrapImage
          alt={props.alt || props.placeholderUrl}
          className={props.className}
          data-testid="image-element"
          fluid={props.isImageFluid}
          height={props.height}
          rounded={props.isImageRounded}
          roundedCircle={props.isImageRoundedCircle}
          src={props.placeholderUrl}
          style={{ ...props.style }}
          thumbnail={props.isImageThumbnailStyle}
          width={props.width}
        />
      }
      once
    >
      <BootstrapImage
        alt={props.alt || props.src}
        className={props.className}
        fluid={props.isImageFluid}
        height={props.height}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src = props.fallbackUrl as string;
        }}
        rounded={props.isImageRounded}
        roundedCircle={props.isImageRoundedCircle}
        src={props.src}
        style={{ ...props.style }}
        thumbnail={props.isImageThumbnailStyle}
        width={props.width}
      />
    </LazyLoad>
  );
};

Image.defaultProps = defaultProps;

export { Image };

/* eslint-disable @next/next/no-img-element */
import { forwardRef } from 'react';

interface MediaProps {
  image: string;
  video?: string;
  alt?: string;
  className?: string;
  [key: `data-${string}`]: string | undefined;
}

// 영상 경로가 있으면 자동재생 영상, 없으면 이미지. 원본의 영상 자리를 사진으로도 채울 수 있게.
const Media = forwardRef<HTMLImageElement | HTMLVideoElement, MediaProps>(
  ({ image, video, alt = '', className, ...rest }, ref) =>
    video ? (
      <video
        {...rest}
        ref={ref as React.Ref<HTMLVideoElement>}
        src={video}
        poster={image}
        className={className}
        autoPlay
        loop
        muted
        playsInline
        preload='auto'
      />
    ) : (
      <img {...rest} ref={ref as React.Ref<HTMLImageElement>} src={image} alt={alt} className={className} draggable={false} />
    ),
);

Media.displayName = 'Media';

export default Media;

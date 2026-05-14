import type { CSSProperties, ReactNode } from 'react';

type ImagePlaceholderProps = {
  label?: string;
  height?: number;
  style?: CSSProperties;
  illu?: boolean;
  children?: ReactNode;
};

export function ImagePlaceholder({
  label,
  height = 480,
  style,
  illu = false,
  children,
}: ImagePlaceholderProps) {
  return (
    <div className={'img-placeholder' + (illu ? ' illu' : '')} style={{ height, ...style }}>
      {children}
      {label && <span className="img-label">{label}</span>}
    </div>
  );
}

import React from 'react';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  size?: 'default' | 'narrow' | 'wide' | 'full';
}

export const Container: React.FC<ContainerProps> = ({
  as: Component = 'div',
  size = 'default',
  className = '',
  children,
  ...props
}) => {
  const sizeClasses = {
    narrow: 'max-w-4xl',
    default: 'max-w-7xl',
    wide: 'max-w-[1400px]',
    full: 'max-w-full',
  }[size];

  return (
    <Component
      className={`mx-auto w-full px-5 sm:px-8 lg:px-12 ${sizeClasses} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

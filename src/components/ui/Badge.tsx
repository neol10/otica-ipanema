import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'azure' | 'navy' | 'mist' | 'pending';
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'azure',
  className = '',
  children,
  ...props
}) => {
  const variantClasses = {
    azure: 'bg-azure/15 text-azure-dark border border-azure/30',
    navy: 'bg-navy-deep text-pure border border-azure/25',
    mist: 'bg-mist-dark/60 text-obsidian border border-mist-dark',
    pending: 'bg-amber-100 text-amber-900 border border-amber-300 text-[11px] font-mono',
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-caption uppercase tracking-wider font-medium ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

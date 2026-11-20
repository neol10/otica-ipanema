import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  children,
  disabled,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-medium transition-all duration-300 ease-luxury focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azure focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

  const variantClasses = {
    primary:
      'bg-navy-deep text-pure hover:bg-navy-soft border border-azure/40 shadow-subtle-azure hover:border-azure',
    secondary:
      'bg-azure text-pure hover:bg-azure-dark border border-azure shadow-sm font-semibold',
    outline:
      'border border-azure text-obsidian hover:bg-azure/10 hover:border-azure-dark',
    ghost:
      'text-obsidian hover:bg-mist-dark/50 hover:text-navy-deep',
  }[variant];

  const sizeClasses = {
    sm: 'text-caption tracking-wider uppercase px-4 py-2 rounded-sm',
    md: 'text-body-sm tracking-wide px-6 py-3 rounded-sm',
    lg: 'text-body-md tracking-wide px-8 py-4 rounded-sm',
  }[size];

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${widthClass} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

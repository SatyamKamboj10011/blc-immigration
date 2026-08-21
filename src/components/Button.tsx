import { Link } from 'react-router-dom';
import { ReactNode } from 'react';
import Icon from './Icon';

interface ButtonProps {
  to?: string;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary' | 'ghost' | 'accent';
  size?: 'md' | 'lg';
  children: ReactNode;
  className?: string;
  showArrow?: boolean;
}

const variants = {
  primary: 'bg-brand-800 text-paper hover:bg-brand-900',
  secondary: 'bg-transparent text-brand-800 border border-brand-800/70 hover:bg-brand-800 hover:text-paper',
  ghost: 'bg-transparent text-white border border-white/40 hover:bg-white/10',
  accent: 'bg-gold-500 text-brand-950 hover:bg-gold-400',
};

const sizes = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
};

export default function Button({
  to,
  href,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  showArrow = false,
}: ButtonProps) {
  const classes = `focus-ring inline-flex items-center justify-center gap-2 rounded-sm font-semibold tracking-tight transition-colors duration-200 active:scale-[0.98] ${variants[variant]} ${sizes[size]} ${className}`;

  const content = (
    <>
      {children}
      {showArrow && <Icon name="arrow" className="h-4 w-4" />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes}>
        {content}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} className={classes}>
      {content}
    </button>
  );
}

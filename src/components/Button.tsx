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
  primary: 'bg-brand-900 text-white hover:bg-brand-800',
  secondary: 'bg-transparent text-brand-900 border-2 border-brand-900 hover:bg-brand-900 hover:text-white',
  ghost: 'bg-transparent text-white border-2 border-white/50 hover:bg-white/10',
  accent: 'bg-gold-500 text-brand-950 shadow-[0_10px_24px_rgba(0,35,19,0.25)] hover:bg-gold-600',
};

const sizes = {
  md: 'px-6 py-2.5 text-sm',
  lg: 'px-8 py-3.5 text-base',
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
  const classes = `focus-ring inline-flex items-center justify-center gap-2 rounded-full font-bold uppercase tracking-wide transition-all duration-200 active:scale-[0.98] ${variants[variant]} ${sizes[size]} ${className}`;

  const content = (
    <>
      {children}
      {showArrow && (
        <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full ${variant === 'accent' ? 'bg-brand-950/15' : 'bg-white/20'}`}>
          <Icon name="arrow" className="h-3.5 w-3.5" />
        </span>
      )}
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

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
  primary: 'bg-brand-950 text-white hover:bg-brand-800',
  secondary: 'bg-transparent text-brand-950 border border-brand-950/25 hover:border-brand-950 hover:bg-brand-950 hover:text-white',
  ghost: 'bg-transparent text-white border border-white/30 hover:border-white hover:bg-white/10',
  accent: 'bg-gold-500 text-brand-950 hover:bg-gold-400 hover:shadow-[0_12px_30px_rgba(254,242,0,0.25)]',
};

const sizes = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3.5 text-[0.95rem]',
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
  const classes = `btn-shine focus-ring relative isolate overflow-hidden inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-[-0.01em] transition-all duration-200 group/btn active:scale-[0.97] hover:-translate-y-0.5 ${variants[variant]} ${sizes[size]} ${className}`;

  const content = (
    <>
      {children}
      {showArrow && (
        <span className="inline-flex h-5 w-5 items-center justify-center">
          <Icon name="arrow" className="h-4 w-4 -rotate-45 transition-transform duration-300 group-hover/btn:rotate-0" />
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

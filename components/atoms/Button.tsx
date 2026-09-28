"use client";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { ButtonHTMLAttributes } from "react";

// this type : ButtonHTMLAttributes<HTMLButtonElement>
// comes from React and include all props or attributes needed for button + thier types
// disabled?: boolean;
// onClick?: MouseEventHandler<HTMLButtonElement>;
// className?: string;
// type?: "button" | "submit" | "reset";
// title?: string;
// children?: ReactNode;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  loading?: boolean;
}

export default function Button({
  variant = "primary",
  loading = false,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles = `
    inline-flex items-center justify-center gap-2
    rounded-full transition-all duration-200
    px-6 py-2 
    focus:outline-none focus:ring-2 focus:ring-offset-2
  `;

  const variants = {
    primary: `
      bg-[var(--action-primary)]
      text-[var(--surface-page)]
      hover:bg-[var(--action-primary-hover)] hover:text-[var(--action-hover-text)]
      focus:ring-[var(--focus-ring)]
      disabled:opacity-40 disabled:cursor-not-allowed
    `,
    secondary: `
      bg-[var(--action-secondary)] text-[var(--surface-page)]
      hover:bg-[var(--action-secondary-hover)] hover:text-[var(--action-hover-text)]
      focus:ring-[var(--focus-ring)]
      disabled:opacity-40 disabled:cursor-not-allowed
    `,
    outline: `
      border border-[var(--action-primary)] text-[var(--action-primary)]
      hover:bg-[var(--action-outline-hover)] hover:text-[var(--action-hover-text)]
      focus:ring-[var(--focus-ring)]
      disabled:opacity-50 disabled:cursor-not-allowed
    `,
    ghost: `
      text-[var(--action-primary)] hover:bg-[var(--action-ghost-hover)]/10
      focus:ring-[var(--focus-ring)]
      disabled:opacity-50 disabled:cursor-not-allowed
    `,
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <Loader2 className="animate-spin w-4 h-4" /> : children}
    </button>
  );
}

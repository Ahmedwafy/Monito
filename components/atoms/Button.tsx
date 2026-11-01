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
  variant?: "primary" | "outline";
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
      bg-(--primary-btn-bg)
      text-(--primary-btn-text)
      hover:bg-(--primary-btn-bg-hover) hover:text-(--primary-btn-text-hover)
      focus:ring-(--focus-ring)
      disabled:opacity-40 disabled:cursor-not-allowed
    `,
    outline: `
      border border-(--outline-btn-border) text-(--outline-btn-text)
      hover:bg-(--outline-btn-bg-hover) hover:text-(--outline-btn-text-hover)
      focus:ring-(--focus-ring)
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

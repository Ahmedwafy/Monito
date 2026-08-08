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
      bg-[var(--color-primary-darkBlue)] 
      text-[var(--color-neutral-10)]
      hover:bg-[#004080] 
      focus:ring-[#004080]
      disabled:bg-[#003366]/40 disabled:cursor-not-allowed
    `,
    secondary: `
      bg-[#007BFF] text-white 
      hover:bg-[#339CFF]
      focus:ring-[#007BFF]
      disabled:bg-[#007BFF]/40 disabled:cursor-not-allowed
    `,
    outline: `
      border border-[#003366] text-[#003366]
      hover:bg-[#003366] hover:text-white
      focus:ring-[#003366]
      disabled:opacity-50 disabled:cursor-not-allowed
    `,
    ghost: `
      text-[#003366] hover:bg-[#003366]/10
      focus:ring-[#003366]
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

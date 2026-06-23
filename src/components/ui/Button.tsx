import * as React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-md font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 duration-300 ease-out hover:scale-[1.02] active:scale-95";
    const variants = {
      primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md",
      outline: "border border-primary text-primary hover:bg-primary/5",
      ghost: "hover:bg-primary/10 text-primary",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} px-4 py-2 ${className}`}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

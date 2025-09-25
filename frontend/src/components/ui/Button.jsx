import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-primary to-secondary text-primary-content hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5",
        destructive: "bg-gradient-to-r from-error to-red-600 text-white hover:shadow-lg hover:shadow-error/25 hover:-translate-y-0.5",
        outline: "border-2 border-primary/20 bg-transparent hover:bg-primary/5 hover:border-primary/40 hover:shadow-md",
        secondary: "bg-gradient-to-r from-secondary/80 to-secondary text-secondary-content hover:shadow-lg hover:shadow-secondary/25 hover:-translate-y-0.5",
        ghost: "hover:bg-primary/10 hover:text-primary rounded-lg",
        link: "text-primary underline-offset-4 hover:underline",
        success: "bg-gradient-to-r from-success to-green-600 text-white hover:shadow-lg hover:shadow-success/25 hover:-translate-y-0.5",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-lg px-4",
        lg: "h-12 rounded-xl px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
});

Button.displayName = "Button";

export { Button, buttonVariants };
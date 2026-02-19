
import { cva } from "class-variance-authority";
import { cn } from "@/utils/cn";

const badgeVariants = cva(
  "inline-flex items-center border rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-primary-blue/10 text-primary-blue border-transparent",
        success: "bg-success/10 text-success border-transparent",
        destructive: "bg-destructive/10 text-destructive border-transparent",
        warning: "bg-warning/10 text-warning border-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export function Badge({ className, variant, ...props }) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

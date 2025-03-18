import { cva } from 'class-variance-authority'
import Button from './Button.vue'

export const buttonVariants = cva(
  "inline-flex items-center justify-center cursor-pointer whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-neutral text-neutral-content hover:bg-neutral/90",
        primary: "bg-primary text-primary-content hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-content hover:bg-secondary/90",
        accent: "bg-accent text-accent-content hover:bg-accent/90", 
        error: "bg-error text-error-content hover:bg-error/90",
        outline: "border border-border bg-base-100 text-base-content hover:bg-neutral/50",
        ghost: "text-base-content hover:bg-neutral/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export { Button }
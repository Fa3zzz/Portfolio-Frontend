"use client";

import * as React from "react";
import { cn } from "./Utils";

export function Form({ children, className, ...props }) {
  return (
    <form className={cn("space-y-6", className)} {...props}>
      {children}
    </form>
  );
}

export const FormField = ({ children, ...props }) => (
  <div {...props}>{children}</div>
);

export const FormItem = ({ children, className, ...props }) => (
  <div className={cn("flex flex-col space-y-1", className)} {...props}>
    {children}
  </div>
);

export const FormLabel = ({ children, className, ...props }) => (
  <label className={cn("text-sm font-medium leading-none", className)} {...props}>
    {children}
  </label>
);

export const FormControl = React.forwardRef(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  />
));
FormControl.displayName = "FormControl";

export const FormMessage = ({ children, className, ...props }) => (
  <p className={cn("text-sm text-destructive", className)} {...props}>
    {children}
  </p>
);

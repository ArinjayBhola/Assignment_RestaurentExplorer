import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const typographyVariants = cva("text-foreground", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      p: "leading-7 [&:not(:first-child)]:mt-6",
      blockquote: "mt-6 border-l-2 pl-6 italic",
      list: "my-6 ml-6 list-disc [&>li]:mt-2",
      lead: "text-xl text-muted-foreground",
      large: "text-lg font-semibold",
      small: "text-sm font-medium leading-none",
      muted: "text-sm text-muted-foreground",
    },
  },
  defaultVariants: {
    variant: "p",
  },
});

type TypographyProps<T extends React.ElementType> = {
  as?: T;
  className?: string;
  variant?: VariantProps<typeof typographyVariants>["variant"];
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<T>;

export function Typography<T extends React.ElementType = "p">({
  as,
  className,
  variant,
  children,
  ...props
}: TypographyProps<T>) {
  const Component = as || (variant === "h1" || variant === "h2" || variant === "h3" || variant === "h4" ? variant : "p");
  
  return (
    <Component
      className={cn(typographyVariants({ variant, className }))}
      {...props}
    >
      {children}
    </Component>
  );
}

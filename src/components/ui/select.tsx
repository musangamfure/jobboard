import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { forwardRef } from "react";

export default forwardRef<
  HTMLSelectElement,
  React.HTMLProps<HTMLSelectElement>
>(function Select({ className, ...props }, ref) {
  return (
    <div className="relative">
      <select
        className={cn(
          "h-10 w-full border rounded-md appearance-none truncate bg-background border-input py-2 pl-3 pr-8 txt-sm  ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />

      <ChevronDown className="absolute top-3 right-3 w-4 h-4 text-muted-foreground" />
    </div>
  );
});

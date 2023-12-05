import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export interface InputLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const InputLabel = forwardRef<HTMLLabelElement, InputLabelProps>(({
  className,
  children,
  ...props
}, ref) => {
  return (
    <label
      className={twMerge('text-2xl font-semibold text-red', className)}
      {...props}
      ref={ref}
    >
      {children}
    </label>
  );
});

InputLabel.displayName = "Button";

export default InputLabel;
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(({
    className,
    type,
    disabled,
    ...props
}, ref) => {
    return (
        <input type={type} className={twMerge(`flex w-full border border-primary px-5 py-4 text-sm placeholder:text-grey 
        disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none duration-200`, className)} disabled={disabled} ref={ref} {...props} />
    );
});

Input.displayName = "Input";

export default Input;
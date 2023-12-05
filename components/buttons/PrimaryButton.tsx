import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import ButtonText from "../typography/ButtonText";

export interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const PrimaryButton = forwardRef<HTMLButtonElement, PrimaryButtonProps>(({
  className,
  children,
  disabled,
  type = 'button',
  ...props
}, ref) => {
  return (
    <button
      type={type}
      className={twMerge(disabled && `opacity-75 cursor-not-allowed`, `w-fit h-fit px-3 py-3 text-red hover:text-lavender relative border border-red
       border-opacity-0 hover:border-opacity-100 transition duration-300 ease-in-out rounded-md group flex justify-center items-center z-20`, className)}
      disabled={disabled}
      ref={ref}
      {...props}
    >
        <div className="absolute flex rounded-sm -z-10 h-0 w-full group-hover:h-full bottom-0 bg-red group-hover:border border-red duration-300 ease-in-out" />
        <ButtonText>
            {children}
        </ButtonText>
    </button>
  );
});

PrimaryButton.displayName = "Primary Button";

export default PrimaryButton;
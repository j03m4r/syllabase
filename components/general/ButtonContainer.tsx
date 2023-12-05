import { twMerge } from "tailwind-merge";

interface ButtonContainerProps {
    children: React.ReactNode;
    className?: string;
};

const ButtonContainer: React.FC<ButtonContainerProps> = ({ children, className }) => {
    return (
        <div className={twMerge(`flex flex-row gap-x-1 p-1 rounded-md border border-red h-fit w-fit`, className)}>
            {children}
        </div>
    );
}

export default ButtonContainer;
import { twMerge } from "tailwind-merge";

interface ButtonTextProps {
    className?: string;
    children: React.ReactNode;
};

const ButtonText: React.FC<ButtonTextProps> = ({ className, children }) => {
    return (
        <div className={twMerge(`font-semibold text-lg`, className)}>
           {children} 
        </div>
    );
}

export default ButtonText;
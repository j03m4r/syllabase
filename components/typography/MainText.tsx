import { twMerge } from "tailwind-merge";

interface MainTextProps {
    className?: string;
    children?: React.ReactNode
};

const MainText: React.FC<MainTextProps> = ({ className, children }) => {
    return (
        <div className={twMerge(`text-lg text-red`, className)}>
            {children}
        </div>
    );
}

export default MainText;
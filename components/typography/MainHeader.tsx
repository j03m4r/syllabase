import { twMerge } from "tailwind-merge";

interface MainHeaderProps {
    className?: string;
    children: React.ReactNode
};

const MainHeader: React.FC<MainHeaderProps> = ({ className, children }) => {
    return (
        <div className={twMerge(`font-bold text-5xl text-red`, className)}>
            {children}
        </div>
    );
}

export default MainHeader;
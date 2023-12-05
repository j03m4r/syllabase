import { twMerge } from "tailwind-merge";

interface SecondaryHeaderProps {
    className?: string;
    children: React.ReactNode;
};

const SecondaryHeader: React.FC<SecondaryHeaderProps> = ({ className, children }) => {
    return (
        <div className={twMerge(`font-semibold text-4xl text-red`, className)}>
            {children}
        </div>
    );
}

export default SecondaryHeader;
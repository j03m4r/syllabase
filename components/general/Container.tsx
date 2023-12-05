'use client';

import { twMerge } from "tailwind-merge";

interface ContainerProps {
    children: React.ReactNode;
    className?: string;
};

const Container: React.FC<ContainerProps> = ({
    children, className
}) => {
    return (
        <div className={twMerge(`max-w-[2520px] h-full justify-center items-center mx-auto xl:px-16 md:px-8 sm:px-2 px-4`, className)}>
            {children}
        </div>
    );
}

export default Container;
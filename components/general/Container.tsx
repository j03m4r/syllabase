'use client';

interface ContainerProps {
    children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({
    children
}) => {
    return (
        <div className="max-w-[2520px] h-full justify-center items-center mx-auto xl:px-16 md:px-8 sm:px-2 px-4">
            {children}
        </div>
    );
}

export default Container;
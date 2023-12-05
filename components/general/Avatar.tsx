'use client';

import Image from "next/image";
import { twMerge } from "tailwind-merge";

interface AvatarProps {
    src?: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({
    src
}) => {
    return (
        // Circle div wrapping a square absolutely placed image
        <div className='select-none relative rounded-full overflow-hidden shadow-md h-[300px] w-[300px]'>
            <Image className='absolute min-w-full min-h-full w-auto h-auto' height={300} width={300}
            alt="Avatar" src={src || "/images/placeholder.jpg"} />
        </div>
    );
}

export default Avatar;
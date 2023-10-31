'use client';

import Image from "next/image";
import { twMerge } from "tailwind-merge";

interface AvatarProps {
    src?: string | null | undefined;
    size?: number;
}

const Avatar: React.FC<AvatarProps> = ({
    src, size
}) => {
    return (
        // Circle div wrapping a square absolutely placed image
        <div className={twMerge(`select-none relative rounded-full overflow-hidden shadow-md`, size===3 ? `w-[250px] h-[250px]` : size===2 ? `w-[60px] h-[60px]` : 'w-[30px] h-[30px]')}>
            <Image className={twMerge(`absolute min-w-full min-h-full w-auto h-auto`)} height={size===3 ? 250 : size===2 ? 60 : 30} width={size===3 ? 250 : size===2 ? 60 : 30} 
            alt="Avatar" src={src || "/images/placeholder.jpg"} />
        </div>
    );
}

export default Avatar;
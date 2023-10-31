"use client";

import { Course } from "@/types";
import Link from "next/link";
import { MdKeyboardArrowRight } from 'react-icons/md';
import { twMerge } from "tailwind-merge";

interface CourseCardProps {
    course: Course;
};

const CourseCard: React.FC<CourseCardProps> = ({
    course
}) => {
    return (
        <Link href={`/course/${course.id}`} className={twMerge(`group flex flex-col justify-evenly items-center h-[300px] p-10 shadow-lg 
        transition duration-300 ease-in-out text-center text-3xl font-bold rounded-xl gap-y-10`, 
        course.status==="Processing" ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-xl')}>
            <div className="flex justify-center items-center h-3/4 overflow-ellipsis">
                {course.specifier!==null ? course.specifier : 'Processing'}
            </div>
            <div className={twMerge(`h-1/4 duration-300 transition ease-in-out`, course.status!=='Processing'&&'group-hover:translate-x-1')}>
                <MdKeyboardArrowRight size={50} />
            </div>
        </Link>
    );
}

export default CourseCard;
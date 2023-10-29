"use client";

import { Course } from "@/types";
import Link from "next/link";
import { MdKeyboardArrowRight } from 'react-icons/md';

interface CourseCardProps {
    course: Course;
};

const CourseCard: React.FC<CourseCardProps> = ({
    course
}) => {
    return (
        <Link href={`/course/${course.id}`} className="group flex flex-col justify-evenly items-center h-[300px] p-10 shadow-lg 
        hover:shadow-xl cursor-pointer transition duration-300 ease-in-out text-center text-3xl font-bold rounded-xl gap-y-10
        border border-lavender">
            <div className="flex justify-center items-center h-3/4 overflow-ellipsis">
                {course.specifier} {course.number}
            </div>
            <div className="h-1/4 group-hover:translate-x-1 duration-300 transition ease-in-out">
                <MdKeyboardArrowRight size={50} />
            </div>
        </Link>
    );
}

export default CourseCard;
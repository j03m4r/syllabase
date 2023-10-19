"use client";

import { Course } from "@/types";
import Link from "next/link";

interface CourseCardProps {
    course: Course;
};

const CourseCard: React.FC<CourseCardProps> = ({
    course
}) => {
    return (
        <Link href={`/course/${course.id}`} className="relative flex justify-center items-center h-[300px] p-4 border-black border shadow-md 
        hover:shadow-lg cursor-pointer transition duration-200 text-center text-xl font-bold hover:-translate-y-2">
            {course.full_class_title}
        </Link>
    );
}

export default CourseCard;
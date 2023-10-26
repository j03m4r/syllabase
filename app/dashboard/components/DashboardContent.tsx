"use client";

import { Course } from "@/types";
import CourseCard from "./CourseCard";
import Button from "@/components/buttons/Button";
import { AiOutlinePlus } from "react-icons/ai";
import useSyllabusUploadModal from "@/hooks/useSyllabusUploadModal";

interface DashboardContentProps {
    courses: Course[];
};

const DashboardContent: React.FC<DashboardContentProps> = ({
    courses
}) => {
    const syllabusModal = useSyllabusUploadModal();

    if (!courses) {
        return (
            <div className="flex justify-center items-center w-full h-full">
                No Active Classes
            </div>
        )
    }

    return (
        <div className="relative flex flex-col w-full h-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full h-full gap-10 pt-28">
                {courses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>
            <Button onClick={syllabusModal.onOpen} className="absolute flex justify-center items-center xl:bottom-14 md:bottom-8 
            sm:bottom-2 bottom-4 rounded-full p-4 shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
                <AiOutlinePlus size={40} />
            </Button>
        </div>
    );
}

export default DashboardContent;


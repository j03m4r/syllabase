"use client";

import { Course } from "@/types";
import useSyllabusUploadModal from "@/hooks/useSyllabusUploadModal";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import ButtonContainer from "@/components/general/ButtonContainer";
import CourseCard from "./CourseCard";

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
        <div className="flex flex-col w-full h-full gap-y-2">
            <ButtonContainer>
                <PrimaryButton onClick={syllabusModal.onOpen}>
                    New Course
                </PrimaryButton>
            </ButtonContainer>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full h-full gap-2">
                {courses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>
        </div>
    );
}

export default DashboardContent;


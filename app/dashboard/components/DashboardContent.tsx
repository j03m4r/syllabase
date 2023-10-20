import { Course } from "@/types";
import CourseCard from "./CourseCard";

interface DashboardContentProps {
    courses: Course[];
};

const DashboardContent: React.FC<DashboardContentProps> = ({
    courses
}) => {
    if (!courses) {
        return (
            <div className="flex justify-center items-center w-full h-full">
                No Active Classes
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full h-full gap-10 pt-28">
            {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
            ))}
        </div>
    );
}

export default DashboardContent;
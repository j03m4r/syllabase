import { Course } from "@/types";
import CourseAspectCard from "./CourseAspectCard";

interface CoursePageContentProps {
  course: Course;
}

const CoursePageContent: React.FC<CoursePageContentProps> = ({ course }) => {
  let fieldsToExclude = [
    "id",
    "specifier",
    "created_at",
    "raw_syllabus_text",
    "status",
    "profile_id",
  ];

  function excludeFields<T extends Record<string, any>>(
    obj: T,
    fieldsToExclude: string[]
  ): Partial<T> {
    const result: Partial<T> = {};
    for (const key in obj) {
      if (!fieldsToExclude.includes(key)) {
        result[key] = obj[key];
      }
    }
    return result;
  }

  let filteredCourse = excludeFields(course, fieldsToExclude);

  return (
    <div className="flex flex-row flex-wrap gap-x-5 gap-y-5 ">
      {Object.keys(filteredCourse).map((field) => (
        <div
          key={field}
          className="
            select-none flex flex-col items-start justify-between w-fit p-8 rounded-xl shadow-lg gap-y-4 max-w-full md:max-w-[40%] min-w-[260px]"
        >
          <h2 className="text-3xl font-semibold capitalize">
            {field.replaceAll("_", " ")}
          </h2>

          <CourseAspectCard field={field} courseAspect={course[field]} />
        </div>
      ))}
    </div>
  );
};

export default CoursePageContent;

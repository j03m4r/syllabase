"use client";

import { Course } from "@/types";
import CourseAspectCard from "./CourseAspectCard";
import ButtonContainer from "@/components/general/ButtonContainer";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { FaArrowLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";

interface CoursePageContentProps {
  course: Course;
}

const CoursePageContent: React.FC<CoursePageContentProps> = ({ course }) => {
  const router = useRouter();

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
    <div className="flex flex-row flex-wrap gap-2">
      <div className="w-full">
        <ButtonContainer>
          <PrimaryButton onClick={() => router.back()}>
            <div className="flex flex-row gap-x-2"><FaArrowLeft size={26} />BACK</div>
          </PrimaryButton>
        </ButtonContainer>
      </div>
      {Object.keys(filteredCourse).map((field, i) => (
        <div
          key={i}
          className="select-none flex flex-col items-start justify-between w-fit 
          p-8 rounded-xl shadow-lg gap-y-4 max-w-full md:max-w-[40%] min-w-[260px]">
          <h2 key={i} className="text-3xl font-semibold capitalize">
            {field.replaceAll("_", " ")}
          </h2>
          <CourseAspectCard key={i} field={field} courseAspect={course[field]} />
        </div>
      ))}
    </div>
  );
};

export default CoursePageContent;

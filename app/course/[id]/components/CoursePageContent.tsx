"use client";

import { Course } from "@/types";
import CourseAspectCard from "./CourseAspectCard";
import ButtonContainer from "@/components/general/ButtonContainer";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { FaArrowLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

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
    delete result.policies;
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
          className={twMerge(`select-none flex flex-col items-start justify-center w-fit
          p-8 rounded-md shadow-lg gap-y-4 max-w-full md:max-w-[40%] max-h-[75vh]`, field!="grade_cutoffs"&&'',
          field==='policies'&&'w-full md:max-w-[full]', field==="grade_categories"&&'md:max-w-fit')}>
          <h2 className="text-3xl font-semibold capitalize">
            {field.replaceAll("_", " ")}
          </h2>
          {/* @ts-ignore */}
          <CourseAspectCard field={field} courseAspect={course[field]} />
        </div>
      ))}
      {course.policies&&(
        <div
          className={twMerge(`select-none flex flex-col items-start justify-start
          p-8 rounded-xl shadow-lg gap-y-4 h-fit w-full`)}>
          <h2 className="text-3xl font-semibold capitalize">
            {"policies".replaceAll("_", " ")}
          </h2>
          <CourseAspectCard field={"policies"} courseAspect={course["policies"]} />
        </div>
      )}
    </div>
  );
};

export default CoursePageContent;

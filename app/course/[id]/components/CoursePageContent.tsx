import { Course } from "@/types";
import CourseAspectCard from "./CourseAspectCard";
import ButtonContainer from "@/components/general/ButtonContainer";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { FaArrowLeft, FaPencil, FaX } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { useMemo } from "react";

interface CoursePageContentProps {
  course: Course;
}

const CoursePageContent: React.FC<CoursePageContentProps> = ({ course }) => {
  const excludeFields = <T extends Record<string, any>>(obj: T): Partial<T> => {
    const fieldsToExclude = [
      "id",
      "specifier",
      "created_at",
      "raw_syllabus_text",
      "status",
      "profile_id",
      "full_title",
    ];
    const result: Partial<T> = {};
    for (const key in obj) {
      if (!fieldsToExclude.includes(key)) {
        result[key] = obj[key];
      }
    }
    return result;
  };

  const filteredCourse = useMemo(() => excludeFields(course), [course]);

  return (
    <div className="flex flex-row flex-wrap gap-2">
      <div className="flex justify-between w-full">
        <div className="w-full flex items-start gap-5">
          <ButtonContainer>
            <Link href="/courses">
              <PrimaryButton>
                <div className="flex flex-row gap-x-2">
                  <FaArrowLeft size={26} />
                  BACK
                </div>
              </PrimaryButton>
            </Link>
          </ButtonContainer>
          <h2 className="font-bold text-red text-5xl ">
            {course.full_title !== "[]" ? (
              course.full_title
            ) : (
              <span className="uppercase">{course.specifier}</span>
            )}
          </h2>
        </div>
        <ButtonContainer>
          <PrimaryButton>
            <div className="flex flex-row gap-x-2">
              <FaPencil size={26} />
              EDIT
            </div>
          </PrimaryButton>
          <PrimaryButton>
            <div className="flex flex-row gap-x-2">
              <FaX size={26} />
              DELETE
            </div>
          </PrimaryButton>{" "}
        </ButtonContainer>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {Object.keys(filteredCourse).map((field, i) => (
          <div
            key={i}
            className={twMerge(
              ` flex flex-col items-start justify-start
          p-8 rounded-md  gap-y-4 max-w-full border border-red`,
              field != "grade_cutoffs" && "",
              field === "policies" && "w-full md:max-w-[full]",
              field === "grade_categories" && "col-span-2",
              field === "policies" && "col-span-3 order-last",
              field === "course_materials" && "order-start",
              course[field].length > 256 && "col-span-2"
            )}
          >
            <h2 className="text-2xl font-bold uppercase text-red">
              {field.replaceAll("_", " ")}
            </h2>
            {/* @ts-ignore */}
            <CourseAspectCard field={field} courseAspect={course[field]} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursePageContent;

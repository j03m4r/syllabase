"use client";

import { Course } from "@/types";
import { useEffect, useState } from "react";
import CourseAspectCard from "./CourseAspectCard";
import { twMerge } from "tailwind-merge";

interface CoursePageContentProps {
    course: Course;
};

const CoursePageContent: React.FC<CoursePageContentProps> = ({
    course
}) => {

    const courseTwoWordsReg = /^course_([a-z-_]+)_([a-z-_]+)$/;
    const courseOneWordReg = /^course_([a-z-_]+)$/;
    const twoWordsReg = /^([A-Za-z0-9]+)_([A-Za-z0-9]+)$/;
    const numDropsReg = /^num_([a-z-_]+)_([a-z-_]+)$/;
    const [fieldLabels, setFieldLabels] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        Object.keys(course).forEach((field) => {
            if (courseTwoWordsReg.test(field)) {
                let labels = field.match(courseTwoWordsReg);
                // @ts-ignore
                labels[1] = labels[1][0].toUpperCase() + labels[1].slice(1);
                // @ts-ignore
                labels[2] = labels[2][0].toUpperCase() + labels[2].slice(1);
                // @ts-ignore
                setFieldLabels((prev) => ({ ...prev, [field]: `${labels[1]} ${labels[2]}` }));
            } else if (courseOneWordReg.test(field)) {
                let labels = field.match(courseOneWordReg);
                // @ts-ignore
                labels[1] = labels[1][0].toUpperCase() + labels[1].slice(1);
                // @ts-ignore
                setFieldLabels((prev) => ({ ...prev, [field]: `${labels[1]}` }));
            } else if (twoWordsReg.test(field) && field!=='full_title') {
                let labels = field.match(twoWordsReg);
                // @ts-ignore
                labels[1] = labels[1][0].toUpperCase() + labels[1].slice(1);
                // @ts-ignore
                labels[2] = labels[2][0].toUpperCase() + labels[2].slice(1);
                // @ts-ignore
                setFieldLabels((prev) => ({ ...prev, [field]: `${labels[1]} ${labels[2]}` }));
            } else if (numDropsReg.test(field)) {
                let labels = field.match(numDropsReg);
                // @ts-ignore
                labels[1] = labels[1][0].toUpperCase() + labels[1].slice(1);
                // @ts-ignore
                labels[2] = labels[2][0].toUpperCase() + labels[2].slice(1);
                // @ts-ignore
                setFieldLabels((prev) => ({ ...prev, [field]: `Number of ${labels[1]} ${labels[2]}` }));
            }
        });
        setIsLoading(false);
    }, []);

    return (
        <div className="flex flex-row flex-wrap gap-x-5 gap-y-5 w-full h-full">
            <div className="font-bold text-5xl">{course.full_title ? course.full_title : null}</div>
            {!isLoading ?
                Object.keys(course).map((field) => {
                    let content = null;
                    // @ts-ignore
                    if (fieldLabels[field]) {
                        content = (
                            <div key={field} className={twMerge(`select-none flex flex-col items-start justify-center w-fit p-8 
                            rounded-xl shadow-lg gap-y-4 max-w-full md:max-w-[40%] min-w-[260px]`, 
                            field==="course_teaching_staff"||field==="course_labs" ? "w-full md:max-w-full" : field==="course_grade_categories" ? "w-full md:w-1/2 md:max-w-full" : "w-fit")}>
                                {/* @ts-ignore */}
                                <div className="text-4xl font-bold">{fieldLabels[field]}</div>
                                {/* @ts-ignore */}
                                <CourseAspectCard courseAspect={course[field]} />
                            </div>
                        );
                    }

                    return content;
                }) : (
                <div className="flex justify-center items-center w-full h-full">
                    Loading...
                </div>
            )}
        </div>
    );
}

export default CoursePageContent;
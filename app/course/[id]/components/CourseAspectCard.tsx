"use client";

import { useEffect } from "react";
import SimpleDescriptor from "./SimpleDescriptor";
import PieChart from "./PieChart";
import GradeLineVisualizer from "./GradeLineVisualizer";

interface CourseAspectCardProps {
    courseAspect: any;
};

const CourseAspectCard: React.FC<CourseAspectCardProps> = ({
    courseAspect
}) => {
    function arraysEqual(a: any, b: any) {
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length !== b.length) return false;

        a.sort()
        b.sort()
      
        for (var i = 0; i < a.length; ++i) {
          if (a[i] !== b[i]) return false;
        }
        return true;
    }
    
    let content = null;
    if (Array.isArray(courseAspect) && courseAspect.length) { // the course aspect is a list
        const fields = Object.keys(courseAspect[0]);
        if (arraysEqual(fields, ["id", "description"]) || arraysEqual(fields, ["id", "description"]) || arraysEqual(fields, ["id", "name", "email"])) {
            content = (
                <div className="flex flex-row justify-center items-center gap-y-4 gap-x-8 w-fit h-fit flex-wrap">
                    {courseAspect.map((aspect) => (
                        <SimpleDescriptor key={aspect.id} element={aspect} />
                    ))}
                </div>
            )
        } else if (arraysEqual(fields, ["id", "title", "description"])) {
            content = (
                <ol className="flex flex-col gap-y-2 list-decimal px-4">
                    {courseAspect.map((aspect) => (
                        <li key={aspect.id} className="text-xl font-semibold">
                            <SimpleDescriptor element={aspect} />
                        </li>
                    ))}
                </ol>
            );
        } else if (arraysEqual(fields, ["id", "grade_name", "upper_percentage", "lower_percentage"])) {
            content = <GradeLineVisualizer gradeLines={courseAspect} />
        } else if (arraysEqual(fields, ["id", "name", "grade_percentage"] || arraysEqual(fields, ["id", "name", "grade_percentage", "num_drops"]))) {
            content = <PieChart gradeCategories={courseAspect} />
        } else if (arraysEqual(fields, ["id", "title", "lead_by", "day_of_week", "start_time", "end_time"])) {

        }
    } else if (courseAspect && arraysEqual(Object.keys(courseAspect), ["id", "name", "email"])) { // the course aspect is not a list
        content = <SimpleDescriptor element={courseAspect} />
    } else if (typeof courseAspect==="number") {
        content = (
            <div className="flex justify-center items-center w-full text-6xl font-semibold">{courseAspect}</div>
        )
    } else if (courseAspect===null) {
        content = (
            <div className="text-xl font-light">N/A</div>
        )
    }
    
    return content;
}

export default CourseAspectCard;
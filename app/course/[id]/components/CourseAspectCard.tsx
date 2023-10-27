"use client";

import { useEffect } from "react";
import SimpleDescriptor from "./SimpleDescriptor";

interface CourseAspectCardProps {
    courseAspect: object;
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
    if (Array.isArray(courseAspect) && courseAspect.length) {
        const fields = Object.keys(courseAspect[0]);

        if (arraysEqual(fields, ["id", "description"]) || arraysEqual(fields, ["id", "description"]) || arraysEqual(fields, ["id", "title", "description"])
        || arraysEqual(fields, ["id", "name", "email"])) {
            // console.log(fields)
            content = (
                <div className="flex flex-row justify-center items-center gap-y-4 gap-x-8 w-fit h-fit flex-wrap">
                    {courseAspect.map((aspect) => (
                        <SimpleDescriptor key={aspect.id} element={aspect} />
                    ))}
                </div>
            )
        } else if (arraysEqual(fields, ["id", "grade_name", "upper_percentage", "lower_percentage"])) {

        } else if (arraysEqual(fields, ["id", "name", "grade_percentage", "num_drops"])) {

        } else if (arraysEqual(fields, ["id", "title", "lead_by", "day_of_week", "start_time", "end_time"])) {

        }
    } else {
        const fields = courseAspect;
        if (arraysEqual(fields, ["id", "name", "email"])) {
            // @ts-ignore
            content = <SimpleDescriptor element={courseAspect} />
        }
    }
    
    return content;
}

export default CourseAspectCard;
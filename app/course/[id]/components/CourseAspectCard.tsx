import SimpleDescriptor from "./SimpleDescriptor";
import PieChart from "./PieChart";
import GradeLineVisualizer from "./GradeLineVisualizer";
import { Event } from "@/types";
import EventComponent from "./EventComponent";

interface CourseAspectCardProps {
  courseAspect: any;
  field: string;
}
const CourseAspectCard: React.FC<CourseAspectCardProps> = ({
  courseAspect,
  field,
}) => {
  switch (field) {
    case "grade_cutoffs":
      return <GradeLineVisualizer gradeLines={courseAspect} />;
    case "grade_categories":
      return <PieChart gradeCategories={courseAspect} />;
    case "important_dates":
      return (
        <div className="flex flex-col gap-y-4">
          {courseAspect.map((aspect: Event) => (
            <EventComponent key={aspect.id} event={aspect} />
          ))}
        </div>
      );
    default:
      return (
        <div className="flex flex-row justify-center items-center gap-y-4 gap-x-8 ">
          <SimpleDescriptor elements={courseAspect} />
        </div>
      );
  }
};

export default CourseAspectCard;

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
      let events: Event[] = courseAspect;
      return (
        <ul className="flex flex-col gap-y-2 list-disc">
          {events.map((aspect, i) => (
            <EventComponent key={i} event={aspect} />
          ))}
        </ul>
      );
    default:
      return (
        <div className="flex flex-row gap-y-4 gap-x-8">
          <SimpleDescriptor elements={courseAspect} field={field} />
        </div>
      );
  }
};

export default CourseAspectCard;


import MainText from "@/components/typography/MainText";
import { Employee } from "@/types";
import { CiUser } from "react-icons/ci";

interface SimpleDescriptorProps {
  elements: any[];
  field: string;
}

const SimpleDescriptor: React.FC<SimpleDescriptorProps> = ({ elements, field }) => {
  switch (field) {
    case "instructor":
      // @ts-ignore
      let instructor: Employee = elements;
      return (
        <div className="flex gap-x-2 w-full justify-center items-center">
          <CiUser size={30} />
          <MainText className="text-xl text-charcoal">{instructor.name}</MainText>
        </div>
      );
    case "course_materials":
    case "policies":
      if (elements.length===0) return null;
      return (
        <ol className="flex flex-col gap-y-2 list-disc">
          {elements.map((policy, i) => (
            <li key={i} className="list-item">
              <MainText className="text-charcoal">{policy}</MainText>
            </li>
          ))}
        </ol>
      );
    case "attendance":
      return (
        <div className="flex flex-col gap-y-2 justify-center items-start">
          {Object.keys(elements).slice(1, Object.keys(elements).length).map((key, i) => (
            <div key={i} className="flex flex-row gap-x-2">
              <MainText className="capitalize text-charcoal font-semibold">{key.replaceAll("_", " ")}</MainText>
              {/* @ts-ignore */}
              <MainText className="text-charcoal">{elements[key]}</MainText>
            </div>
          ))}
        </div>
      );
    default:
      return (
        <MainText className="text-charcoal">{elements}</MainText>
      );
  };
};

export default SimpleDescriptor;


import MainText from "@/components/typography/MainText";
import SecondaryHeader from "@/components/typography/SecondaryHeader";
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
    case "policies":
      return (
        <ol className="flex flex-col gap-y-2">
          {elements.map((policy, i) => (
            <li key={i}>
              <MainText className="text-charcoal">{policy}</MainText>
            </li>
          ))}
        </ol>
      );
    default:
      return (
        <ul className="flex flex-col gap-y-2"> 
            <li className="">{JSON.stringify(elements)}</li>
        </ul>
      );
  };
};

export default SimpleDescriptor;

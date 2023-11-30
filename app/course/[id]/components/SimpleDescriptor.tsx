
import { CiUser } from "react-icons/ci";

interface SimpleDescriptorProps {
  elements: any[];
}

const SimpleDescriptor: React.FC<SimpleDescriptorProps> = ({ elements }) => (
  <ul className="flex flex-col gap-y-2">
  
      <li className="">{JSON.stringify(elements)}</li>

  </ul>
);

export default SimpleDescriptor;

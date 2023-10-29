import { SimpleDescriptor } from "@/types";
import { CiUser } from "react-icons/ci";

interface SimpleDescriptorProps {
    element: SimpleDescriptor;
};

const SimpleDescriptor: React.FC<SimpleDescriptorProps> = ({
    element
}) => {
    return (
        <div className="flex flex-row items-center">
            <CiUser size={30} className={element.name&&element.email ? "block mr-2" : "hidden"} />
            <div className="flex flex-col items-start justify-center gap-y-2">
                <div className="text-xl font-semibold">{element.title ? element.title : element.name ? element.name : null}</div>
                <div className="text-lg font-light">{element.description ? element.description : element.email ? element.email : null}</div>
            </div>
        </div>
    );
}

export default SimpleDescriptor;
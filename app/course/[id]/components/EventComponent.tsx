import MainText from "@/components/typography/MainText";
import { Event } from "@/types";

interface EventComponentProps {
    event: Event;
};

const EventComponent: React.FC<EventComponentProps> = ({
    event
}) => {

    return (
        <div className="flex-col gap-y-2 list-item">
            {/* @ts-ignore */}
            <MainText className="capitalize font-medium text-lg text-charcoal">{event[1]}</MainText>
            <MainText className=" capitalize text-md">
                {/* @ts-ignore */}
               {event[0]}
            </MainText>
        </div>
    );
}

export default EventComponent;
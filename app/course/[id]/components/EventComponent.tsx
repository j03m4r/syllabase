"use client";

import { Event } from "@/types";
import { useEffect, useState } from "react";

interface EventComponentProps {
    event: Event;
};

function formatTime(t: string) {
    const timeStampReg = /^(0?[0-9]|1[0-9]|2[0-3]):([0-9]+):[0-9]+$/;
    var hour = 0;
    var minute = "";
    var timeOfDay = "AM";
    var m = t.match(timeStampReg);
    if (m) {
        var _hour = Number(m[1]);
        if (_hour > 11) {
            timeOfDay = "PM";
            if (_hour > 12) {
                _hour = _hour - 12;
            }
        }
        hour = _hour;
        minute = m[2];
    }

    return `${hour}:${minute} ${timeOfDay}`;
}

const EventComponent: React.FC<EventComponentProps> = ({
    event
}) => {
    
    // const [startTime, setStartTime] = useState("");
    // const [endTime, setEndTime] = useState("");

    // useEffect(() => {
    //     if (event.start_time) {
    //         setStartTime(formatTime(event.start_time));
    //     } else if (event.start_date) {
    //         setStartTime(formatTime(new Date(event.start_date).toTimeString().slice(0,8)))
    //     }

    //     if (event.end_time) {
    //         setEndTime(formatTime(event.end_time));
    //     } else if (event.end_date) {
    //         setEndTime(formatTime(new Date(event.end_date).toTimeString().slice(0,8)))
    //     }
    // }, []);

    return (
        <div className="flex flex-col gap-y-2">
            <div className="text-xl font-semibold">{event[1]}</div>
            <div className="text-sm text-light">
               {event[0]}
            </div>
        </div>
    );
}

export default EventComponent;
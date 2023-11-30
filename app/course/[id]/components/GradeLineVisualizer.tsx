"use client";

import { GradeLine } from "@/types";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

interface GradeLineVisualizerProps {
    gradeLines: [string, number, number][];
};

const gradeLineColors = ['bg-mint', 'bg-lime', 'bg-yellow', 'bg-khaki', 'bg-lightblue', 'bg-cyan', 'bg-lightpink', 'bg-pink', 'bg-periwinkle', 'bg-lavender',
'bg-meteorite', 'bg-darkpurple']

const GradeLineVisualizer: React.FC<GradeLineVisualizerProps> = ({
    gradeLines
}) => {
    return (
        <div className="flex justify-center items-center min-h-[60vh] h-full w-full">
            <div className="flex flex-col w-1/5 h-full justify-center items-center gap-y-2">
                {gradeLines.map((gradeLine, index) => (
                    <div key={gradeLine[0]} style={{ height: `${gradeLine[1]-gradeLine[2]}%` }} 
                    className={`w-full ${gradeLineColors[index]} hover:scale-105 transition duration-300 ease-in-out rounded-md
                    relative flex items-center group text-sm font-extralight`}>
                        <div className="absolute -left-10">{gradeLine[0]}</div>
                        <div className="absolute flex flex-col gap-y-2 -right-16 w-[50px] group-hover:opacity-100 opacity-0 transition duration-300 
                        ease-in-out">
                            <div>
                                {gradeLine[1]}%
                            </div>
                            <div>
                                {gradeLine[2]}%
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GradeLineVisualizer;
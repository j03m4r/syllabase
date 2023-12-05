"use client";

import PrimaryButton from "@/components/buttons/PrimaryButton";
import ButtonContainer from "@/components/general/ButtonContainer";
import { RxCross1 } from 'react-icons/rx';
import { Course } from "@/types";
import Link from "next/link";
import SecondaryHeader from "@/components/typography/SecondaryHeader";
import { useRouter } from "next/navigation";
import MainText from "@/components/typography/MainText";
import { useEffect, useState } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { toast } from "react-hot-toast";
import { twMerge } from "tailwind-merge";

interface CourseCardProps {
    course: Course;
};

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
    const [isLoading, setIsLoading] = useState(false);
    const { supabaseClient } = useSessionContext();
    const router = useRouter();

    const deleteCourse = async () => {
        setIsLoading(true);

        try {
            const { error } = await supabaseClient.from('courses').delete()
            .eq('id', course.id);

            if (error) {
                toast.error(error.message);
            } else {
                toast.success("Successfully deleted course")
            }
        } catch {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
            router.refresh();
        }
    };

    return (
        <div className={twMerge(`flex flex-col gap-y-2 w-full justify-start items-center`, (isLoading||course.status==="processing")&&'opacity-40')}>
            <Link href={course.status==="processing" ? {} : `/course/${course.id}`} className={twMerge(`flex flex-col justify-between 
            items-center w-full aspect-square border border-red hover:bg-red p-12 rounded-md
            group transition-colors duration-300 ease-in-out cursor-pointer`, (isLoading||course.status==="processing")&&'opacity-40 hover:bg-none')}>
                <SecondaryHeader className={twMerge(`text-red group-hover:text-lavender duration-300 transition-colors ease-in-out`, (isLoading||course.status==="processing")&&'group-hover:text-red')}>
                    {course.specifier}
                </SecondaryHeader>
                <div className="flex flex-row justify-between items-center w-full">
                    <MainText className={twMerge(`text-red group-hover:text-lavender duration-300 transition-colors ease-in-out`, (isLoading||course.status==="processing")&&'group-hover:text-red')}>{course.instructor ? course.instructor.name : "No instructor listed"}</MainText>
                    <MainText className={twMerge(`text-red group-hover:text-lavender duration-300 transition-colors ease-in-out`, (isLoading||course.status==="processing")&&'group-hover:text-red')}>2023</MainText>
                </div>
            </Link>
            <div className="self-end flex flex-row gap-x-2">
                <ButtonContainer>
                    <PrimaryButton disabled={isLoading||course.status==="processing"} onClick={course.status==="processing" ? () => {} : () => router.push(`/course/${course.id}`)}>
                        EDIT COURSE
                    </PrimaryButton>
                </ButtonContainer>
                <ButtonContainer>
                    <PrimaryButton disabled={isLoading||course.status==="processing"} onClick={() => {if (confirm("Delete course?")) deleteCourse()}} className="text-red">
                        <RxCross1 size={28} />
                    </PrimaryButton>
                </ButtonContainer>
            </div>
        </div>
    );
}

export default CourseCard;
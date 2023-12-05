'use client';

import PrimaryButton from "@/components/buttons/PrimaryButton";
import ButtonContainer from "@/components/general/ButtonContainer";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import MainHeader from "@/components/typography/MainHeader";
import MainText from "@/components/typography/MainText";

const LandingPageContent = () => {
    const authModal = useAuthModal();

    const { user } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (user) router.push('/courses');
    }, [user,]);

    return (
        <div className="relative grid grid-cols-2 grid-rows-2 h-full w-full justify-center items-center bg-contain">
            <MainHeader className="select-none absolute text-9xl top-5 left-5 group flex flex-col">
                Understand
                <MainHeader className="group-hover:italic text-9xl">your</MainHeader>
                courses
            </MainHeader>
            <MainHeader className="select-none absolute text-9xl bottom-5 right-5 text-right group flex flex-col">
                Understand
                <MainHeader className="group-hover:italic text-9xl">how</MainHeader> 
                to succeed
            </MainHeader>
            <div className="col-start-1 row-start-2 flex items-center justify-center w-full">
                <ButtonContainer>
                    <PrimaryButton onClick={authModal.onOpen}>
                        Sign up
                    </PrimaryButton>
                </ButtonContainer>
            </div>
            <div className="select-none relative col-start-2 row-start-1 flex flex-col items-center justify-center w-full gap-y-2">
                <MainHeader className="text-8xl relative group flex gap-x-2">
                    <MainHeader className="italic text-8xl">Sylla</MainHeader>
                    <MainHeader className="flex align-text-bottom pt-12">base</MainHeader>
                    <MainText className="absolute top-1/2 group-hover:translate-y-1/2 text-charcoal flex flex-wrap max-w-[30vw] 
                    text-center text-2xl w-fit p-2 rounded-md opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out">
                        A syllabus visualizer to help you succeed in your courses
                    </MainText>
                </MainHeader>
            </div>
        </div>
    );
}

export default LandingPageContent;
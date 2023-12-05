'use client';

import Button from "@/components/buttons/Button";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import ButtonContainer from "@/components/general/ButtonContainer";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LandingPageContent = () => {
    const authModal = useAuthModal();

    const { user } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (user) router.push('/courses');
    }, [user,]);

    return (
        <div className="flex flex-col h-full justify-center items-center gap-y-5">
            SIGNIN + WHO ARE WE PAGE
            <div className="flex items-center justify-center w-full gap-x-5">
                <ButtonContainer>
                    <PrimaryButton onClick={authModal.onOpen}>
                        Sign up
                    </PrimaryButton>
                </ButtonContainer>
            </div>
        </div>
    );
}

export default LandingPageContent;
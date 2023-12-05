'use client';

import Button from "@/components/buttons/Button";
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
                <Button onClick={authModal.onOpen} className="text-xl px-6 py-3 border-forestGreen hover:border-orange text-forestGreen hover:text-cream border hover:bg-orange 
                hover:rounded-se-xl hover:rounded-bl-xl duration-200">
                    GET STARTED
                </Button>
            </div>
        </div>
    );
}

export default LandingPageContent;
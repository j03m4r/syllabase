"use client";

import { usePathname, useRouter } from "next/navigation";
import Container from "../general/Container";
import ButtonContainer from "../general/ButtonContainer";
import PrimaryButton from "../buttons/PrimaryButton";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";

const Navbar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const supabase = useSupabaseClient();
    if (pathname === "/") return null;
    return (
        <div className="fixed w-full z-10 min-h-[100px]">
            <Container>
                <div className="flex flex-row items-center justify-between py-4">
                    <div className="flex flex-row gap-x-3 items-center">
                        <div className="flex flex-row gap-x-[3px]">
                            <div onClick={() => router.push("/courses")} className="font-bold italic text-5xl text-red select-none hover:cursor-pointer w-fit">
                                Sylla
                            </div>
                            <div onClick={() => router.push("/courses")} className="font-bold text-5xl text-red select-none hover:cursor-pointer w-fit">
                                base
                            </div>
                        </div>
                        <div className="font-extralight text-lg text-lavender select-none mt-2">
                            {pathname}
                        </div>
                    </div>
                    <ButtonContainer>
                        <PrimaryButton onClick={() => router.push('/courses')}>COURSES</PrimaryButton>
                        <PrimaryButton onClick={() => router.push('/account')}>ACCOUNT</PrimaryButton>
                        <PrimaryButton onClick={() => supabase.auth.signOut()}>LOGOUT</PrimaryButton>
                    </ButtonContainer>
                </div>
            </Container>
        </div>
    );
}

export default Navbar;
"use client";

import CourseCard from "@/app/courses/components/CourseCard";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import Avatar from "@/components/general/Avatar";
import ButtonContainer from "@/components/general/ButtonContainer";
import Container from "@/components/general/Container";
import MainHeader from "@/components/typography/MainHeader";
import useLoadAvatar from "@/hooks/useLoadAvatar";
import useUpdateProfileModal from "@/hooks/useUpdateProfileModal";
import { useUser } from "@/hooks/useUser";
import { Course } from "@/types";

interface AccountContentProps {
    courses: Course[]
};

const AccountContent: React.FC<AccountContentProps> = ({ courses }) => {
    const { profile } = useUser();
    const avatar_url = useLoadAvatar(profile?.avatar_url || '');
    const updateProfileModal = useUpdateProfileModal();

    return (
        <div className="flex flex-col lg:grid grid-cols-1 sm:grid-cols-3 w-full h-full">
            <Container className='lg:col-span-1 xl:py-16 md:py-8 sm:py-2 py-4 flex flex-col justify-start gap-y-4'>
                <Avatar src={avatar_url} />
                <MainHeader className="text-lavender">{profile?.username}</MainHeader>
                <ButtonContainer>
                    <PrimaryButton onClick={updateProfileModal.onOpen}>UPDATE PROFILE</PrimaryButton>
                </ButtonContainer>
            </Container>
            <div className="lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-2">
                <div className="col-span-2">
                    <div className="w-fit p-8 flex flex-row select-none border border-red rounded-md">
                        {"COURSES".split("").map((char) => (
                            <MainHeader className="hover:text-lavender hover:italic cursor-default">{char}</MainHeader>
                        ))}
                        {/* <MainHeader className="rounded-md py-8 px-8 border border-red w-fit hover:text-lavender">COURSES</MainHeader> */}
                    </div>
                </div>
                {courses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>
        </div>
    );
}

export default AccountContent;
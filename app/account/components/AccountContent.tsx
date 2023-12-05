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
                <MainHeader>{profile?.username}</MainHeader>
                <ButtonContainer>
                    <PrimaryButton onClick={updateProfileModal.onOpen}>UPDATE PROFILE</PrimaryButton>
                </ButtonContainer>
            </Container>
            <div className="lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-2">
                <MainHeader className="col-span-full py-8">COURSES</MainHeader>
                {courses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>
        </div>
    );
}

export default AccountContent;
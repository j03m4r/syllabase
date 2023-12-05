'use client';

import AuthModal from "@/components/modals/AuthModal";
import SyllabusUpload from "@/components/modals/SyllabusUpload";
import UpdateProfileModal from "@/components/modals/UpdateProfileModal";

const ModalProvider = () => {
    return (
        <>
            <SyllabusUpload />
            <AuthModal />
            <UpdateProfileModal />
        </>
    );
}

export default ModalProvider;
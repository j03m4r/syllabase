'use client';

import useUpdateProfileModal from "@/hooks/useUpdateProfileModal";
import Modal from "./Modal";
import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useUser } from "@/hooks/useUser";
import toast from "react-hot-toast";
import uniqid from 'uniqid';
import Input from "../inputs/Input";
import Button from "../buttons/Button";
import { CgProfile } from 'react-icons/cg';
import InputLabel from "../typography/InputLabel";
import ButtonContainer from "../general/ButtonContainer";
import PrimaryButton from "../buttons/PrimaryButton";

const UpdateProfileModal = () => {
    const { isOpen, onClose } = useUpdateProfileModal();
    const { user } = useUser();

    const [isLoading, setIsLoading] = useState(false);

    const supabaseClient = useSupabaseClient();
    const router = useRouter();

    const onChange = (open: boolean) => {
        if (!open) {
            onClose();
        }
    }

    const {
        register,
        handleSubmit,
        reset,
        watch,
    } = useForm<FieldValues>({
        defaultValues: {
            image: null,
            username: '',
        }
    });

    const username = watch('username');

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        try {
            setIsLoading(true);

            let updateObject: any = {};
            const imageFile = values.image?.[0];

            if (!user) {
                toast.error('Not logged in');
                return;
            }

            if (imageFile) {
                const uniqueID = uniqid();

                // UPLOAD IMAGE
                const {
                    data: imageData,
                    error: imageError
                } = await supabaseClient.storage.from('images').upload(`avatar-${values.username ? values.username : user.id}-${uniqueID}`, imageFile, {
                    cacheControl: '3600',
                    upsert: false
                });

                if (imageError) {
                    setIsLoading(false);
                    console.log(imageError);
                    return toast.error('Failed image upload.');
                }

                if (imageData) {
                    updateObject.avatar_url = imageData.path
                }
            }

            if (values.username!=='') updateObject.username = values.username

            if (Object.keys(updateObject).length) {
                // UPDATING USER
                const {
                    error: supabaseError
                } =  await supabaseClient.from('profiles')
                .update(updateObject)
                .eq('id', user.id);

                if (supabaseError) {
                    setIsLoading(false);
                    return toast.error(supabaseError.message);
                } else {
                    toast.success('Profile updated!');
                }
            }

            router.refresh();
            setIsLoading(false);
            reset();
            onClose();
        } catch (error) {
            toast.error('Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal title="Update Profile" description="Change the appearance of your profile" onChange={onChange}
        isOpen={isOpen}>
            <div className="flex flex-col w-full h-full justify-center items-center gap-y-5">
                <div className="flex flex-col gap-y-1 items-start justify-center w-full">
                    <InputLabel htmlFor="username">Edit username (optional)</InputLabel>
                    <Input id="username" {...register('username', { required: false })} value={username || ""} 
                    placeholder="Enter a new username" disabled={isLoading} className="w-full
                    rounded-md border border-red p-4 focus:outline-none placeholder:text-grey resize-none bg-offWhite" />
                </div>
                <div className="flex flex-col gap-y-1 items-start justify-center w-full">
                    <InputLabel htmlFor="image">Edit profile picture (optional)</InputLabel>
                    <div className="w-full relative flex flex-col border border-red hover:bg-red justify-center items-center
                    cursor-pointer duration-300 rounded-md py-5 md:py-20 hover:text-lavender text-red">
                        <CgProfile size={30} />
                        <Input id="image" type="file" accept="image/*" className="cursor-pointer opacity-0 absolute inset-0" 
                        {...register('image', { required: false })}/>
                    </div>
                </div>
                <ButtonContainer>
                    <PrimaryButton onClick={handleSubmit(onSubmit)}>Update Profile</PrimaryButton>
                </ButtonContainer>
            </div>
        </Modal>
    );
}

export default UpdateProfileModal;
"use client";

import useSyllabusUploadModal from "@/hooks/useSyllabusUploadModal";
import Modal from "./Modal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import Button from "../buttons/Button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const SyllabusUpload = () => {
    const { onClose, isOpen } = useSyllabusUploadModal();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const supabaseClient = useSupabaseClient();

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
            syllabusText: ""
        }
    });

    const syllabusText = watch("syllabusText");

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        try {
            // if (!user) {
            //     toast.error('Not logged in');
            //     return;
            // }

            setIsLoading(true);
            let ratingObject = { raw_syllabus_text: values.syllabusText }; // Later add profile_id: user.id

            // INSERTING SYLLABUS TEXT
            const {
                error
            } =  await supabaseClient.from('courses').insert(ratingObject);

            if (error) {
                return toast.error(error.message);
            } else {
                toast.success('Processing course creation...');
            }

            reset();
            onClose();
            router.refresh();
        } catch (error) {
            toast.error('Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal title="Course Creation" description="Upload a course syllabus" isOpen={isOpen} onChange={onChange}>
            <div className="flex flex-col items-center justify-between w-full h-full md:h-[70vh] gap-y-5">
                <div className="relative flex flex-col items-start justify-center w-full h-full gap-y-2">
                    <label htmlFor="syllabusText" className="text-2xl font-semibold">Syllabus Text</label>
                    <textarea id="syllabusText" {...register('syllabusText', { required: false })} value={syllabusText || ""} 
                    placeholder="Copy course syllabus here... (yes all of it)" disabled={isLoading} className="w-full h-full
                    rounded-xl border border-black p-4 focus:outline-none placeholder:text-grey resize-none"/>
                    <div className="absolute left-4 bottom-3 font-extralight">
                        {syllabusText.length}
                    </div>
                </div>
                <Button onClick={handleSubmit(onSubmit)} disabled={isLoading} className="flex justify-center items-center px-8 py-4 text-meteorite bg-lavender 
                hover:bg-periwinkle transition duration-300 ease-in-out text-xl font-semibold rounded-xl">
                    Upload
                </Button>
            </div>
        </Modal>
    );
}

export default SyllabusUpload;
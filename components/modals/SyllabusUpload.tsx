"use client";

import useSyllabusUploadModal from "@/hooks/useSyllabusUploadModal";
import Modal from "./Modal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import Button from "../buttons/Button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { pushRawSyllabus } from "@/actions/messageQueue";
import PrimaryButton from "../buttons/PrimaryButton";
import ButtonContainer from "../general/ButtonContainer";
import InputLabel from "../typography/InputLabel";
import { parsePDF } from "@/actions/parsePDF";

const SyllabusUpload = () => {
  const { onClose, isOpen } = useSyllabusUploadModal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const { profile } = useUser();
  let [isPending, startTransition] = useTransition();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const { register, handleSubmit, reset, watch } = useForm<FieldValues>({
    defaultValues: {
      syllabusText: "",
      specifier: "",
    },
  });

  const syllabusText = watch("syllabusText");
  const specifier = watch("specifier");

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      if (!profile) {
        toast.error("Not logged in");
        return;
      }

      setIsLoading(true);
      let ratingObject = {
        raw_syllabus_text: values.syllabusText,
        profile_id: profile.id,
        status: "processing",
        specifier: values.specifier,
      }; // Later add profile_id: user.id

      // INSERTING SYLLABUS TEXT
      const { error, data } = await supabaseClient
        .from("courses")
        .insert(ratingObject)
        .select("id");

      if (error) {
        return toast.error(error.message);
      } else {
        try {
          startTransition(() => {
            pushRawSyllabus(data[0].id);
          });
        } catch (error) {
          toast.error("Something went wrong");
        }

        toast.success(`Processing ${values.specifier}`);
      }

      reset();
      onClose();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = async (e) => {
        // Create a blob from the result
        // const blob = new Blob([e.target.result], { type: file.type });

        // Call the passed parsing function with the blob

        const response = await fetch("/api/pdf", {
          method: "POST",
          body: e.target.result,
        }).then(console.log);
      };

      // Read the file as an ArrayBuffer and then convert it to a Blob
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <Modal
      title="Course Creation"
      description="Upload a course syllabus"
      isOpen={isOpen}
      onChange={onChange}
    >
      <div className="flex flex-col items-center justify-between w-full h-full md:h-[70vh] gap-y-5">
        <div className="relative flex flex-col items-start justify-center w-full h-full gap-y-2">
          <InputLabel htmlFor="specifier">Course Specifier</InputLabel>
          <input
            type="file"
            onChange={handleFileChange}
            accept=".pdf, .doc, .docx"
          />
          <input
            id="specifier"
            {...register("specifier", { required: false })}
            value={specifier || ""}
            placeholder="e.g. CSCI 2041"
            disabled={isLoading}
            className="w-full rounded-md border border-red p-4 focus:outline-none placeholder:text-grey resize-none bg-offWhite"
          />
          <InputLabel htmlFor="syllabusText">Syllabus Text</InputLabel>
          <textarea
            id="syllabusText"
            {...register("syllabusText", { required: false })}
            value={syllabusText || ""}
            placeholder="Copy course syllabus here... (yes all of it)"
            disabled={isLoading}
            className="w-full h-full
                    rounded-md border border-red p-4 focus:outline-none placeholder:text-grey resize-none bg-offWhite"
          />
          <div className="absolute left-4 bottom-3 font-extralight text-charcoal">
            {syllabusText.length}
          </div>
        </div>
        <ButtonContainer>
          <PrimaryButton onClick={handleSubmit(onSubmit)}>Upload</PrimaryButton>
        </ButtonContainer>
      </div>
    </Modal>
  );
};

export default SyllabusUpload;

import { Course } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/dist/client/components/headers";
import { promises as fs } from 'fs';
import { redirect } from "next/navigation";

const getCourseById = async (id: number): Promise<Course> => {

    const supabase = createServerComponentClient({
        cookies: cookies
    });

    const { data, error } = await supabase.from('courses').select(`*, instructor (id, name, email), attendance (*) `).eq('id', id).single();

    if (!data) return redirect('/courses');

    return data;
};

export default getCourseById;
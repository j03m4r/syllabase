import { Course } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/dist/client/components/headers";
import { promises as fs } from 'fs';
import { redirect } from "next/navigation";

const getCourseById = async (id: number): Promise<Course> => {
    // const file = await fs.readFile(process.cwd() + '/exampleClassesJson.json', 'utf8');
    // const data = JSON.parse(file);

    const supabase = createServerComponentClient({
        cookies: cookies
    });

    const { data, error } = await supabase.from('courses').select(`*, course_materials(*), course_policies(*), 
    course_grade_lines(*), course_grade_categories(*), grade_curve(*), course_lectures(*), course_labs(*),
    course_discussions(*), lead_by(*), course_teaching_assistants(*), course_office_hours(*), course_midterms(*),
    course_finals(*)`).eq('id', id).single();

    if (!data) return redirect('/dashboard');

    return data;
};

export default getCourseById;
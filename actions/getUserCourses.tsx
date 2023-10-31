import { Course } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/dist/client/components/headers";
import { promises as fs } from 'fs';

const getUserCourses = async (): Promise<Course[]> => {
    const file = await fs.readFile(process.cwd() + '/exampleClassesJson.json', 'utf8');
    const courses = JSON.parse(file);

    const supabase = createServerComponentClient({
        cookies: cookies
    });

    const {
        data: {
            session
        }
    } = await supabase.auth.getSession();

    if (!session) { return [] }

    const { data, error } = await supabase.from('courses').select(`*, course_materials(*), course_policies(*), 
    course_grade_lines(*), course_grade_categories(*), grade_curve(*), course_lectures(*), course_labs(*),
    course_discussions(*), lead_by(*), course_teaching_assistants(*), course_office_hours(*), course_midterms(*),
    course_finals(*)`).eq('profile_id', session.user.id)
    .order('created_at', { ascending:false });

    if (error) {
        return [];
    }

    if (!data) {
        return [];
    }

    return (data as Course[]);
};

export default getUserCourses;
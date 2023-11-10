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

    const { data, error } = await supabase.from('courses').select("id, specifier, status").eq('profile_id', session.user.id)
    .order('created_at', { ascending:false });

    if (error) {
        return [];
    }

    if (!data) {
        return [];
    }

    return ([courses[0], ...data] as Course[]);
};

export default getUserCourses;
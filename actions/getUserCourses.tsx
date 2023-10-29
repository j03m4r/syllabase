import { Course } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/dist/client/components/headers";
import { promises as fs } from 'fs';

const getUserCourses = async (): Promise<Course[]> => {
    const file = await fs.readFile(process.cwd() + '/exampleClassesJson.json', 'utf8');
    const data = JSON.parse(file);

    const supabase = createServerComponentClient({
        cookies: cookies
    });

    const {
        data: {
            session
        }
    } = await supabase.auth.getSession();

    if (!session) { return data }

    // Insert Supabase query here to select all classes associated with user in active classes
    return data;
};

export default getUserCourses;
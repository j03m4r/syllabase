import { Course } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/dist/client/components/headers";
import { promises as fs } from 'fs';

const getCourseById = async (id: number): Promise<Course> => {
    const file = await fs.readFile(process.cwd() + '/exampleClassesJson.json', 'utf8');
    const data = JSON.parse(file);

    const supabase = createServerComponentClient({
        cookies: cookies
    });

    // Insert Supabase query here

    return data[id-1];
};

export default getCourseById;
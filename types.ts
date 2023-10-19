export interface Profile {
    id: string;
    username: string;
    avatar_url: string;
};

export interface CourseBare {
    id: number;
    course_type: string;
    course_number: string;
    prerequisites: Course[];
};

export interface CourseMaterial {
    id: number;
    name: string;
    description: string;
};

export interface CoursePolicy {
    id: number;
    title: string;
    description: string;
    quantity?: number;
};

export interface GradeLine {
    id: number;
    grade_name: string; // i.e. "A", "C-", ...
    upper_precentage: number; // "A" might not have an upper percentage
    lower_precentage: number;
};

export interface GradeCategory {
    id: number;
    title: string;
    grade_precentage: number;
    quantity?: number;
    curved?: boolean;
};

export interface Grades {
    id: number;
    grade_lines: GradeLine[];
    grade_categories: GradeCategory[];
    lecture_exists: boolean;
    labs_exist: boolean;
    discussion_exists: boolean;
};

export interface DayOfWeek {
    id: number;
    name: string;
};

export interface CourseEvent {
    id: number;
    lead_by_name: number; // Foreign id key to Enployee entry
    day_of_week: DayOfWeek;
    start_time: string;
    end_time: string;
};

export interface KeyDate {
    id: number;
    title: string;
    description?: string;
    date: string;
    start_time?: string;
    end_time?: string;
};

export interface Employee {
    id: number;
    name: string;
    role: string;
    description?: string;
    hours?: string;
    email?: string;
    phone_number?: string;
    website?: string;
};

export interface Course {
    id: number;
    full_class_title?: string;
    class_description?: string;
    course: CourseBare;
    required_materials: CourseMaterial[];
    policies: CoursePolicy[];
    grades: Grades;
    schedule: {
        office_hours: CourseEvent[],
        key_dates: KeyDate[]
    };
    staff: Employee[];
};

const myClass = <Course>{}; // You can check types on this example "class"
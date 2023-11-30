export interface Profile {
  id: string;
  username: string;
  avatar_url: string;
}

export interface SimpleDescriptor {
  id: number;
  name?: string;
  title?: string;
  description?: string;
  email?: string;
}

export interface CourseMaterial {
  id: number;
  title: string;
  description?: string;
}

export interface CoursePolicy {
  id: number;
  title: string;
  description: string;
}

export interface GradeLine {
  id: number;
  grade_name: string; // i.e. "A", "C-", ...
  upper_percentage: number; // "A" might not have an upper percentage
  lower_percentage: number;
}

export interface GradeCategory {
  id: number;
  name: string;
  grade_percentage: number;
  num_drops?: number;
}

export interface DayOfWeek {
  id: number;
  name: string;
}

export interface Employee {
  id: number;
  name: string;
  email: string;
}

export interface GradeCurve {
  id: number;
  description: string;
}

export interface Event {
  id: number;
  title: string;
  lead_by: Employee[];
  day_of_week: DayOfWeek;
  start_time: string;
  end_time: string;
  start_date?: string;
  end_date?: string;
}

// export interface Course {
//     id: number;
//     full_title?: string;
//     specifier: string;
//     course_materials?: CourseMaterial[];
//     course_policies?: CoursePolicy[];
//     course_grade_lines: GradeLine[];
//     course_grade_categories: GradeCategory[];
//     grade_curve?: GradeCurve;
//     course_lectures: Event[];
//     course_labs?: Event[];
//     course_discussions?: Event[];
//     lead_by: Employee;
//     course_teaching_assistants?: Employee[];
//     course_office_hours?: Event[];
//     course_midterms?: Event[];
//     course_finals?: Event[];
//     raw_syllabus_text: string;
//     status: string;
// };
export interface Course {
  id: number;
  full_title?: string;
  specifier: string;
  course_materials?: string[];
  policies?: string[];
  grade_cutoffs: [string, number, number][];
  grade_categories: [string, number][];
  attendance: {
    labs_missed: number;
    discussions_missed: number;
    lectures_missed: number;
  }[];
  instructor: Employee;
  created_at: string;
  important_dates: string[];
  raw_syllabus_text: string;
  status: string;
}

const myClass = <Course>{}; // You can check types on this example "class"

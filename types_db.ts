export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      course_discussions: {
        Row: {
          course_id: number
          created_at: string
          event_id: number
        }
        Insert: {
          course_id?: number
          created_at?: string
          event_id: number
        }
        Update: {
          course_id?: number
          created_at?: string
          event_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "course_discussions_course_id_fkey"
            columns: ["course_id"]
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_discussions_event_id_fkey"
            columns: ["event_id"]
            referencedRelation: "events"
            referencedColumns: ["id"]
          }
        ]
      }
      course_finals: {
        Row: {
          course_id: number
          created_at: string
          event_id: number
        }
        Insert: {
          course_id?: number
          created_at?: string
          event_id: number
        }
        Update: {
          course_id?: number
          created_at?: string
          event_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "course_finals_course_id_fkey"
            columns: ["course_id"]
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_finals_event_id_fkey"
            columns: ["event_id"]
            referencedRelation: "events"
            referencedColumns: ["id"]
          }
        ]
      }
      course_grade_categories: {
        Row: {
          course_id: number
          created_at: string
          grade_category_id: number
        }
        Insert: {
          course_id?: number
          created_at?: string
          grade_category_id: number
        }
        Update: {
          course_id?: number
          created_at?: string
          grade_category_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "course_grade_categories_course_id_fkey"
            columns: ["course_id"]
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_grade_categories_grade_category_id_fkey"
            columns: ["grade_category_id"]
            referencedRelation: "grade_categories"
            referencedColumns: ["id"]
          }
        ]
      }
      course_grade_lines: {
        Row: {
          course_id: number
          created_at: string
          grade_line_id: number
        }
        Insert: {
          course_id?: number
          created_at?: string
          grade_line_id: number
        }
        Update: {
          course_id?: number
          created_at?: string
          grade_line_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "course_grade_lines_course_id_fkey"
            columns: ["course_id"]
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_grade_lines_grade_line_id_fkey"
            columns: ["grade_line_id"]
            referencedRelation: "grade_lines"
            referencedColumns: ["id"]
          }
        ]
      }
      course_labs: {
        Row: {
          course_id: number
          created_at: string
          event_id: number
        }
        Insert: {
          course_id?: number
          created_at?: string
          event_id: number
        }
        Update: {
          course_id?: number
          created_at?: string
          event_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "course_labs_course_id_fkey"
            columns: ["course_id"]
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_labs_event_id_fkey"
            columns: ["event_id"]
            referencedRelation: "events"
            referencedColumns: ["id"]
          }
        ]
      }
      course_lectures: {
        Row: {
          course_id: number
          created_at: string
          event_id: number
        }
        Insert: {
          course_id?: number
          created_at?: string
          event_id: number
        }
        Update: {
          course_id?: number
          created_at?: string
          event_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "course_lectures_course_id_fkey"
            columns: ["course_id"]
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_lectures_event_id_fkey"
            columns: ["event_id"]
            referencedRelation: "events"
            referencedColumns: ["id"]
          }
        ]
      }
      course_midterms: {
        Row: {
          course_id: number
          created_at: string
          event_id: number
        }
        Insert: {
          course_id?: number
          created_at?: string
          event_id: number
        }
        Update: {
          course_id?: number
          created_at?: string
          event_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "course_midterms_course_id_fkey"
            columns: ["course_id"]
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_midterms_event_id_fkey"
            columns: ["event_id"]
            referencedRelation: "events"
            referencedColumns: ["id"]
          }
        ]
      }
      course_office_hours: {
        Row: {
          course_id: number
          created_at: string
          event_id: number
        }
        Insert: {
          course_id?: number
          created_at?: string
          event_id: number
        }
        Update: {
          course_id?: number
          created_at?: string
          event_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "course_office_hours_course_id_fkey"
            columns: ["course_id"]
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_office_hours_event_id_fkey"
            columns: ["event_id"]
            referencedRelation: "events"
            referencedColumns: ["id"]
          }
        ]
      }
      course_policies: {
        Row: {
          course_id: number
          created_at: string
          policy_id: number
        }
        Insert: {
          course_id?: number
          created_at?: string
          policy_id: number
        }
        Update: {
          course_id?: number
          created_at?: string
          policy_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "course_policies_course_id_fkey"
            columns: ["course_id"]
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_policies_policy_id_fkey"
            columns: ["policy_id"]
            referencedRelation: "policies"
            referencedColumns: ["id"]
          }
        ]
      }
      course_teaching_assistants: {
        Row: {
          course_id: number
          created_at: string
          employee_id: number
        }
        Insert: {
          course_id?: number
          created_at?: string
          employee_id: number
        }
        Update: {
          course_id?: number
          created_at?: string
          employee_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "course_teaching_assistants_course_id_fkey"
            columns: ["course_id"]
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_teaching_assistants_employee_id_fkey"
            columns: ["employee_id"]
            referencedRelation: "employees"
            referencedColumns: ["id"]
          }
        ]
      }
      courses: {
        Row: {
          created_at: string
          full_title: string | null
          grade_curve: number | null
          id: number
          lead_by: number | null
          num_discussion_misses: number | null
          num_labs_dropped: number | null
          num_lecture_misses: number | null
          profile_id: string | null
          raw_syllabus_text: string | null
          specifier: string | null
          status: string | null
        }
        Insert: {
          created_at?: string
          full_title?: string | null
          grade_curve?: number | null
          id?: number
          lead_by?: number | null
          num_discussion_misses?: number | null
          num_labs_dropped?: number | null
          num_lecture_misses?: number | null
          profile_id?: string | null
          raw_syllabus_text?: string | null
          specifier?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string
          full_title?: string | null
          grade_curve?: number | null
          id?: number
          lead_by?: number | null
          num_discussion_misses?: number | null
          num_labs_dropped?: number | null
          num_lecture_misses?: number | null
          profile_id?: string | null
          raw_syllabus_text?: string | null
          specifier?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "courses_grade_curve_fkey"
            columns: ["grade_curve"]
            referencedRelation: "grade_curves"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "courses_lead_by_fkey"
            columns: ["lead_by"]
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "courses_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      days_of_week: {
        Row: {
          created_at: string
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      employees: {
        Row: {
          created_at: string
          email: string | null
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      events: {
        Row: {
          created_at: string
          day_of_week_id: number | null
          end_date: string | null
          end_time: string | null
          id: number
          lead_by: number | null
          start_date: string | null
          start_time: string | null
          title: string | null
        }
        Insert: {
          created_at?: string
          day_of_week_id?: number | null
          end_date?: string | null
          end_time?: string | null
          id?: number
          lead_by?: number | null
          start_date?: string | null
          start_time?: string | null
          title?: string | null
        }
        Update: {
          created_at?: string
          day_of_week_id?: number | null
          end_date?: string | null
          end_time?: string | null
          id?: number
          lead_by?: number | null
          start_date?: string | null
          start_time?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "events_day_of_week_id_fkey"
            columns: ["day_of_week_id"]
            referencedRelation: "days_of_week"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_lead_by_fkey"
            columns: ["lead_by"]
            referencedRelation: "employees"
            referencedColumns: ["id"]
          }
        ]
      }
      grade_categories: {
        Row: {
          created_at: string
          grade_precentage: number | null
          id: number
          name: string | null
          num_drops: number | null
        }
        Insert: {
          created_at?: string
          grade_precentage?: number | null
          id?: number
          name?: string | null
          num_drops?: number | null
        }
        Update: {
          created_at?: string
          grade_precentage?: number | null
          id?: number
          name?: string | null
          num_drops?: number | null
        }
        Relationships: []
      }
      grade_curves: {
        Row: {
          created_at: string
          description: string | null
          id: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
        }
        Relationships: []
      }
      grade_lines: {
        Row: {
          created_at: string
          grade_name: string | null
          id: number
          lower_precentage: number | null
          upper_precentage: number | null
        }
        Insert: {
          created_at?: string
          grade_name?: string | null
          id?: number
          lower_precentage?: number | null
          upper_precentage?: number | null
        }
        Update: {
          created_at?: string
          grade_name?: string | null
          id?: number
          lower_precentage?: number | null
          upper_precentage?: number | null
        }
        Relationships: []
      }
      materials: {
        Row: {
          created_at: string
          description: string | null
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      policies: {
        Row: {
          created_at: string
          description: string | null
          id: number
          title: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          title?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          title?: string | null
        }
        Relationships: []
      }
      profile_courses: {
        Row: {
          course_id: number
          created_at: string
          profile_id: string
        }
        Insert: {
          course_id: number
          created_at?: string
          profile_id: string
        }
        Update: {
          course_id?: number
          created_at?: string
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profile_courses_course_id_fkey"
            columns: ["course_id"]
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profile_courses_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          id: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          id: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          id?: string
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

import { InvocationContext } from "@azure/functions";
import { SupabaseClient, createClient } from "@supabase/supabase-js";

export const getRawSyllabusText = async (
  courseId: string,
  context: InvocationContext,
  client: SupabaseClient
) => {
  try {
    const { data, error } = await client
      .from("courses")
      .select()
      .eq("id", parseInt(courseId));

    if (error) {
      throw error;
    }
    if (data.length === 0 || !data[0].raw_syllabus_text) {
      throw new Error("No raw syllabus text found");
    }
    return data[0].raw_syllabus_text;
  } catch (error) {
    context.error("Supabase course lookup failed with:", error.message);
    throw error;
  }
};

export const updateFields = async (
  courseId: string,
  parsed: Record<string, unknown>,
  client: SupabaseClient,
  context: InvocationContext
) => {
  const updatedForeignField = async (
    table: string,
    updated: Record<string, unknown>,
    id: string
  ) => {
    try {
      const { data, error } = await client.from(table).update(updated);
      if (error) {
        throw error;
      }

    } catch (error) {
      context.error("Supabase course lookup failed with:", error.message);
      throw error;
    }
  };

  const id = await updatedForeignField("courses", parsed, courseId);
  const { error } = await client
    .from("courses")
    .update({
      ...parsed,
      instructor: {
        name: "John Doe",
        email: "johndoe@example.com",
      },
    })
    .eq("id", parseInt(courseId));

  if (error) {
    throw error;
  } else {
    console.log("updated");
  }
};

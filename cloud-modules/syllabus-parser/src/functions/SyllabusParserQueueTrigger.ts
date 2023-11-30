import { app, InvocationContext } from "@azure/functions";
import { getRawSyllabusText, updateFields } from "../utils/data";
import { parseSyllabus } from "../utils/gpt";
import { createClient } from "@supabase/supabase-js";
import { validateQueueItem } from "../utils/validation";
const supabaseKey = process.env["SUPABASE_KEY"];
const supabseUrl = process.env["SUPABASE_ENDPOINT"];

export async function SyllabusParserQueueTrigger(
  queueItem: unknown,
  context: InvocationContext
): Promise<void> {
  console.log(1);
  context.log("processing queue item", queueItem);
  try {
    const { courseId } = validateQueueItem(queueItem);
    const supabase = createClient(supabseUrl, supabaseKey);
    const unparssedSyllabus = await getRawSyllabusText(
      courseId,
      context,
      supabase
    );
    const parsed = await parseSyllabus(unparssedSyllabus, context, courseId, supabase);

    // await updateFields(courseId, parsed, supabase, context);
    context.log("Result:", parsed);
  } catch (error) {
    context.error("Error encountered:", error.message);
    throw error;
  }
}

app.storageQueue("SyllabusParserQueueTrigger", {
  queueName: "syllabus-parser-queue",
  connection: "AzureWebJobsStorage",
  handler: SyllabusParserQueueTrigger,
});

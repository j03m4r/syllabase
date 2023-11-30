import { app, InvocationContext } from "@azure/functions";
type queueItem = {
  id: string;
};
export async function SyllabusParserQueuePoisonTrigger(
  queueItem: queueItem,
  context: InvocationContext
): Promise<void> {
  try {
    // TODO - update the course in supabase with the error and status failed
    context.log("failed item:", queueItem);
  } catch (error) {
    context.error("Error encountered:", error.message);
    throw error;
  }
}

app.storageQueue("SyllabusParserQueuePoisonTrigger", {
  queueName: "syllabus-parser-queue-poison",
  connection: "AzureWebJobsStorage",
  handler: SyllabusParserQueuePoisonTrigger,
});


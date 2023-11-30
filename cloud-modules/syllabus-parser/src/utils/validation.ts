type queueItem = {
  courseId: string;
};
export const validateQueueItem = (queueItem: unknown) => {
  try {
    switch (queueItem) {
      case undefined || null:
        throw new Error("No queue item found");
      case typeof queueItem !== "object":
        throw new Error("Queue item is not an object");
      case !queueItem.hasOwnProperty("courseId"):
        throw new Error("Queue item does not have an id");
      default:
        return queueItem as queueItem;
    }
  } catch (error) {
    console.log(`Queue item validation failed with: ${error.message}`);
  }
};

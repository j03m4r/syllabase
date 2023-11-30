'use server';
import { QueueServiceClient } from "@azure/storage-queue";

export const pushRawSyllabus = async (courseId: string) => {
  try {
    const connnectionString = process.env.AZURE_STORAGE_CONNECTION_STRING || "";
    const queueServiceClient = QueueServiceClient.fromConnectionString(
      connnectionString
    );
    const queueClient = queueServiceClient.getQueueClient(
      "syllabus-parser-queue"
    );
 

    const queueResponse = await queueClient.createIfNotExists();
    console.log(
      `Queue created successfully, service assigned request Id: ${queueResponse.requestId}`
    );

    const base64CourseId = jsonToBase64({courseId})

    const sendMessageResponse = await queueClient.sendMessage(base64CourseId);
    console.log(
      `Sent message successfully, service assigned message Id: ${sendMessageResponse.messageId}, service assigned request Id: ${sendMessageResponse.requestId}`
    );
    return "success";
  } catch (err) {
    return `failed with error: ${err}`;
  }
};
   function jsonToBase64(jsonObj: object) {
        const jsonString = JSON.stringify(jsonObj)
        return  Buffer.from(jsonString).toString('base64')
    }
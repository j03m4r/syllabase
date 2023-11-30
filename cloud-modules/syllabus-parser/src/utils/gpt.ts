import { InvocationContext } from "@azure/functions";
import { SupabaseClient } from "@supabase/supabase-js";
const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");
const endpoint = process.env["AZURE_OPENAI_ENDPOINT"];
const azureApiKey = process.env["AZURE_OPENAI_KEY"];
const deploymentId = "syllabse3";

const questions = [
  // 1. Provide the full title or specifier and code of the class. 2. Extract the lead instructor's name and email. 3. Provide a course description. 4. Provide the grade cutoffs including the letter grade, lower bound, and upper bound for each cutoff as numbers only. 5. Extract the required course materials. 6. Extract course policies or rules. 7. What are the grade categories (ex. tests, quizzes, homework, etc) and their corresponding percentage of the grade. 8. What are some important dates and what it is? 9. When is the final exam? 10.Who are the teaching assistants and what are their emails? 11. What are 5 helpful insights that will help you get a good grade?
  {
    field_name: "full_title",
    table: "",
    question:
      "What is the full title of the course? ex. Algorithms and Data Structures",
    foreign: false,
    fields: [],
    force_array: false
  },
  {
    field_name: "instructor",
    table: "staff",
    question: "What is instructor's name and their email?",
    foreign: true,
    fields: ["name", "email"],
    force_array: false
  },
  {
    field_name: "description",
    table: "",
    question: "What is the course description?",
    foreign: false,
    fields: [],
    force_array: false
  },
  {
    field_name: "policies",
    table: "",
    question: "What are some of the course policies?",
    foreign: false,
    fields: [],
    force_array: true
  },
  {
    field_name: "grade_categories",
    table: "",
    question: "What are the grade categories and their corresponding percentage? ex. [homework, 20]",
    foreign: false,
    fields: [],
    force_array: true
  },
  {
    field_name: "important_dates",
    table: "",
    question: "What are the important dates and what it is? ex. midterm, final, etc",
    foreign: false,
    fields: [],
    force_array: true
  },
  {
    field_name: "course_materials",
    table: "",
    question: "What is the list of required course materials?",
    foreign: false,
    fields: [],
    force_array: true
  },
  {
    field_name: "grade_cutoffs",
    table: "",
    question:
      "What are the grade cutoffs for each letter grade and its respective lower bound, and upper bound for each cutoff as numbers only in the form [[letter_grade, upper_bound, lower_bound]]?",
    foreign: false,
    fields: [],
    force_array: true
  },
];
export const parseSyllabus = async (
  rawSyllabus: string,
  context: InvocationContext,
  courseId: string,
  supabaseClient: SupabaseClient
) => {
  try {
    const client = new OpenAIClient(
      endpoint,
      new AzureKeyCredential(azureApiKey)
    );
    let formattedQuestions = questions
      .map((question, i) => `${question.question}`)
      .join(" ");

    const messages = [
      {
        role: "system",
        content:
          "You are an AI syllabus parser. Your task is to extract specific information from a provided syllabus.",
      },
      {
        role: "system",
        content:
          "For each question asked, provide the answers in a simple array format for example [[answer], [answer, answer], [answer, answer]]. Do not include any extraneous information or commentary. If you cannot find the information, return an empty list.",
      },
      {
        role: "system",
        content:
          "If a single question requires multiple pieces of information from the syllabus, include all relevant pieces in the list, in the order they were asked for. Each question should have its own array within a larger array of all questions.",
      },
      { role: "user", content: `Here is the syllabus: '${rawSyllabus}'` },
      {
        role: "user",
        content: `Questions: ${formattedQuestions} If a single question requires multiple pieces of information from the syllabus, include all relevant pieces in the array, in the order they were asked for. Each question should have its own array within a larger array of all questions. It ABSOLUTELY MUST be in the form for example [[answer1], [answer1, answer2], [answer1, answer2]]. `,
      },
    ];

    const options = {
      topP: .25,
      frequency_penalty: 0,
      presence_penalty: 0,
      max_tokens: 10000,
      stop: null,
    };

    const result = await client.getChatCompletions(
      deploymentId,
      messages,
      options
    );

    try {
      const updatedForeignField = async (
        table: string,
        updated: Record<string, unknown>,
        id: string
      ) => {
        try {
          console.log("doc we will insert:", updated);
          console.log(table, updated, id);
          const { data, error } = await supabaseClient
            .from(table)
            .update(updated)
            .eq("id", id);
          if (error) {
            throw new Error(
              `Supabase course lookup failed with: ${error.message}`
            );
          }
          console.log("result of insert:", data);
        } catch (error) {
          context.error("Supabase course lookup failed with:", error.message);
          throw error;
        }
      };

      let filtered = result.choices[0].message.content;
      //   console.log(filtered[2])
      let parsed = JSON.parse(filtered);
      context.log("result of json.parse: ", parsed);
      let filledDocument = {};

      for (let i = 0; i < questions.length; i++) {
        let question = questions[i];
        let answer = parsed[i];
        if (question.foreign) {
          let newobj = {};
          for (let j = 0; j < question.fields.length; j++) {
            let field = question.fields[j];
            newobj[field] = answer[j];
          }
          const { data, error } = await supabaseClient
            .from("courses")
            .select()
            .eq("id", parseInt(courseId));
          if (error) {
            throw error;
          }
          await updatedForeignField(
            question.table,
            newobj,
            data[0][question.field_name]
          );
        } else {
          if (answer.length === 1) {
           if (!question.force_array) {
              answer = answer[0];
            }
          } else if (answer.length === 0) {
       
          }
          filledDocument[question.field_name] = answer;
        }
      }
      console.log("filled document:", filledDocument);
      // let parsed = JSON.parse(filtered);

      // console.log(JSON.stringify(filtered, null, 2));

      const { error } = await supabaseClient
        .from("courses")
        .update({...filledDocument, status: "active"})
        .eq("id", parseInt(courseId));

      if (error) {
        throw new Error(`failed to insert updated document: ${error.message}`);
      } else {
        console.log("updated");
      }
    } catch (error) {
      throw new Error(`Couldnt parse raw json: ${error}`);
    }
  } catch (error) {
    context.error("Syllabus parsing failed with:", error);
    throw error;
  }
};

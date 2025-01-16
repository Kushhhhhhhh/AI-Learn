import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { connectToDB } from "@/utils/db";
import History from "@/models/history";
import { getAuth } from "@clerk/nextjs/server";

const apiKey = process.env.GEMINI_API_KEY as string;

export const POST = async (req: NextRequest) => {
  try {

    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in to proceed." },
        { status: 401 }
      );
    }

    const { topic, difficulty } = await req.json();

    if (!topic || !difficulty) {
      return NextResponse.json(
        { error: "Topic and difficulty are required." },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp",
    });

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    };

    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {
              text: `You are an intelligent AI tutor specializing in generating topic-based quiz questions to help users learn and test their knowledge. Generate a JSON response that strictly adheres to the following format, with no additional text or explanation before or after the JSON block:

{
  "questions": [
    {
      "question": "Question text",
      "options": {
        "A": "Option A",
        "B": "Option B",
        "C": "Option C",
        "D": "Option D"
      },
      "correctAnswer": "A"
    },
    {
      "question": "Another question text",
      "options": {
        "A": "Option A",
        "B": "Option B",
        "C": "Option C",
        "D": "Option D"
      },
      "correctAnswer": "B"
    }
    // Add more questions as required
  ]
}

**Instructions**:
1. The JSON should contain at least 10 multiple-choice questions (MCQs).
2. Each question must have:
   - A clear and concise "question" field.
   - Four "options" labeled as "A", "B", "C", and "D".
   - A "correctAnswer" field that specifies the correct option (e.g., "A").
3. Do not include any unnecessary information, explanations, or formatting outside the JSON structure.
4. The content must be aligned with the following parameters:
   - **Topic**: {Insert the topic dynamically, e.g., "Machine Learning"}.
   - **Difficulty**: {Insert the difficulty dynamically, e.g., "Intermediate"}.

Strictly adhere to this structure to ensure compatibility with the application.
`,
            },
          ],
        },
      ],
    });

    const result = await chatSession.sendMessage("Generate the question paper.");
    const responseText = result.response.text();

    const cleanResponse = responseText
      .replace(/```json|```/g, '')
      .trim();

    try {
      const parsedResponse = JSON.parse(cleanResponse);

      if (!parsedResponse.questions || !Array.isArray(parsedResponse.questions)) {
        throw new Error("Invalid response format. 'questions' array is missing or malformed.");
      }

      await connectToDB();

      const historyEntry = new History({
        userId,
        type: "Quiz",
        query: topic,
        response: parsedResponse,
        createdAt: new Date(),
      });

      await historyEntry.save();

      return NextResponse.json(parsedResponse);

    } catch (error) {
      console.error("Error Parsing AI Response:", error);
      return NextResponse.json(
        { error: "Error Parsing AI Response" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Internal server error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
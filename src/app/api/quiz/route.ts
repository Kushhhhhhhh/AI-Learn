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

    const prompt = `You are an intelligent AI tutor specializing in generating topic-based multiple-choice questions (MCQs) to help users learn and test their knowledge. Generate a JSON response that strictly adheres to the following format, with no additional text or explanation before or after the JSON block:

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
    }
    // Add 9 more questions
  ]
}

Instructions:
1. Generate exactly 10 multiple-choice questions based on the provided topic and difficulty level.
2. Each question must include:
   - A clear and concise 'question' field.
   - Four distinct options labeled as 'A', 'B', 'C', and 'D'.
   - A 'correctAnswer' field indicating the correct option (e.g., 'C').
3. **Ensure that all options are similar in length** to avoid guessability based on option length.
4. **Randomize the position of the correct answer across A, B, C, and D** — do not favor any one letter.
5. The incorrect options should be **plausible but incorrect**, encouraging critical thinking.
6. Avoid repetition of words or phrases across multiple options in the same question.
7. All questions must be directly relevant to the given topic and align with the specified difficulty level.
8. The JSON structure must be valid, parsable, and contain no additional text or comments.

Parameters:
- Topic: \${topic}
- Difficulty: \${difficulty}`;

    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    const result = await chatSession.sendMessage(
      "Generate the question paper based on the given topic and difficulty level only."
    );
    const responseText = result.response.text();

    const cleanResponse = responseText.replace(/```json|```/g, "").trim();

    try {
      const parsedResponse = JSON.parse(cleanResponse);

      if (
        !parsedResponse.questions ||
        !Array.isArray(parsedResponse.questions) ||
        parsedResponse.questions.length !== 10
      ) {
        throw new Error(
          "Invalid response format. 'questions' array is missing, malformed, or does not contain exactly 10 questions."
        );
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
        { error: "Error Parsing AI Response. Please try again." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Internal server error:", error);
    return NextResponse.json(
      { error: "Internal Server Error. Please try again later." },
      { status: 500 }
    );
  }
};
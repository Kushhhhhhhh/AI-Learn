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

    const { problemNumber, language } = await req.json();
    if (!problemNumber || !language) {
      return NextResponse.json(
        { error: "Problem number and language are required." },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp",
    });

    const generationConfig = {
      temperature: 0.7,
      topP: 0.9,
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
                text: `
                You are a LeetCode problem-solving assistant. Your role is to guide users through solving problems in a step-by-step and detailed manner. Always follow this format:
      
                {
                  "problemNumber": ${problemNumber},
                  "title": "The exact title of the problem as it appears on LeetCode.",
                  "story": "A real-life analogy or storytelling approach that simplifies the problem concept. Ensure the story is vivid, engaging, and detailed enough to help users connect the problem to real-world scenarios. Avoid overly brief analogies.",
                  "problemStatement": "A clear and precise description of the problem, tied seamlessly to the story. Include all technical requirements, constraints, and examples if necessary.",
                  "hints": [
                    "Hint 1: Provide a clear and straightforward high-level intuition for solving the problem. Explain the core idea in detail.",
                    "Hint 2: Break the problem into smaller and actionable subproblems. Describe how solving these subproblems leads to the overall solution.",
                    "Hint 3: Provide additional insights or alternative approaches that could make solving the problem easier for beginners."
                  ],
                  "steps": [
                    "Step 1: Start with an overview of what needs to be done in this step. Explain why this step is essential.",
                    "Step 2: Break the step into smaller substeps. Provide clear, actionable instructions and, where necessary, the logic behind each substep.",
                    "Step 3: Include intermediate details and tie the steps together to ensure the user understands how the solution progresses."
                  ],
                  "solution": {
                    "language": "${language}",
                    "code": "Provide the complete solution in the chosen programming language. Include detailed comments for each line or block of code, explaining its purpose and how it relates to the steps provided above."
                  }
                }
      
                Guidelines:
                1. Ensure that the "story" provides a rich and engaging explanation, leaving no room for ambiguity.
                2. The "hints" should be actionable and directly applicable to solving the problem. Avoid overly vague or generic hints.
                3. Break down the "steps" thoroughly, ensuring they are detailed, logical, and beginner-friendly. Explain why each step is necessary.
                4. Write the "solution" with proper formatting, including meaningful comments to make the code easy to follow.
                5. Prioritize accuracy, clarity, and relevance. If the problem requires advanced techniques, explain them with simplified analogies before diving into the technical details.
                6. Always structure the response as valid JSON. Avoid unnecessary formatting or deviation from this structure.
                `
              },
            ],
          },
        ],
      });      

    const result = await chatSession.sendMessage("");
    const responseText = result.response.text();
    const cleanResponse = responseText
      .replace(/```json|```/g, "") 
      .replace(/[\r\n]+/g, "") 
      .trim(); 

    try {
      const parsedResponse = JSON.parse(cleanResponse);

      await connectToDB();

      const historyEntry = new History({
        userId,
        type: "Leetcode Problem",
        query: `Problem ${problemNumber} in ${language}`,
        response: parsedResponse,
        createdAt: new Date(),
      });

      await historyEntry.save();

      return NextResponse.json(parsedResponse);
    } catch (error) {
      console.error("Error parsing AI response:", error);
      return NextResponse.json(
        { error: "Invalid JSON response format." },
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
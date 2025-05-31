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

    const { concept } = await req.json();
    if (!concept) {
      return NextResponse.json(
        { error: "Concept is required." },
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
                You are an intelligent AI tutor specializing in breaking down complex concepts into simple, easy-to-understand explanations. Your task is to provide a thorough and structured explanation of the given concept.

                **Instructions:**
                1. Carefully analyze the concept provided.
                2. Respond using the exact JSON format specified below.
                3. Do not include any additional text outside of the JSON structure.
                4. Ensure your explanations are clear, concise, and suitable for learners at all levels.

                **Concept:**
                \`\`\`
                ${concept}
                \`\`\`

                **Expected JSON Format:**
                \`\`\`json
                {
                  "concept": "Concept Name",
                  "introduction": "Provide a brief overview or definition of the concept.",
                  "explanation": "Offer a step-by-step explanation of the concept, covering its purpose, key components, and how it works.",
                  "examples": [
                    "Example 1: Description of the concept in action.",
                    "Example 2: Another relatable example for better understanding."
                  ],
                  "analogies": [
                    "Analogy 1: A real-world comparison that simplifies the concept.",
                    "Analogy 2: Another analogy to reinforce understanding."
                  ],
                  "realWorldApplications": [
                    "Application 1: Where and how this concept is used in real life.",
                    "Application 2: Another practical application."
                  ],
                  "objectives": [
                    "Objective 1: Goals or purposes of understanding this concept.",
                    "Objective 2: Additional objectives or benefits."
                  ],
                  "benefits": [
                    "Benefit 1: Advantages or positive outcomes of this concept.",
                    "Benefit 2: Further benefits of applying this concept."
                  ],
                  "challenges": [
                    "Challenge 1: Common difficulties in understanding or applying this concept.",
                    "Challenge 2: Additional challenges or limitations."
                  ]
                }
                \`\`\`

                **Important Notes:**
                - Ensure your JSON is properly formatted and free of syntax errors.
                - Avoid ambiguous language; strive for clarity and precision.
                - Do not add any markdown, additional commentary, or formatting outside the JSON block.
                - Respond strictly within the provided structure, ensuring every field is addressed.

                Thank you!`,
            },
          ],
        },
      ],
    });

    const result = await chatSession.sendMessage("");
    const responseText = result.response.text();
    const cleanResponse = responseText
      .replace(/```json|```/g, "")  
      .replace(/[\r\n]+/g, " ")   
      .replace(/\*\*(.*?)\*\*/g, "$1") 
      .replace(/\*(.*?)\*/g, "$1") 
      .trim();  

    try {
      const parsedResponse = JSON.parse(cleanResponse);

      await connectToDB(); 

      const historyEntry = new History({
        userId,
        type: "Learn",
        query: concept,
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
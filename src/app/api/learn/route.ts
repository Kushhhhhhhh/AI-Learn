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
                You are an intelligent AI tutor specializing in breaking down concepts into simple, easy-to-understand explanations. Provide a thorough explanation of the following concept:
                
                Concept: ${concept}.
                
                Please respond with the following JSON structure:

                {
                  "concept": "Concept Name",
                  "introduction": "Brief overview or definition of the concept.",
                  "explanation": "Step-by-step explanation of the concept, including its purpose and key components.",
                  "examples": [
                    "Description of the concept in action.",
                    "Another relatable example."
                  ],
                  "analogies": [
                    "A real-world comparison that simplifies the concept.",
                    "Another analogy to reinforce understanding."
                  ],
                  "realWorldApplications": [
                    "Where and how this concept is used in real life.",
                    "Another application of the concept."
                  ],
                  "objectives": [
                    "The goals or purpose of understanding this concept.",
                    "Additional key objectives."
                  ],
                  "benefits": [
                    "The advantages or positive outcomes of this concept.",
                    "Further benefits of applying this concept."
                  ],
                  "challenges": [
                    "Common difficulties in understanding or applying this concept.",
                    "Additional challenges or limitations."
                  ]
                }

                Ensure that the output is in the exact JSON format above. Do not include any other text outside of this JSON format.
              `,
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
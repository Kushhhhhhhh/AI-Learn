import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { connectToDB } from "@/utils/db";
import History from "@/models/history";
import { getAuth } from "@clerk/nextjs/server";

const apiKey = process.env.GEMINI_API_KEY as string;

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = getAuth(req);

    // Check if the user is authenticated
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in to proceed." },
        { status: 401 }
      );
    }

    // Parse the request body
    const { topic, genre } = await req.json();

    // Validate the input
    if (!topic || !genre) {
      return NextResponse.json(
        { error: "Topic and genre are required." },
        { status: 400 }
      );
    }

    // Initialize Gemini AI
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp",
    });

    // Define the generation configuration
    const generationConfig = {
      temperature: 0.8, // Adjust for creativity
      topP: 0.9,
      topK: 40,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    };

    // Define the prompt for story generation
    const prompt = `
You are a creative storyteller AI. Your task is to generate an engaging and immersive short story using the structure below.

Input:
- Topic: \${topic}
- Genre: \${genre}

Story Requirements:
1. The story should be between 500–1000 words and appropriate for a general audience.
2. It must include:
   - A short, catchy title.
   - A clear introduction that sets the scene.
   - A list of characters with names and brief bios.
   - A full story written in a narrative style (third person preferred).
   - A separate list of playful or meaningful dialogue snippets between the characters.
   - A satisfying conclusion that wraps up the plot.

Output Format (respond only in valid JSON):

{
  "title": "Title of the story",
  "characters": [
    {
      "name": "Character Name",
      "description": "Short bio about the character"
    }
  ],
  "introduction": "Set the scene in 2–3 lines",
  "story": "Full narrative of the story with beginning, middle, and end. Make it immersive and coherent.",
  "dialogue": [
    "Character A: Dialogue line...",
    "Character B: Reply line..."
  ],
  "conclusion": "Summarize the ending and the lesson or resolution"
}

Make sure the JSON is valid, and all sections are balanced in detail and tone.
`;

    // Start the chat session with Gemini AI
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    // Send the message to Gemini AI
    const result = await chatSession.sendMessage("");
    const responseText = result.response.text();

    // Clean the response (remove markdown formatting and extra spaces)
    const cleanResponse = responseText
      .replace(/```json|```/g, "")
      .replace(/[\r\n]+/g, "")
      .trim();

    try {
      // Parse the response into JSON
      const parsedResponse = JSON.parse(cleanResponse);

      // Save the story to the database
      await connectToDB();
      const historyEntry = new History({
        userId,
        type: "Story",
        query: topic, 
        response: parsedResponse,
        createdAt: new Date(),
      });
      await historyEntry.save();

      // Return the story as a JSON response
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
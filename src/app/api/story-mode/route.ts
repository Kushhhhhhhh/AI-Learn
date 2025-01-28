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
      You are a creative storyteller AI. Your task is to generate an engaging and immersive story based on the following topic and genre:

      Topic: ${topic}
      Genre: ${genre}

      The story should include the following elements:
      1. A captivating introduction that sets the scene.
      2. Well-developed characters relevant to the topic and genre.
      3. A clear plot with a beginning, middle, and end.
      4. Dialogue that feels natural and advances the story.
      5. A satisfying conclusion that ties everything together.

      Ensure the story is appropriate for a general audience and aligns with the provided genre. The story should be between 500-1000 words.

      Respond with the story in the following JSON format:
      {
        "title": "A creative title for the story",
        "introduction": "A brief introduction to set the scene",
        "characters": [
          {
            "name": "Character Name",
            "description": "Brief description of the character"
          }
        ],
        "plot": {
          "beginning": "The setup and initial events",
          "middle": "The development and conflict",
          "end": "The resolution and conclusion"
        },
        "dialogue": [
          "Example dialogue between characters",
          "Another example of dialogue"
        ],
        "conclusion": "A satisfying ending to the story"
      }

      Do not include any additional text outside of the JSON format.
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
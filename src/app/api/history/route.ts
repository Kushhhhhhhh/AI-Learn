import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import History from "@/models/history";
import { getAuth } from "@clerk/nextjs/server";

export const GET = async (req: NextRequest) => {
  try {

    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in to proceed." },
        { status: 401 }
      );
    }

    await connectToDB();

    const userHistory = await History.find({ userId }).sort({ createdAt: -1 });

    if (userHistory.length === 0) {
      return NextResponse.json(userHistory.length ? userHistory : []);
    }

    return NextResponse.json(userHistory);

  } catch (error) {
    console.error("Error fetching history:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in to proceed." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const historyId = searchParams.get("_id");

    if (!historyId) {
      return NextResponse.json(
        { error: "_id is required to delete a history record." },
        { status: 400 }
      );
    }

    await connectToDB();

    const deletedHistory = await History.findOneAndDelete({ _id: historyId, userId });

    if (!deletedHistory) {
      const exists = await History.findById(historyId);
      if (!exists) {
        return NextResponse.json(
          { error: "History not found with the given _id." },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { error: "You don't have permission to delete this history record." },
        { status: 403 }
      );
    }

    return NextResponse.json({ message: "History deleted successfully." });
  } catch (error) {
    console.error("Error deleting history:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
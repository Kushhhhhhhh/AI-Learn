import { ApiResponse } from "./api-response";
import { Question } from "./question";
import { ResponseData } from "./leetcode";
import { Story } from "./story";

export type HistoryItem = {
  _id: string;
  type: "Learn" | "Quiz" | "Leetcode Problem" | "Story";
  query: string;
  createdAt: string;
  response: ApiResponse | { questions: Question[] } | ResponseData | Story | null;
  }
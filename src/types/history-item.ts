import { ApiResponse } from "./api-response";
import { Question } from "./question";
import { ResponseData } from "./leetcode";

export type HistoryItem = {
  _id: string;
  type: "Learn" | "Quiz" | "Leetcode Problem";
  query: string;
  createdAt: string;
  response: ApiResponse | { questions: Question[] } | ResponseData | null;
  }
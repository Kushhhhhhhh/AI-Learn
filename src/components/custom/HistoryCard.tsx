"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ConceptSheet from "@/components/sheets/concept-sheet";
import QuestionSheet from "@/components/sheets/question-sheet";
import LeetcodeSheet from "@/components/sheets/leetcode-sheet";
import StorySheet from "@/components/sheets/story-sheet";
import { ApiResponse } from "@/types/api-response";
import { ResponseData } from "@/types/leetcode";
import { Question } from "@/types/question";
import { Story } from "@/types/story"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, ChevronDown, ChevronUp, Trash, Loader2 } from "lucide-react";
import { format, isValid } from "date-fns";
import { HistoryItem } from "@/types/history-item";

const HistoryCard = ({
  item,
  index,
  isOpen,
  onToggle,
  onDelete,
}: {
  item: HistoryItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  onDelete: (_id: string) => void;
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isValid(date)) {
      return format(date, "PPpp");
    }
    return "Invalid Date";
  };

  const handleDelete = async (_id?: string) => {
    if (!_id) return; 
    setLoading(true);
    try {
      await onDelete(_id);
    } catch (error) {
      console.error("Error deleting history:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="bg-gray-800 border-gray-700 overflow-hidden">
        <CardHeader className="bg-gray-750 py-4">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">
                  {item.type}
                </h3>
                <p className="text-sm text-gray-400">
                  {formatDate(item.createdAt)}
                </p>
              </div>
            </div>
            <Button
              variant="destructive"
              disabled={loading}
              onClick={() => handleDelete(item._id)}
              className="text-red-200 hover:text-white transition-colors duration-200"
            >
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <Trash className="w-6 h-6" />
              )}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm md:text-lg font-medium text-gray-300">
              Concept: {item.query}
            </p>
            <Button
              variant="ghost"
              onClick={onToggle}
              className="text-white hover:text-blue-400 transition-colors duration-200"
            >
              {isOpen ? (
                <ChevronUp className="w-6 h-6" />
              ) : (
                <ChevronDown className="w-6 h-6" />
              )}
            </Button>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-zinc-950 rounded-lg"
              >
                {item.type === "Learn" && item.response ? (
                  <ConceptSheet response={item.response as ApiResponse} />
                ) : item.type === "Quiz" && item.response ? (
                  <QuestionSheet
                    questions={(item.response as { questions: Question[] }).questions}
                    selectedAnswers={{}}
                    handleOptionClick={() => {}}
                  />
                ) : item.type === "Leetcode Problem" && item.response ? (
                  <LeetcodeSheet response={item.response as ResponseData} />
                ) : item.type === "Story" && item.response ? (
                  <StorySheet story={item.response as Story} />
                ) : (
                  <p className="text-sm text-gray-500">
                    Unsupported or empty response.
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default HistoryCard;
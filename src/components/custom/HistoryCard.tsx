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
import { Story } from "@/types/story";
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
import { cn } from "@/lib/utils";

const TYPE_ICONS = {
  "Learn": "🧠",
  "Quiz": "❓",
  "Leetcode Problem": "💻",
  "Story": "📖"
};

const TYPE_COLORS = {
  "Learn": "bg-blue-500",
  "Quiz": "bg-purple-500",
  "Leetcode Problem": "bg-green-500",
  "Story": "bg-yellow-500"
};

export const HistoryCard = ({
  item,
  index,
  isOpen,
  onToggle,
  onDelete,
  isDeleting,
}: {
  item: HistoryItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  onDelete: (_id: string) => void;
  isDeleting: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isValid(date)) {
      return format(date, "MMM d, yyyy 'at' h:mm a");
    }
    return "Unknown date";
  };

  const handleDelete = async (e: React.MouseEvent, _id?: string) => {
    e.stopPropagation();
    if (!_id) return;
    try {
      await onDelete(_id);
    } catch (error) {
      console.error("Error deleting history:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.01 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative"
    >
      <Card 
        className={cn(
          "bg-gray-900 border-gray-700 overflow-hidden transition-all duration-200",
          isHovered && "shadow-lg shadow-blue-500/10",
          isOpen && "border-blue-500/30"
        )}
      >
        <CardHeader 
          className={cn(
            "py-3 px-4 cursor-pointer",
            isOpen ? "bg-gray-800" : "bg-gray-900"
          )}
          onClick={onToggle}
        >
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-xl",
                TYPE_COLORS[item.type as keyof typeof TYPE_COLORS] || "bg-gray-600"
              )}>
                {TYPE_ICONS[item.type as keyof typeof TYPE_ICONS] || "📚"}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-white">
                    {item.query}
                  </h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-700 text-gray-300">
                    {item.type}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  {formatDate(item.createdAt)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggle();
                }}
                className="text-gray-400 hover:text-blue-400 hover:bg-gray-800"
              >
                {isOpen ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => handleDelete(e, item._id)}
                disabled={isDeleting}
                className="text-gray-400 hover:text-red-400 hover:bg-gray-800 transition-colors"
              >
                {isDeleting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Trash className="w-5 h-5" />
                )}
              </Button>
            </div>
          </CardTitle>
        </CardHeader>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <CardContent className="p-0">
                <div className="border-t border-gray-800 p-4 bg-gray-950/50">
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
                    <div className="py-8 text-center text-gray-500">
                      No content available for this item
                    </div>
                  )}
                </div>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
};
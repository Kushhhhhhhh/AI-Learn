"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ConceptSheet from "@/components/custom/concept-sheet";
import QuestionSheet from "@/components/custom/question-sheet";
import { ApiResponse } from "@/types/api-response";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, ChevronDown, ChevronUp, Trash, Loader2 } from "lucide-react";
import { format, isValid } from "date-fns";
import { Question } from '@/types/question';
import { HistoryItem } from "@/types/history-item";

const HistoryCard = ({
  item,
  index,
  isOpen,
  onToggle,
  onDelete
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

  const handleDelete = async (_id: string) => {
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
                <h3 className="text-xl font-semibold text-white">{item.type}</h3>
                <p className="text-sm text-gray-400">{formatDate(item.createdAt)}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              onClick={onToggle}
              className="text-white hover:text-blue-400 transition-colors duration-200"
            >
              {isOpen ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
            </Button>

          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4 flex justify-between">
          <p className="text-lg font-medium text-gray-300 mb-4">Concept: {item.query}</p>
          <Button
            variant="destructive"
            disabled={loading}
            onClick={() => item._id && handleDelete(item._id)}
            className="text-red-200 hover:text-white transition-colors duration-200"
          >
           {loading ? (
              <Loader2 className="w-6 h-6 animate-spin" /> 
            ) : (
              <Trash className="w-6 h-6" />
            )}
          </Button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-zinc-950 rounded-lg"
              >
                {item.type === "Learn" ? (
                  <ConceptSheet response={item.response as ApiResponse} />
                ) : item.type === "Quiz" ? (
                  <QuestionSheet
                    questions={item.response.questions as Question[]}
                    selectedAnswers={{}}
                    handleOptionClick={() => { }}
                  />
                ) : (
                  <p className="text-sm text-gray-500">Unsupported type: {item.type}</p>
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
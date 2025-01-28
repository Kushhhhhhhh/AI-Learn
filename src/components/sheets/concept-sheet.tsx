'use client';

import { motion } from 'framer-motion';
import { ApiResponse } from '@/types/api-response';

interface ConceptSheetProps {
  response: ApiResponse;
}

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ConceptSheet({ response }: ConceptSheetProps) {
    

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="rounded-lg shadow-xl overflow-hidden"
    >
      <div className="p-6 space-y-8">
        <motion.h2 
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-3xl font-bold text-blue-200 mb-4"
        >
          {response.concept}
        </motion.h2>

        <Section title="Introduction" content={response.introduction} delay={0.3} />
        <Section title="Step-by-Step Explanation" content={response.explanation} delay={0.4} />
        <Section title="Examples" content={response.examples} isList delay={0.5} />
        <Section title="Analogies" content={response.analogies} isList delay={0.6} />
        <Section title="Real-World Applications" content={response.realWorldApplications} isList delay={0.7} />
        <Section title="Objectives" content={response.objectives} isList delay={0.8} />
        <Section title="Benefits" content={response.benefits} isList delay={0.9} />
        <Section title="Challenges" content={response.challenges} isList delay={1} />
      </div>
    </motion.div>
  );
}

interface SectionProps {
  title: string;
  content: string | string[];
  isList?: boolean;
  delay: number;
}

function Section({ title, content, isList = false, delay }: SectionProps) {
  return (
    <motion.div
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5, delay }}
      className="border-t border-gray-700 pt-6"
    >
      <h3 className="text-xl font-semibold text-gray-300 mb-3">{title}</h3>
      {isList ? (
        <ul className="list-disc pl-6 text-gray-400 space-y-2">
          {(content as string[]).map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400 whitespace-pre-wrap">{content as string}</p>
      )}
    </motion.div>
  );
}
import { motion } from 'framer-motion';

interface GlowCardProps {
  icon: React.ReactNode;
  title: string;
  content: string;
}

export const GlowCard = ({ icon, title, content }: GlowCardProps) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="relative p-6 bg-gradient-to-b from-indigo-950 to-black rounded-lg shadow-lg overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-b from-indigo-600 to-indigo-600 opacity-20"></div>
    <div className="relative z-10">
      <div className="flex items-center mb-4">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-indigo-800">
          {icon}
        </div>
        <h3 className="text-2xl font-semibold text-gray-200 ml-4">{title}</h3>
      </div>
      <p className="text-gray-300 leading-relaxed">{content}</p>
    </div>
    <div className="absolute inset-0 bg-indigo-500 blur-[100px] opacity-30"></div>
  </motion.div>
);
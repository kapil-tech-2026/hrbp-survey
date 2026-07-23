import React from 'react';
import { motion } from 'framer-motion';
import { useAssessmentStore } from '@/store/useAssessmentStore';
import { Button } from '../common/Button';

export const Page1Landing: React.FC = () => {
  const setCurrentPage = useAssessmentStore((state) => state.setCurrentPage);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="max-w-3xl mx-auto text-center space-y-8 py-10"
    >
      <div className="space-y-4">
        <span className="text-xs uppercase tracking-widest text-blue-600 font-bold bg-blue-50 px-3 py-1 rounded-full">
          Academic Research Survey
        </span>
        <h1 className="font-sans text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 leading-snug max-w-3xl mx-auto">
          Design and Evaluation of an Operational State Optimization Framework for HR Business Processes: A Decision Model for Determining the Optimal Operational State in the Era of Agentic AI
        </h1>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 shadow-sm text-gray-700 space-y-3">
        <p className="font-medium text-lg">
          Thank you for providing your invaluable time for this discussion.
        </p>
        <p className="text-sm text-gray-600">
          Your participation will help us better understand how HR processes can be optimized through different operational states—from manual execution to Agentic AI.
        </p>
      </div>

      <div className="pt-4">
        <Button size="lg" onClick={() => setCurrentPage(2)}>
          Next →
        </Button>
      </div>
    </motion.div>
  );
};
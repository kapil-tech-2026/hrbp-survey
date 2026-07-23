import React from 'react';
import { motion } from 'framer-motion';
import { useAssessmentStore } from '@/store/useAssessmentStore';
import { FeedbackData } from '@/lib/types';
import { Button } from '../common/Button';

export const Page8Feedback: React.FC = () => {
  const { feedback, setFeedback, setCurrentPage } = useAssessmentStore();

  const handleRatingClick = (
    field: keyof Omit<FeedbackData, 'comments'>,
    val: number
  ) => {
    setFeedback({ [field]: val });
  };

  const isFormValid =
    feedback.accuracyRating > 0 &&
    feedback.usefulnessRating > 0 &&
    feedback.clarityRating > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="max-w-2xl mx-auto space-y-6 py-6"
    >
      <div className="space-y-2 text-center sm:text-left">
        <span className="text-xs font-semibold text-blue-600 tracking-wider uppercase">
          Step 8 of 9
        </span>
        <h2 className="text-3xl font-bold text-gray-900">Framework Feedback</h2>
        <p className="text-gray-600 text-sm">
          Please rate the framework's recommendations and assessment process to help us refine the decision logic.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-6">
        {/* Recommendation Accuracy */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-gray-900">
            1. How accurate was the recommended target state for your selected process?
          </label>
          <div className="flex justify-between items-center max-w-sm gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleRatingClick('accuracyRating', star)}
                className={`flex-1 py-2 rounded-lg border text-sm font-bold transition-all ${
                  feedback.accuracyRating === star
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                }`}
              >
                {star}
              </button>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-400 max-w-sm px-1">
            <span>1 - Inaccurate</span>
            <span>5 - Highly Accurate</span>
          </div>
        </div>

        {/* Assessment Usefulness */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-gray-900">
            2. How useful was this assessment in evaluating your process automation potential?
          </label>
          <div className="flex justify-between items-center max-w-sm gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleRatingClick('usefulnessRating', star)}
                className={`flex-1 py-2 rounded-lg border text-sm font-bold transition-all ${
                  feedback.usefulnessRating === star
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                }`}
              >
                {star}
              </button>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-400 max-w-sm px-1">
            <span>1 - Not Useful</span>
            <span>5 - Very Useful</span>
          </div>
        </div>

        {/* Clarity */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-gray-900">
            3. How clear were the dimension descriptions and decision logic?
          </label>
          <div className="flex justify-between items-center max-w-sm gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleRatingClick('clarityRating', star)}
                className={`flex-1 py-2 rounded-lg border text-sm font-bold transition-all ${
                  feedback.clarityRating === star
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                }`}
              >
                {star}
              </button>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-400 max-w-sm px-1">
            <span>1 - Unclear</span>
            <span>5 - Crystal Clear</span>
          </div>
        </div>

        {/* Open Text Comments */}
        <div className="space-y-2">
          <label htmlFor="comments" className="block text-sm font-bold text-gray-900">
            4. Additional Comments or Feedback (Optional)
          </label>
          <textarea
            id="comments"
            rows={3}
            value={feedback.comments}
            onChange={(e) => setFeedback({ comments: e.target.value })}
            placeholder="Share any thoughts, edge cases, or suggested indicators..."
            className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900"
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between gap-3 pt-2">
        <Button variant="outline" onClick={() => setCurrentPage(7)}>
          ← Back to Results
        </Button>
        <Button onClick={() => setCurrentPage(9)} disabled={!isFormValid}>
          Continue to Demographics →
        </Button>
      </div>
    </motion.div>
  );
};
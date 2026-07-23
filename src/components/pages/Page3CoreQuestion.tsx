import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAssessmentStore } from '@/store/useAssessmentStore';
import { ProgressIndicator } from '../common/ProgressIndicator';
import { Button } from '../common/Button';

export const Page3CoreQuestion: React.FC = () => {
  const { page3Step, setPage3Step, setCurrentPage } = useAssessmentStore();

  const handleNextStep = () => {
    if (page3Step < 1) setPage3Step(page3Step + 1);
    else setCurrentPage(4);
  };

  const handleBackStep = () => {
    if (page3Step > 0) setPage3Step(page3Step - 1);
    else setCurrentPage(2);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 py-6">
      <ProgressIndicator totalSteps={2} currentStep={page3Step} />

      <AnimatePresence mode="wait">
        {page3Step === 0 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 text-center"
          >
            <h2 className="text-2xl font-bold text-gray-900">Let&apos;s Ask a Provocative Question</h2>
            <blockquote className="text-xl italic font-serif text-blue-900 bg-blue-50 p-6 rounded-xl border-l-4 border-blue-600">
              &quot;Should all HR processes be run by Agentic AI? Or at least fully automated?&quot;
            </blockquote>
            <p className="text-gray-700 leading-relaxed text-left">
              It&apos;s tempting to think &quot;yes.&quot; After all, AI is powerful. It&apos;s fast. It never sleeps.
            </p>
            <p className="text-gray-700 leading-relaxed text-left font-medium">
              But here&apos;s the thing—not all processes are created equal. Some are simple and predictable. Others are messy, human, and full of nuance.
            </p>
          </motion.div>
        )}

        {page3Step === 1 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-900">So What Really Matters?</h2>
            <p className="text-gray-700">When choosing an operational state, four key factors come into play:</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                <span className="font-bold text-blue-600">Complexity</span>
                <p className="text-xs text-gray-600 mt-1">How many steps? How many exceptions?</p>
              </div>
              <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                <span className="font-bold text-indigo-600">Structure</span>
                <p className="text-xs text-gray-600 mt-1">Is the process well-defined or highly variable?</p>
              </div>
              <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                <span className="font-bold text-amber-600">Variability</span>
                <p className="text-xs text-gray-600 mt-1">Does every case look different?</p>
              </div>
              <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                <span className="font-bold text-rose-600">Governance & Risk</span>
                <p className="text-xs text-gray-600 mt-1">What happens if something goes wrong?</p>
              </div>
            </div>

            <p className="text-gray-900 font-medium text-center pt-2">
              The right operational state depends on the <strong>process</strong>, not the <strong>technology</strong>.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-between pt-6 border-t border-gray-200">
        <Button variant="outline" onClick={handleBackStep}>
          ← Back
        </Button>
        <Button onClick={handleNextStep}>
          {page3Step === 1 ? 'Next →' : 'Continue →'}
        </Button>
      </div>
    </div>
  );
};
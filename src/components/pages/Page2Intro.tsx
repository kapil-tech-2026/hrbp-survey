import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAssessmentStore } from '@/store/useAssessmentStore';
import { ProgressIndicator } from '../common/ProgressIndicator';
import { Button } from '../common/Button';

export const Page2Intro: React.FC = () => {
  const { page2Step, setPage2Step, setCurrentPage } = useAssessmentStore();

  const handleNextStep = () => {
    if (page2Step < 2) setPage2Step(page2Step + 1);
    else setCurrentPage(3);
  };

  const handleBackStep = () => {
    if (page2Step > 0) setPage2Step(page2Step - 1);
    else setCurrentPage(1);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 py-6">
      <ProgressIndicator totalSteps={3} currentStep={page2Step} />

      <AnimatePresence mode="wait">
        {page2Step === 0 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-900">What is a &quot;Process&quot;?</h2>
            <p className="text-gray-700 leading-relaxed">
              A <strong>process</strong> is simply a sequence of tasks your team does regularly—the <em>what</em> of your daily work.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg space-y-2">
              <p className="font-semibold text-blue-900">Think of hiring a new employee:</p>
              <p className="text-sm text-blue-800 font-mono leading-relaxed">
                📝 Create job description → 📢 Post on job boards → 📥 Collect resumes → 🔍 Screen resumes → 🎯 Select top candidates → 🗣️ Conduct interviews → ✅ Recommend hire
              </p>
            </div>
            <p className="text-gray-600 text-sm">
              Most HR teams run dozens of these. But <em>how</em> they run them? That&apos;s where things get interesting.
            </p>
          </motion.div>
        )}

        {page2Step === 1 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-900">What is an &quot;Operational State&quot;?</h2>
            <p className="text-gray-700 leading-relaxed">
              An <strong>operational state</strong> is the <em>how</em>—the method you choose to get a process done.
            </p>
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg space-y-2">
              <p className="font-semibold text-amber-900">Think of it like transportation:</p>
              <p className="text-sm text-amber-800">
                You need to get from point A to point B (the <em>process</em>). You can walk, bike, drive, or take a train (the <em>operational state</em>).
              </p>
            </div>
            <p className="text-gray-600 text-sm">
              Each option has trade-offs. Speed, cost, effort, and suitability depend on the journey. Different processes work better with different operational states.
            </p>
          </motion.div>
        )}

        {page2Step === 2 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-900">The Four Operational States</h2>
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left font-medium text-gray-500">Icon</th>
                    <th className="px-3 py-2 text-left font-medium text-gray-500">State</th>
                    <th className="px-3 py-2 text-left font-medium text-gray-500">In Plain English</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  <tr>
                    <td className="px-3 py-3 text-xl">👤</td>
                    <td className="px-3 py-3 font-semibold text-gray-900">Manual</td>
                    <td className="px-3 py-3 text-gray-600">A person does every step. No automation.</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-3 text-xl">🤖</td>
                    <td className="px-3 py-3 font-semibold text-gray-900">RPA</td>
                    <td className="px-3 py-3 text-gray-600">Software bots handle repetitive, rule-based tasks.</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-3 text-xl">🧠</td>
                    <td className="px-3 py-3 font-semibold text-gray-900">AI-Assisted Workflow</td>
                    <td className="px-3 py-3 text-gray-600">AI suggests and supports, but humans stay in control.</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-3 text-xl">🚀</td>
                    <td className="px-3 py-3 font-semibold text-gray-900">Agentic AI</td>
                    <td className="px-3 py-3 text-gray-600">AI acts autonomously—it plans, decides, and executes with minimal human input.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-800 font-medium text-center">
              Which state is <em>right</em> for a given process? That&apos;s exactly what this assessment will help you discover.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-between pt-6 border-t border-gray-200">
        <Button variant="outline" onClick={handleBackStep}>
          ← Back
        </Button>
        <Button onClick={handleNextStep}>
          {page2Step === 2 ? 'Next →' : 'Continue →'}
        </Button>
      </div>
    </div>
  );
};
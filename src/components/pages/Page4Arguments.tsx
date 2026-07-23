import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAssessmentStore } from '@/store/useAssessmentStore';
import { ProgressIndicator } from '../common/ProgressIndicator';
import { Button } from '../common/Button';

export const Page4Arguments: React.FC = () => {
  const { page4Step, setPage4Step, setCurrentPage } = useAssessmentStore();

  const handleNextStep = () => {
    if (page4Step < 1) setPage4Step(page4Step + 1);
    else setCurrentPage(5);
  };

  const handleBackStep = () => {
    if (page4Step > 0) setPage4Step(page4Step - 1);
    else setCurrentPage(3);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 py-6">
      <ProgressIndicator totalSteps={2} currentStep={page4Step} />

      <AnimatePresence mode="wait">
        {page4Step === 0 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-900">
              Argument 1: Operational States Are Alternatives, Not a Ladder
            </h2>
            <div className="bg-slate-100 p-4 rounded-lg font-mono text-center text-sm text-gray-700">
              Manual → RPA → AI-Assisted → Agentic AI <span className="text-rose-600 font-bold">(Not a progression!)</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Agentic AI isn&apos;t &quot;better&quot; than RPA. It&apos;s just <em>different</em>.
            </p>
            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-r-lg space-y-2">
              <p className="font-semibold text-emerald-900">Think of choosing a vehicle:</p>
              <p className="text-sm text-emerald-800">
                A bicycle isn&apos;t &quot;worse&quot; than a truck. It&apos;s just better for some journeys and worse for others.
              </p>
            </div>
            <p className="text-gray-800 font-medium">
              Each operational state has strengths and trade-offs. The goal is to find the <strong>right fit</strong>—not the &quot;highest&quot; option.
            </p>
          </motion.div>
        )}

        {page4Step === 1 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-900">
              Argument 2: Process Characteristics Should Drive the Choice
            </h2>
            <blockquote className="text-lg font-semibold text-gray-800 border-l-4 border-blue-600 pl-4 py-1">
              The process itself should determine the operational state—not the hype around AI.
            </blockquote>
            <p className="text-gray-700">
              Over the next few steps, you&apos;ll assess a process across <strong>12 indicators</strong> looking at:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 bg-gray-50 p-4 rounded-lg">
              <li>How repeatable is it?</li>
              <li>How much judgement is required?</li>
              <li>How often do exceptions occur?</li>
              <li>How sensitive is the data involved?</li>
            </ul>
            <p className="text-gray-800 font-medium">
              These indicators will help us map the process to the <strong>right operational state</strong>—not the trendiest one.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-between pt-6 border-t border-gray-200">
        <Button variant="outline" onClick={handleBackStep}>
          ← Back
        </Button>
        <Button onClick={handleNextStep}>
          {page4Step === 1 ? 'Next →' : 'Continue →'}
        </Button>
      </div>
    </div>
  );
};
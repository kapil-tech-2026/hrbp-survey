import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAssessmentStore } from '@/store/useAssessmentStore';
import { saveToGoogleDoc } from '@/lib/googleDocsClient';
import { calculateDimensionScores, evaluateDecisionRules } from '@/lib/decisionEngine';
import { Button } from '../common/Button';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export const Page9Demographics: React.FC = () => {
  const {
    demographics,
    setDemographics,
    selectedProcess,
    customProcessDescription,
    indicatorScores,
    feedback,
    setCurrentPage,
    resetAssessment,
  } = useAssessmentStore();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const processName = selectedProcess === 'Other' ? customProcessDescription : selectedProcess;
  const dimensionScores = calculateDimensionScores(indicatorScores);
  const { recommendedState } = evaluateDecisionRules(dimensionScores);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const payload = {
      target_process: processName,
      process_category: selectedProcess,
      indicator_scores: indicatorScores,
      dimension_scores: dimensionScores,
      recommended_state: recommendedState,
      feedback: feedback,
      demographics: demographics,
      created_at: new Date().toISOString(),
    };

    try {
      await saveToGoogleDoc(payload);
      setSubmitSuccess(true);
    } catch (err: any) {
      console.error('Google Docs submission error:', err);
      setErrorMessage('Failed to save response to Google Doc. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg mx-auto py-12 text-center space-y-6 bg-white border border-gray-200 rounded-2xl p-8 shadow-sm"
      >
        <div className="flex justify-center">
          <CheckCircle2 className="w-16 h-16 text-emerald-500" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">Thank You!</h2>
          <p className="text-gray-600 text-sm">
            Your evaluation and feedback have been successfully appended to the Google Doc.
          </p>
        </div>
        <div className="pt-4 flex justify-center gap-3">
          <Button variant="outline" onClick={() => setCurrentPage(7)}>
            View Results Summary
          </Button>
          <Button onClick={resetAssessment}>
            Start New Assessment
          </Button>
        </div>
      </motion.div>
    );
  }

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
          Final Step (9 of 9)
        </span>
        <h2 className="text-3xl font-bold text-gray-900">Professional Context</h2>
        <p className="text-gray-600 text-sm">
          Please share a few optional background details to help us analyze decision trends across industry roles.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-6">
        {/* Role */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-gray-900">
            Professional Role / Title
          </label>
          <select
            value={demographics.role}
            onChange={(e) => setDemographics({ role: e.target.value })}
            className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900"
          >
            <option value="">Select your role...</option>
            <option value="HR Business Partner / Lead">HR Business Partner / Lead</option>
            <option value="Process Excellence / Operations Manager">Process Excellence / Operations Manager</option>
            <option value="Automation / AI Specialist">Automation / AI Specialist</option>
            <option value="Project / Program Manager">Project / Program Manager</option>
            <option value="Executive / Leadership">Executive / Leadership</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Industry */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-gray-900">
            Industry / Sector
          </label>
          <select
            value={demographics.industry}
            onChange={(e) => setDemographics({ industry: e.target.value })}
            className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900"
          >
            <option value="">Select your industry...</option>
            <option value="Wealth Management & Financial Services">Wealth Management & Financial Services</option>
            <option value="Technology & Software">Technology & Software</option>
            <option value="Healthcare & Life Sciences">Healthcare & Life Sciences</option>
            <option value="Manufacturing & Logistics">Manufacturing & Logistics</option>
            <option value="Professional Services & Consulting">Professional Services & Consulting</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Organization Size */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-gray-900">
            Organization Size
          </label>
          <select
            value={demographics.organizationSize}
            onChange={(e) => setDemographics({ organizationSize: e.target.value })}
            className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900"
          >
            <option value="">Select size...</option>
            <option value="1-50 employees">1-50 employees</option>
            <option value="51-200 employees">51-200 employees</option>
            <option value="201-1,000 employees">201-1,000 employees</option>
            <option value="1,001-5,000 employees">1,001-5,000 employees</option>
            <option value="5,000+ employees">5,000+ employees</option>
          </select>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-lg flex items-center gap-3 text-rose-800 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form Actions */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <Button type="button" variant="outline" onClick={() => setCurrentPage(8)}>
            ← Back to Feedback
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
              </span>
            ) : (
              'Complete & Submit →'
            )}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAssessmentStore } from '@/store/useAssessmentStore';
import { calculateDimensionScores, evaluateDecisionRules } from '@/lib/decisionEngine';
import { SURVEY_DIMENSIONS } from '@/lib/constants';
import { ProfileRadarChart } from '../visualization/ProfileRadarChart';
import { Button } from '../common/Button';
import { ChevronDown, ChevronUp, CheckCircle, XCircle } from 'lucide-react';

export const Page7Results: React.FC = () => {
  const { indicatorScores, selectedProcess, customProcessDescription, setCurrentPage, resetAssessment } =
    useAssessmentStore();

  const [showRules, setShowRules] = useState(false);

  const processName = selectedProcess === 'Other' ? customProcessDescription : selectedProcess;

  // 1. Calculate Dimension Scores & Decision Rules
  const dimensionScores = calculateDimensionScores(indicatorScores);
  const { recommendedState, explanation, ruleEvaluations } = evaluateDecisionRules(dimensionScores);

  const getStateBadgeColor = (state: string) => {
    switch (state) {
      case 'Manual':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'RPA':
        return 'bg-emerald-50 text-emerald-800 border-emerald-300';
      case 'AI-Assisted Workflow':
        return 'bg-blue-50 text-blue-800 border-blue-300';
      case 'Agentic AI':
        return 'bg-purple-50 text-purple-800 border-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl mx-auto space-y-8 py-6"
    >
      <div className="space-y-2 text-center sm:text-left">
        <span className="text-xs font-semibold text-blue-600 tracking-wider uppercase">
          Assessment Complete
        </span>
        <h2 className="text-3xl font-bold text-gray-900">Your Assessment Results</h2>
        <p className="text-gray-600">
          Target Process: <strong className="text-gray-900">{processName}</strong>
        </p>
      </div>

      {/* Recommended State Banner */}
      <div className={`p-6 rounded-xl border-2 text-center space-y-3 ${getStateBadgeColor(recommendedState)} shadow-sm`}>
        <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
          Recommended Operational State
        </span>
        <h3 className="text-3xl font-extrabold">{recommendedState}</h3>
        <p className="max-w-2xl mx-auto text-sm leading-relaxed">{explanation}</p>
      </div>

      {/* Radar Chart + Dimension Summary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        <ProfileRadarChart dimensionScores={dimensionScores} />

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4">
          <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide border-b pb-2">
            📊 Dimension Scores
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium text-gray-700">Process Standardization</span>
              <span className="font-bold text-blue-600">{dimensionScores.processStandardization} / 5.0</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium text-gray-700">Cognitive Complexity</span>
              <span className="font-bold text-indigo-600">{dimensionScores.cognitiveComplexity} / 5.0</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium text-gray-700">Process Variability</span>
              <span className="font-bold text-amber-600">{dimensionScores.processVariability} / 5.0</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium text-gray-700">Governance & Risk</span>
              <span className="font-bold text-rose-600">{dimensionScores.governanceRisk} / 5.0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Rules Evaluator Accordion */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-3">
        <button
          onClick={() => setShowRules(!showRules)}
          className="w-full flex justify-between items-center font-bold text-gray-900 text-left"
        >
          <span>🔍 Decision Rules Applied (Interactive)</span>
          {showRules ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
        </button>

        {showRules && (
          <div className="pt-3 border-t space-y-3 text-sm">
            {ruleEvaluations.map((rule) => (
              <div
                key={rule.id}
                className={`p-3 rounded-lg border flex items-start gap-3 ${
                  rule.met ? 'bg-emerald-50 border-emerald-200' : 'bg-gray-50 border-gray-200'
                }`}
              >
                {rule.met ? (
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                )}
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between font-semibold text-gray-900">
                    <span>{rule.ruleName}</span>
                    <span className={rule.met ? 'text-emerald-700 font-bold' : 'text-gray-500'}>
                      {rule.outcome}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 font-mono">{rule.condition}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detailed 12 Indicators Breakdown */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4">
        <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide border-b pb-2">
          📋 Detailed Indicator Responses
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {SURVEY_DIMENSIONS.map((dim) => (
            <div key={dim.id} className="p-3 bg-gray-50 rounded-lg space-y-2">
              <span className="font-bold text-gray-800 block">
                {dim.icon} {dim.name}
              </span>
              <ul className="space-y-1 text-gray-600">
                {dim.indicators.map((ind) => (
                  <li key={ind.key} className="flex justify-between">
                    <span>{ind.title}:</span>
                    <span className="font-semibold text-gray-900">
                      {indicatorScores[ind.key]} / 5
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 pt-4 border-t border-gray-200">
        <Button variant="outline" onClick={() => setCurrentPage(6)}>
          ← Back to Survey
        </Button>
        <div className="flex space-x-3 justify-end">
          <Button variant="secondary" onClick={resetAssessment}>
            Start Over
          </Button>
          <Button onClick={() => setCurrentPage(8)}>
            Proceed to Feedback →
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
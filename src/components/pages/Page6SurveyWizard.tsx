import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAssessmentStore } from '@/store/useAssessmentStore';
import { SURVEY_DIMENSIONS } from '@/lib/constants';
import { IndicatorScoreMap } from '@/lib/types';
import { ProgressIndicator } from '../common/ProgressIndicator';
import { Button } from '../common/Button';

export const Page6SurveyWizard: React.FC = () => {
  const {
    surveyStep,
    setSurveyStep,
    indicatorScores,
    setIndicatorScore,
    selectedProcess,
    customProcessDescription,
    setCurrentPage,
  } = useAssessmentStore();

  const currentDimension = SURVEY_DIMENSIONS[surveyStep];
  const processName = selectedProcess === 'Other' ? customProcessDescription : selectedProcess;

  // Count how many indicators in the current dimension have been rated (> 0)
  const ratedCount = currentDimension.indicators.filter(
    (ind) => indicatorScores[ind.key] > 0
  ).length;

  const isCurrentStepComplete = ratedCount === currentDimension.indicators.length;

  const handleNextStep = () => {
    if (surveyStep < SURVEY_DIMENSIONS.length - 1) {
      setSurveyStep(surveyStep + 1);
    } else {
      // Completed all 4 dimensions, advance to Results Page (Page 7)
      setCurrentPage(7);
    }
  };

  const handleBackStep = () => {
    if (surveyStep > 0) {
      setSurveyStep(surveyStep - 1);
    } else {
      // Return to Transition / Process Selection Page (Page 5)
      setCurrentPage(5);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 py-6">
      {/* Header Info */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Target Process
          </span>
          <h2 className="text-lg font-bold text-gray-900 truncate">{processName}</h2>
        </div>
        <div className="text-right sm:text-right">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Current Dimension
          </span>
          <p className="text-sm font-semibold text-blue-600">
            {currentDimension.icon} {currentDimension.name} ({surveyStep + 1} of 4)
          </p>
        </div>
      </div>

      {/* Progress Dots across 4 dimensions */}
      <ProgressIndicator totalSteps={SURVEY_DIMENSIONS.length} currentStep={surveyStep} />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentDimension.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
        >
          {/* Dimension Summary Box */}
          <div className="bg-slate-50 border-l-4 border-blue-600 p-4 rounded-r-lg">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <span>{currentDimension.icon}</span>
              <span>{currentDimension.name}</span>
            </h3>
            <p className="text-sm text-gray-600 mt-1">{currentDimension.description}</p>
          </div>

          {/* 3 Indicators for Active Dimension */}
          <div className="space-y-6">
            {currentDimension.indicators.map((indicator, idx) => {
              const currentScore = indicatorScores[indicator.key];

              return (
                <div
                  key={indicator.key}
                  className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4"
                >
                  <div>
                    <h4 className="font-bold text-gray-900 text-base">
                      {idx + 1 + surveyStep * 3}. {indicator.title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-0.5">{indicator.question}</p>
                  </div>

                  {/* Vertical 1-5 Rating Options */}
                  <div className="space-y-2">
                    {indicator.options.map((option) => {
                      const isSelected = currentScore === option.score;

                      return (
                        <label
                          key={option.score}
                          onClick={() =>
                            setIndicatorScore(indicator.key, option.score)
                          }
                          className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                            isSelected
                              ? 'border-blue-600 bg-blue-50/60 ring-1 ring-blue-500 font-semibold text-blue-900'
                              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700'
                          }`}
                        >
                          <input
                            type="radio"
                            name={indicator.key}
                            value={option.score}
                            checked={isSelected}
                            onChange={() => setIndicatorScore(indicator.key, option.score)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          />
                          <span className="ml-3 text-sm">{option.label}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Completion Status & Navigation Bar */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="text-sm text-gray-600">
          Progress: <span className="font-bold text-gray-900">{ratedCount} / 3</span> indicators rated in this step
        </div>

        <div className="flex space-x-3 w-full sm:w-auto justify-end">
          <Button variant="outline" onClick={handleBackStep}>
            ← Back
          </Button>
          <Button onClick={handleNextStep} disabled={!isCurrentStepComplete}>
            {surveyStep === SURVEY_DIMENSIONS.length - 1 ? 'View Results →' : 'Continue →'}
          </Button>
        </div>
      </div>
    </div>
  );
};
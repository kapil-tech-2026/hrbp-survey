import React from 'react';

interface ProgressIndicatorProps {
  totalSteps: number;
  currentStep: number; // 0-indexed
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ totalSteps, currentStep }) => {
  return (
    <div className="flex items-center justify-center space-x-2 my-4">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <span
          key={index}
          className={`h-2.5 rounded-full transition-all duration-300 ${
            index === currentStep ? 'w-8 bg-blue-600' : 'w-2.5 bg-gray-300 dark:bg-gray-600'
          }`}
          aria-label={`Step ${index + 1} of ${totalSteps}`}
        />
      ))}
      <span className="ml-2 text-xs font-medium text-gray-500">
        Step {currentStep + 1} of {totalSteps}
      </span>
    </div>
  );
};
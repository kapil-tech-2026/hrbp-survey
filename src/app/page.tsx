'use client';

import React, { useEffect, useState } from 'react';
import { useAssessmentStore } from '@/store/useAssessmentStore';
import { Page1Landing } from '@/components/pages/Page1Landing';
import { Page2Intro } from '@/components/pages/Page2Intro';
import { Page3CoreQuestion } from '@/components/pages/Page3CoreQuestion';
import { Page4Arguments } from '@/components/pages/Page4Arguments';
import { Page5Transition } from '@/components/pages/Page5Transition';
import { Page6SurveyWizard } from '@/components/pages/Page6SurveyWizard';
import { Page7Results } from '@/components/pages/Page7Results';
import { Page8Feedback } from '@/components/pages/Page8Feedback';
import { Page9Demographics } from '@/components/pages/Page9Demographics';

export default function Home() {
  const currentPage = useAssessmentStore((state) => state.currentPage);
  const selectedProcess = useAssessmentStore((state) => state.selectedProcess);
  const customProcessDescription = useAssessmentStore((state) => state.customProcessDescription);
  const resetAssessment = useAssessmentStore((state) => state.resetAssessment);

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Dynamic Header */}
      <header className="max-w-4xl mx-auto mb-8 flex justify-between items-center border-b pb-4 border-gray-200">
        <div>
          <span className="text-xs font-semibold text-blue-600 tracking-wider uppercase">
            Operational Optimization Framework
          </span>
          {currentPage >= 6 && (
            <p className="text-sm text-gray-500 font-medium mt-0.5">
              Assessing: <span className="text-gray-900 font-semibold">{selectedProcess === 'Other' ? customProcessDescription : selectedProcess}</span>
            </p>
          )}
        </div>
        <button
          onClick={resetAssessment}
          className="text-xs text-gray-500 hover:text-rose-600 underline transition-colors"
        >
          Reset Framework
        </button>
      </header>

      {/* Page View Switcher */}
      <div className="max-w-4xl mx-auto">
        {currentPage === 1 && <Page1Landing />}
        {currentPage === 2 && <Page2Intro />}
        {currentPage === 3 && <Page3CoreQuestion />}
        {currentPage === 4 && <Page4Arguments />}
        {currentPage === 5 && <Page5Transition />}
        {currentPage === 6 && <Page6SurveyWizard />}
        {currentPage === 7 && <Page7Results />}
        {currentPage === 8 && <Page8Feedback />}
        {currentPage === 9 && <Page9Demographics />}
      </div>
    </main>
  );
}
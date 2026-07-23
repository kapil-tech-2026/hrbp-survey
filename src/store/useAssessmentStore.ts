import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AssessmentState, ProcessCategory, IndicatorScoreMap } from '@/lib/types';

const initialIndicatorScores: IndicatorScoreMap = {
  std_1: 0,
  std_2: 0,
  std_3: 0,
  cog_1: 0,
  cog_2: 0,
  cog_3: 0,
  var_1: 0,
  var_2: 0,
  var_3: 0,
  gov_1: 0,
  gov_2: 0,
  gov_3: 0,
};

const initialFeedback = {
  accuracyRating: 0,
  usefulnessRating: 0,
  clarityRating: 0,
  comments: '',
};

const initialDemographics = {
  role: '',
  industry: '',
  organizationSize: '',
};

export const useAssessmentStore = create<AssessmentState>()(
  persist(
    (set) => ({
      currentPage: 1,
      page2Step: 1,
      page3Step: 1,
      page4Step: 1,

      selectedProcess: 'Onboarding / Offboarding',
      customProcessDescription: '',

      surveyStep: 0,
      indicatorScores: initialIndicatorScores,

      feedback: initialFeedback,
      demographics: initialDemographics,

      // Actions
      setCurrentPage: (page: number) => set({ currentPage: page }),
      setPage2Step: (step: number) => set({ page2Step: step }),
      setPage3Step: (step: number) => set({ page3Step: step }),
      setPage4Step: (step: number) => set({ page4Step: step }),

      setSelectedProcess: (process: ProcessCategory, customDesc = '') =>
        set({ selectedProcess: process, customProcessDescription: customDesc }),

      setSurveyStep: (step: number) => set({ surveyStep: step }),

      setIndicatorScore: (key: string, score: number) =>
        set((state) => ({
          indicatorScores: { ...state.indicatorScores, [key]: score },
        })),

      setFeedback: (feedbackPartial) =>
        set((state) => ({
          feedback: { ...state.feedback, ...feedbackPartial },
        })),

      setDemographics: (demographicsPartial) =>
        set((state) => ({
          demographics: { ...state.demographics, ...demographicsPartial },
        })),

      resetAssessment: () =>
        set({
          currentPage: 1,
          page2Step: 1,
          page3Step: 1,
          page4Step: 1,
          selectedProcess: 'Onboarding / Offboarding',
          customProcessDescription: '',
          surveyStep: 0,
          indicatorScores: initialIndicatorScores,
          feedback: initialFeedback,
          demographics: initialDemographics,
        }),
    }),
    {
      name: 'hrbp-assessment-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
export type ProcessCategory =
  | 'Employee Data Administration'
  | 'Recruitment & Selection'
  | 'Onboarding / Offboarding'
  | 'Leave & Absence Management'
  | 'Payroll Processing'
  | 'Performance Management'
  | 'Benefits & Payroll Queries'
  | 'Learning & Development'
  | 'Employee Relations'
  | 'Other';

// Alias for backwards compatibility across components
export type HRProcessType = ProcessCategory;

export type RecommendedState =
  | 'Manual'
  | 'RPA'
  | 'AI-Assisted Workflow'
  | 'Agentic AI';

// Alias for decisionEngine compatibility
export type OperationalState = RecommendedState;

export interface IndicatorOption {
  score: number;
  label: string;
}

export interface SurveyIndicator {
  key: string;
  title: string;
  question: string;
  options: IndicatorOption[];
}

export interface SurveyDimension {
  id: string;
  name: string;
  icon: string;
  description: string;
  indicators: SurveyIndicator[];
}

export type IndicatorScoreMap = Record<string, number>;

export interface DimensionScores {
  processStandardization: number;
  cognitiveComplexity: number;
  processVariability: number;
  governanceRisk: number;
}

export interface DecisionRuleResult {
  id: string;
  ruleName: string;
  condition: string;
  met: boolean;
  outcome: RecommendedState;
}

export interface DecisionEvaluation {
  recommendedState: RecommendedState;
  explanation: string;
  ruleEvaluations: DecisionRuleResult[];
}

export interface FeedbackData {
  accuracyRating: number;
  usefulnessRating: number;
  clarityRating: number;
  comments: string;
}

export interface DemographicsData {
  role: string;
  industry: string;
  organizationSize: string;
}

// Full State Interface for Zustand Store
export interface AssessmentState {
  currentPage: number;
  page2Step: number;
  page3Step: number;
  page4Step: number;
  selectedProcess: ProcessCategory;
  customProcessDescription: string;
  surveyStep: number;
  indicatorScores: IndicatorScoreMap;
  feedback: FeedbackData;
  demographics: DemographicsData;

  // Actions
  setCurrentPage: (page: number) => void;
  setPage2Step: (step: number) => void;
  setPage3Step: (step: number) => void;
  setPage4Step: (step: number) => void;
  setSelectedProcess: (process: ProcessCategory, customDesc?: string) => void;
  setSurveyStep: (step: number) => void;
  setIndicatorScore: (key: string, score: number) => void;
  setFeedback: (feedbackPartial: Partial<FeedbackData>) => void;
  setDemographics: (demographicsPartial: Partial<DemographicsData>) => void;
  resetAssessment: () => void;
}
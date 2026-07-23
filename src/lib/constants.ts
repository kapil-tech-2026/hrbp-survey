import { IndicatorScoreMap } from './types';

export interface IndicatorConfig {
  key: keyof IndicatorScoreMap;
  title: string;
  question: string;
  options: { score: number; label: string }[];
}

export interface DimensionConfig {
  id: string;
  name: string;
  icon: string;
  description: string;
  indicators: IndicatorConfig[];
}

export const SURVEY_DIMENSIONS: DimensionConfig[] = [
  {
    id: 'processStandardization',
    name: 'Process Standardization',
    icon: '📊',
    description: 'How well-defined and repeatable the process is',
    indicators: [
      {
        key: 'documentation',
        title: 'Documentation',
        question: 'How well can this process be documented?',
        options: [
          { score: 1, label: '1 - Cannot be formally documented' },
          { score: 2, label: '2 - Limited documentation potential' },
          { score: 3, label: '3 - Can be partially documented' },
          { score: 4, label: '4 - Can be well documented' },
          { score: 5, label: '5 - Fully documented & standardized' },
        ],
      },
      {
        key: 'ruleConsistency',
        title: 'Rule Consistency',
        question: 'How consistently are rules applied?',
        options: [
          { score: 1, label: '1 - No consistent rules; individual judgement' },
          { score: 2, label: '2 - Some informal guidelines; decisions vary' },
          { score: 3, label: '3 - General rules with moderate interpretation' },
          { score: 4, label: '4 - Most decisions follow established rules' },
          { score: 5, label: '5 - Fully rule-based; minimal variation' },
        ],
      },
      {
        key: 'repeatability',
        title: 'Repeatability',
        question: 'How repetitive and predictable is this process?',
        options: [
          { score: 1, label: '1 - Unique for each case' },
          { score: 2, label: '2 - Limited repetition; significant variation' },
          { score: 3, label: '3 - Some repetition but requires customization' },
          { score: 4, label: '4 - Frequently repeated; consistent patterns' },
          { score: 5, label: '5 - Highly repetitive; predictable execution' },
        ],
      },
    ],
  },
  {
    id: 'cognitiveComplexity',
    name: 'Cognitive Complexity',
    icon: '🧠',
    description: 'How much judgement and expertise is required',
    indicators: [
      {
        key: 'decisionJudgement',
        title: 'Decision Judgement',
        question: 'How much judgement is required?',
        options: [
          { score: 1, label: '1 - Minimal to no judgement required' },
          { score: 2, label: '2 - Basic choice between standard paths' },
          { score: 3, label: '3 - Moderate judgement within guidelines' },
          { score: 4, label: '4 - High level of expert discretion needed' },
          { score: 5, label: '5 - Extensive judgment & deep expertise required' },
        ],
      },
      {
        key: 'contextInterpretation',
        title: 'Context Interpretation',
        question: 'How much does context influence execution?',
        options: [
          { score: 1, label: '1 - Minimal context needed' },
          { score: 2, label: '2 - Basic environmental cues required' },
          { score: 3, label: '3 - Moderate context evaluation' },
          { score: 4, label: '4 - Significant context nuance needed' },
          { score: 5, label: '5 - Complex context understanding essential' },
        ],
      },
      {
        key: 'knowledgeDependency',
        title: 'Knowledge Dependency',
        question: 'What level of knowledge is required?',
        options: [
          { score: 1, label: '1 - Minimal; basic instructions' },
          { score: 2, label: '2 - Standard operational procedures' },
          { score: 3, label: '3 - Functional specialized knowledge' },
          { score: 4, label: '4 - Advanced domain knowledge' },
          { score: 5, label: '5 - Extensive expertise & experience' },
        ],
      },
    ],
  },
  {
    id: 'processVariability',
    name: 'Process Variability',
    icon: '🔄',
    description: 'How much processes differ from case to case',
    indicators: [
      {
        key: 'exceptionFrequency',
        title: 'Exception Frequency',
        question: 'How often do exceptions occur?',
        options: [
          { score: 1, label: '1 - Extremely rare' },
          { score: 2, label: '2 - Occasional exceptions' },
          { score: 3, label: '3 - Regular exceptions' },
          { score: 4, label: '4 - Frequent exceptions' },
          { score: 5, label: '5 - Dominant feature of the process' },
        ],
      },
      {
        key: 'caseDiversity',
        title: 'Case Diversity',
        question: 'How similar or different are cases?',
        options: [
          { score: 1, label: '1 - Highly similar' },
          { score: 2, label: '2 - Mostly uniform with minor differences' },
          { score: 3, label: '3 - Moderate variation across cases' },
          { score: 4, label: '4 - High variation between scenarios' },
          { score: 5, label: '5 - Each case requires unique consideration' },
        ],
      },
      {
        key: 'environmentalChange',
        title: 'Environmental Change',
        question: 'How stable is the operating environment?',
        options: [
          { score: 1, label: '1 - Highly stable environment' },
          { score: 2, label: '2 - Infrequent system/policy changes' },
          { score: 3, label: '3 - Moderate environmental shifts' },
          { score: 4, label: '4 - Dynamic environment' },
          { score: 5, label: '5 - Continuous changes impact execution' },
        ],
      },
    ],
  },
  {
    id: 'governanceRisk',
    name: 'Governance & Risk',
    icon: '🛡️',
    description: 'How sensitive and regulated the process is',
    indicators: [
      {
        key: 'complianceSensitivity',
        title: 'Compliance Sensitivity',
        question: 'How regulated is this process?',
        options: [
          { score: 1, label: '1 - Minimal requirements' },
          { score: 2, label: '2 - Basic internal policy compliance' },
          { score: 3, label: '3 - Standard statutory/regulatory requirements' },
          { score: 4, label: '4 - Strict regulatory oversight' },
          { score: 5, label: '5 - Highly regulated; strict oversight' },
        ],
      },
      {
        key: 'dataSensitivity',
        title: 'Data Sensitivity',
        question: 'How sensitive is the information involved?',
        options: [
          { score: 1, label: '1 - Public or non-sensitive information' },
          { score: 2, label: '2 - Internal general business data' },
          { score: 3, label: '3 - Standard employee/PII data' },
          { score: 4, label: '4 - Sensitive PII or financial data' },
          { score: 5, label: '5 - Highly confidential; strict protection required' },
        ],
      },
      {
        key: 'decisionImpact',
        title: 'Decision Impact',
        question: 'What are the consequences of errors?',
        options: [
          { score: 1, label: '1 - Minimal consequences; easy to fix' },
          { score: 2, label: '2 - Minor rework required' },
          { score: 3, label: '3 - Moderate operational disruption' },
          { score: 4, label: '4 - Significant financial/reputational risk' },
          { score: 5, label: '5 - Serious ethical, legal, or organizational consequences' },
        ],
      },
    ],
  },
];
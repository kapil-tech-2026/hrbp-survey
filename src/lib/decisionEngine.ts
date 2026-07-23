import { DimensionScores, IndicatorScoreMap, OperationalState } from './types';

export interface RuleEvaluation {
  id: string;
  ruleName: string;
  condition: string;
  met: boolean;
  outcome: string;
}

export interface CalculationResult {
  dimensionScores: DimensionScores;
  recommendedState: OperationalState;
  explanation: string;
  ruleEvaluations: RuleEvaluation[];
}

export function calculateDimensionScores(indicators: IndicatorScoreMap): DimensionScores {
  const round = (num: number) => Math.round(num * 10) / 10;

  return {
    processStandardization: round(
      (indicators.documentation + indicators.ruleConsistency + indicators.repeatability) / 3
    ),
    cognitiveComplexity: round(
      (indicators.decisionJudgement + indicators.contextInterpretation + indicators.knowledgeDependency) / 3
    ),
    processVariability: round(
      (indicators.exceptionFrequency + indicators.caseDiversity + indicators.environmentalChange) / 3
    ),
    governanceRisk: round(
      (indicators.complianceSensitivity + indicators.dataSensitivity + indicators.decisionImpact) / 3
    ),
  };
}

export function evaluateDecisionRules(dimScores: DimensionScores): CalculationResult {
  const { processStandardization, cognitiveComplexity, processVariability, governanceRisk } = dimScores;

  const ruleEvaluations: RuleEvaluation[] = [];

  // Rule 1: Governance Override (Score >= 4.0)
  const isRule1Met = governanceRisk >= 4.0;
  const rule1Outcome = governanceRisk >= 4.7 ? 'Manual' : 'AI-Assisted Workflow';
  ruleEvaluations.push({
    id: 'rule1',
    ruleName: 'Rule 1: Governance Override',
    condition: `Governance & Risk (${governanceRisk}) >= 4.0`,
    met: isRule1Met,
    outcome: isRule1Met ? rule1Outcome : 'N/A',
  });

  // Rule 2: Agentic AI
  const isRule2Met = cognitiveComplexity >= 4.0 && processVariability >= 4.0 && governanceRisk < 4.0;
  ruleEvaluations.push({
    id: 'rule2',
    ruleName: 'Rule 2: Agentic AI',
    condition: `Cognitive (${cognitiveComplexity}) >= 4.0 & Variability (${processVariability}) >= 4.0 & Governance (${governanceRisk}) < 4.0`,
    met: isRule2Met,
    outcome: isRule2Met ? 'Agentic AI' : 'N/A',
  });

  // Rule 3: RPA
  const isRule3Met = processStandardization >= 4.0 && cognitiveComplexity <= 2.0 && processVariability <= 2.0;
  ruleEvaluations.push({
    id: 'rule3',
    ruleName: 'Rule 3: RPA',
    condition: `Standardization (${processStandardization}) >= 4.0 & Cognitive (${cognitiveComplexity}) <= 2.0 & Variability (${processVariability}) <= 2.0`,
    met: isRule3Met,
    outcome: isRule3Met ? 'RPA' : 'N/A',
  });

  // Rule 4: AI-Assisted Workflow
  const isRule4Met = cognitiveComplexity >= 3.0 && (processVariability >= 3.0 || governanceRisk >= 3.0);
  ruleEvaluations.push({
    id: 'rule4',
    ruleName: 'Rule 4: AI-Assisted Workflow',
    condition: `Cognitive (${cognitiveComplexity}) >= 3.0 & (Variability (${processVariability}) >= 3.0 OR Governance (${governanceRisk}) >= 3.0)`,
    met: isRule4Met,
    outcome: isRule4Met ? 'AI-Assisted Workflow' : 'N/A',
  });

  // Rule 5: Manual (Default)
  ruleEvaluations.push({
    id: 'rule5',
    ruleName: 'Rule 5: Manual (Default)',
    condition: 'Fallback when no automation or AI criteria are satisfied',
    met: !isRule1Met && !isRule2Met && !isRule3Met && !isRule4Met,
    outcome: 'Manual',
  });

  // Determine Recommendation Priority
  let recommendedState: OperationalState = 'Manual';
  let explanation = '';

  if (isRule1Met) {
    recommendedState = rule1Outcome;
    explanation = `High Governance & Risk (${governanceRisk}/5.0) requires strict controls. ${
      recommendedState === 'Manual'
        ? 'Autonomous and AI execution are restricted due to severe impact/compliance risk.'
        : 'Autonomous execution is restricted; human oversight is required via an AI-Assisted Workflow.'
    }`;
  } else if (isRule2Met) {
    recommendedState = 'Agentic AI';
    explanation = `Your process scored high on Cognitive Complexity (${cognitiveComplexity}/5.0) and Process Variability (${processVariability}/5.0) with manageable Governance & Risk (${governanceRisk}/5.0). This qualifies for Agentic AI to dynamically plan and execute.`;
  } else if (isRule3Met) {
    recommendedState = 'RPA';
    explanation = `Your process is highly standardized (${processStandardization}/5.0) with low Cognitive Complexity (${cognitiveComplexity}/5.0) and low Variability (${processVariability}/5.0). Deterministic rule-based RPA software bots are ideal.`;
  } else if (isRule4Met) {
    recommendedState = 'AI-Assisted Workflow';
    explanation = `Your process requires moderate cognitive judgement (${cognitiveComplexity}/5.0) along with non-trivial variability or governance checks. An AI-Assisted Workflow provides AI suggestions while keeping human operators in control.`;
  } else {
    recommendedState = 'Manual';
    explanation = `Your process profile indicates variable execution without sufficient standardization for RPA or high cognitive demand for AI. Manual execution remains the optimal operational choice.`;
  }

  return {
    dimensionScores: dimScores,
    recommendedState,
    explanation,
    ruleEvaluations,
  };
}
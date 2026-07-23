'use client';

import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { DimensionScores } from '@/lib/types';

interface ProfileRadarChartProps {
  dimensionScores: DimensionScores;
}

export const ProfileRadarChart: React.FC<ProfileRadarChartProps> = ({ dimensionScores }) => {
  const data = [
    {
      dimension: 'Standardization',
      score: dimensionScores.processStandardization,
      fullMark: 5,
    },
    {
      dimension: 'Cognitive Complexity',
      score: dimensionScores.cognitiveComplexity,
      fullMark: 5,
    },
    {
      dimension: 'Process Variability',
      score: dimensionScores.processVariability,
      fullMark: 5,
    },
    {
      dimension: 'Governance & Risk',
      score: dimensionScores.governanceRisk,
      fullMark: 5,
    },
  ];

  return (
    <div className="w-full h-80 bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col items-center">
      <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-2">
        📈 Process Profile Visualization
      </h4>
      <div className="w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid stroke="#e2e8f0" />
            <PolarAngleAxis dataKey="dimension" tick={{ fill: '#475569', fontSize: 12 }} />
            <PolarRadiusAxis angle={30} domain={[0, 5]} tick={{ fontSize: 10 }} />
            <Radar
              name="Process Score"
              dataKey="score"
              stroke="#2563eb"
              fill="#3b82f6"
              fillOpacity={0.4}
            />
            <Tooltip
              formatter={
                ((value: number) => [
                  `${Number(value ?? 0).toFixed(1)} / 5.0`,
                  'Score',
                ]) as any
              }
              contentStyle={{ borderRadius: '8px', border: '1px solid #cbd5e1' }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
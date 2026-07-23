import React from 'react';
import { motion } from 'framer-motion';
import { useAssessmentStore } from '@/store/useAssessmentStore';
import { HRProcessType } from '@/lib/types';
import { Button } from '../common/Button';

const PROCESS_OPTIONS: { type: HRProcessType; desc: string }[] = [
  { type: 'Employee Data Administration', desc: 'Maintaining employee records, updating information, managing HR system entries, and ensuring data accuracy' },
  { type: 'Recruitment & Selection', desc: 'Sourcing, screening, interviewing, and hiring candidates' },
  { type: 'Performance Management', desc: 'Setting goals, conducting reviews, and managing performance feedback' },
  { type: 'Leave & Absence Management', desc: 'Processing leave requests, tracking absences, and managing approvals' },
  { type: 'Payroll Processing', desc: 'Calculating and processing employee compensation' },
  { type: 'Other', desc: 'Custom process description' },
];

export const Page5Transition: React.FC = () => {
  const { selectedProcess, customProcessDescription, setSelectedProcess, setCurrentPage } = useAssessmentStore();

  const handleSelect = (process: HRProcessType) => {
    setSelectedProcess(process, customProcessDescription);
  };

  const handleCustomTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedProcess('Other', e.target.value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="max-w-3xl mx-auto space-y-8 py-6"
    >
      <div className="space-y-3">
        <h2 className="text-3xl font-bold text-gray-900">Ready to Assess a Process?</h2>
        <p className="text-gray-600">
          We&apos;ve selected <strong>12 indicators</strong> grouped into four dimensions rated on a scale of 1 to 5.
        </p>
      </div>

      {/* Dimensions Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Dimension</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">What It Measures</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="px-4 py-3 font-medium text-blue-700">📊 Process Standardization</td>
              <td className="px-4 py-3 text-gray-600">How well-defined and repeatable the process is</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-indigo-700">🧠 Cognitive Complexity</td>
              <td className="px-4 py-3 text-gray-600">How much judgement and expertise is required</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-amber-700">🔄 Process Variability</td>
              <td className="px-4 py-3 text-gray-600">How much processes differ from case to case</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-rose-700">🛡️ Governance & Risk</td>
              <td className="px-4 py-3 text-gray-600">How sensitive and regulated the process is</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Process Selection Section */}
      <div className="space-y-4 pt-2">
        <h3 className="text-xl font-bold text-gray-900">Select Your Process</h3>
        <p className="text-sm text-gray-600">Please select the HR process you would like to assess:</p>

        <div className="space-y-3">
          {PROCESS_OPTIONS.map((option) => (
            <label
              key={option.type}
              className={`flex items-start space-x-3 p-4 rounded-lg border cursor-pointer transition-all ${
                selectedProcess === option.type
                  ? 'border-blue-600 bg-blue-50/50 ring-1 ring-blue-500'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <input
                type="radio"
                name="hrProcess"
                checked={selectedProcess === option.type}
                onChange={() => handleSelect(option.type)}
                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <div className="flex-1">
                <span className="font-semibold text-gray-900 block">{option.type}</span>
                <span className="text-sm text-gray-600">{option.desc}</span>
              </div>
            </label>
          ))}
        </div>

        {selectedProcess === 'Other' && (
          <div className="pt-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Specify Custom Process Description</label>
            <input
              type="text"
              value={customProcessDescription}
              onChange={handleCustomTextChange}
              placeholder="Enter your process description here..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        )}
      </div>

      <div className="flex justify-between pt-6 border-t border-gray-200">
        <Button variant="outline" onClick={() => setCurrentPage(4)}>
          ← Back
        </Button>
        <Button
          size="lg"
          onClick={() => setCurrentPage(6)}
          disabled={selectedProcess === 'Other' && !customProcessDescription.trim()}
        >
          Start Assessment →
        </Button>
      </div>
    </motion.div>
  );
};
import React, { useState } from 'react';
import { Gender } from '../types';
import { Shield } from 'lucide-react';

type Props = {
onSelect: (gender: Gender) => void;
};

export const GenderSelection: React.FC<Props> = ({ onSelect }) => {
const [showPrivacy, setShowPrivacy] = useState(false);

return (
<div className="min-h-screen flex items-center justify-center bg-white text-gray-900 dark:bg-black dark:text-white p-4">
<div className="max-w-md w-full p-8 bg-white dark:bg-black rounded-lg shadow-lg border border-purple-500 dark:border-green-500">
<h1 className="text-3xl font-bold mb-6 text-center text-purple-600 dark:text-green-400">
Wellness Assessment
</h1>

    <div className="mb-6">
      <button
        onClick={() => setShowPrivacy(!showPrivacy)}
        className="inline-flex items-center gap-2 text-sm mb-4 underline hover:opacity-80 text-purple-600 dark:text-green-400"
      >
        
        Privacy Policy
      </button>

      {showPrivacy && (
        <div className="p-4 mb-4 rounded-lg bg-gray-100 dark:bg-gray-900 text-sm text-gray-700 dark:text-gray-300">
          <p className="mb-2">
            <strong className="text-purple-600 dark:text-green-400">
              Data Privacy Notice:
            </strong>
          </p>
          <ul className="list-disc pl-4 space-y-1">
            <li>Your responses are processed locally in your browser only.</li>
            <li>We do not collect, store, or transmit any personal information.</li>
            <li>No data is saved after you close this assessment.</li>
            <li>Your results are completely anonymous and temporary.</li>
          </ul>
        </div>
      )}
    </div>

    <div className="space-y-4">
      <label className="block mb-2 text-lg font-medium text-purple-600 dark:text-green-400">
        Select your gender:
      </label>
      <select
        onChange={(e) => onSelect(e.target.value as Gender)}
        className="w-full p-3 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 dark:focus:ring-green-500 bg-white dark:bg-gray-900 border border-purple-500 dark:border-green-500 text-gray-900 dark:text-white"
        defaultValue=""
      >
        <option value="" disabled>
          Please select...
        </option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Prefer not to say">Prefer not to say</option>
      </select>
    </div>
  </div>
</div>
);
};
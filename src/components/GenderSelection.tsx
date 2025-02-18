import React, { useState } from 'react';
import { Gender } from '../types';
import { Shield } from 'lucide-react';

type Props = {
  onSelect: (gender: Gender) => void;
};

export const GenderSelection: React.FC<Props> = ({ onSelect }) => {
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-black bg-white dark:text-white text-gray-900 p-4">
      <div className="max-w-md w-full p-8 dark:bg-black bg-white rounded-lg shadow-lg dark:border-green-500 border-purple-500 border">
      

        </div>
        <h1 className="text-3xl font-bold dark:text-green-400 text-purple-600 mb-6 text-center">
          Wellness Assessment
        </h1>
        
        <div className="mb-6">
          <button 
            onClick={() => setShowPrivacy(!showPrivacy)}
            className="dark:text-green-400 text-purple-600 hover:opacity-80 underline text-sm mb-4 inline-flex items-center gap-2"
          >
            <Shield size={16} />
            Privacy Policy
          </button>
          
          {showPrivacy && (
            <div className="dark:bg-gray-900 bg-gray-100 p-4 rounded-lg mb-4 text-sm dark:text-gray-300 text-gray-700">
              <p className="mb-2">
                <strong className="dark:text-green-400 text-purple-600">Data Privacy Notice:</strong>
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
          <label className="block dark:text-green-400 text-purple-600 text-lg font-medium mb-2">
            Select your gender:
          </label>
          <select
            onChange={(e) => onSelect(e.target.value as Gender)}
            className="w-full p-3 dark:bg-gray-900 bg-white dark:border-green-500 border-purple-500 rounded-md shadow-sm focus:ring-2 dark:focus:ring-green-500 focus:ring-purple-500 dark:text-white text-gray-900"
            defaultValue=""
          >
            <option value="" disabled>Please select...</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
        </div>
      </div>
    </div>
  );
};
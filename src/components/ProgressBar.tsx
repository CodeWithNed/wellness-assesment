import React from 'react';
import { Category, categories } from '../data';

type Props = {
  currentCategory: Category;
};

export const ProgressBar: React.FC<Props> = ({ currentCategory }) => {
  const currentIndex = categories.indexOf(currentCategory);
  const progress = ((currentIndex + 1) / categories.length) * 100;

  return (
    <div className="w-full dark:bg-gray-800 bg-gray-200 rounded-full h-2.5 mb-6">
      <div
        className="dark:bg-green-500 bg-purple-500 h-2.5 rounded-full transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
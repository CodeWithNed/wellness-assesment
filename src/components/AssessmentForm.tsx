import React from 'react';
import { Category, Question } from '../types';

type Props = {
  questions: Question[];
  currentCategory: Category;
  onAnswer: (questionIndex: number, score: number) => void;
  answers: Record<number, number>;
};

export const AssessmentForm: React.FC<Props> = ({
  questions,
  currentCategory,
  onAnswer,
  answers,
}) => {
  const categoryQuestions = questions.filter(q => q.category === currentCategory);

  return (
    <div className="space-y-6">
      {categoryQuestions.map((question, idx) => {
        const questionIndex = questions.findIndex(q => q.text === question.text);
        return (
          <div key={idx} className="dark:bg-black bg-white p-6 rounded-lg shadow-sm dark:border-green-500 border-purple-500 border">
            <p className="text-lg dark:text-gray-200 text-gray-700 mb-4">{question.text}</p>
            <div className="flex justify-between items-center">
              {[1, 2, 3, 4, 5].map((score) => (
                <button
                  key={score}
                  onClick={() => onAnswer(questionIndex, score)}
                  className={`w-12 h-12 rounded-full ${
                    answers[questionIndex] === score
                      ? 'dark:bg-green-600 bg-purple-600 dark:text-black text-white'
                      : 'dark:bg-gray-800 bg-gray-100 dark:text-gray-300 text-gray-600 dark:hover:bg-gray-700 hover:bg-gray-200'
                  } font-medium transition-colors`}
                >
                  {score}
                </button>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-sm dark:text-gray-400 text-gray-500">
              <span>Strongly Disagree</span>
              <span>Strongly Agree</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
import React, { useState } from 'react';
import { GenderSelection } from './components/GenderSelection';
import { AssessmentForm } from './components/AssessmentForm';
import { ProgressBar } from './components/ProgressBar';
import { ResultsView } from './components/Results';
import { ThemeToggle } from './components/ThemeToggle';
import { questions, categories } from './data';
import { Gender, Category, Assessment, Results } from './types';

function App() {
  const [gender, setGender] = useState<Gender | null>(null);
  const [currentCategory, setCurrentCategory] = useState<Category>(categories[0]);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isComplete, setIsComplete] = useState(false);

  const handleGenderSelect = (selectedGender: Gender) => {
    setGender(selectedGender);
  };

  const handleAnswer = (questionIndex: number, score: number) => {
    setAnswers(prev => ({ ...prev, [questionIndex]: score }));
  };

  const calculateResults = (): Results => {
    const assessment: Assessment = {
      gender: gender as Gender,
      scores: {} as Record<Category, number[]>
    };

    categories.forEach(category => {
      assessment.scores[category] = [];
    });

    Object.entries(answers).forEach(([index, score]) => {
      const question = questions[Number(index)];
      assessment.scores[question.category].push(score);
    });

    const results: Results = {
      gender: gender as Gender,
      scores: {} as Record<Category, number>
    };

    Object.entries(assessment.scores).forEach(([category, scores]) => {
      const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
      results.scores[category as Category] = average;
    });

    return results;
  };

  const handleNext = () => {
    const currentCategoryQuestions = questions.filter(q => q.category === currentCategory);
    const allCurrentQuestionsAnswered = currentCategoryQuestions.every(
      (_, idx) => answers[questions.findIndex(q => q.text === currentCategoryQuestions[idx].text)] !== undefined
    );

    if (allCurrentQuestionsAnswered) {
      const currentIndex = categories.indexOf(currentCategory);
      if (currentIndex < categories.length - 1) {
        setCurrentCategory(categories[currentIndex + 1]);
      } else {
        setIsComplete(true);
      }
    }
  };

  if (!gender) {
    return (
      <>
        <ThemeToggle />
        <GenderSelection onSelect={handleGenderSelect} />
      </>
    );
  }

  if (isComplete) {
    return (
      <>
        <ThemeToggle />
        <ResultsView results={calculateResults()} />
      </>
    );
  }

  return (
    <>
      <ThemeToggle />
      <div className="min-h-screen dark:bg-black bg-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <ProgressBar currentCategory={currentCategory} />
          <AssessmentForm
            questions={questions}
            currentCategory={currentCategory}
            onAnswer={handleAnswer}
            answers={answers}
          />
          <div className="mt-8 flex justify-end">
            <button
              onClick={handleNext}
              className="px-6 py-3 dark:bg-green-600 bg-purple-600 dark:text-black text-white font-semibold rounded-md dark:hover:bg-green-500 hover:bg-purple-500 transition-colors"
            >
              {categories.indexOf(currentCategory) === categories.length - 1 ? 'View Results' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
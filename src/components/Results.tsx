import React, { useRef } from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { Download } from 'lucide-react';
import { Results, Category } from '../types';
import { categoryColors, getGenderSpecificInsights } from '../data';
import { useTheme } from '../context/ThemeContext';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

type Props = {
  results: Results;
};

export const ResultsView: React.FC<Props> = ({ results }) => {
  const chartRef = useRef<ChartJS>(null);
  const { theme } = useTheme();

  const data = {
    labels: Object.keys(results.scores).map(
      category => `${category}\n${(Object.values(results.scores)[Object.keys(results.scores).indexOf(category)] * 20).toFixed(1)}%`
    ),
    datasets: [
      {
        label: 'Your Scores',
        data: Object.values(results.scores),
        backgroundColor: theme === 'dark' 
          ? 'rgba(0, 255, 127, 0.2)'
          : 'rgba(147, 51, 234, 0.2)',
        borderColor: theme === 'dark'
          ? 'rgba(0, 255, 127, 1)'
          : 'rgba(147, 51, 234, 1)',
        borderWidth: 2,
        pointBackgroundColor: theme === 'dark'
          ? 'rgba(0, 255, 127, 1)'
          : 'rgba(147, 51, 234, 1)',
        pointBorderColor: theme === 'dark' ? '#000' : '#fff',
        pointHoverBackgroundColor: theme === 'dark' ? '#000' : '#fff',
        pointHoverBorderColor: theme === 'dark'
          ? 'rgba(0, 255, 127, 1)'
          : 'rgba(147, 51, 234, 1)'
      }
    ]
  };

  const options = {
    scales: {
      r: {
        angleLines: {
          color: theme === 'dark'
            ? 'rgba(255, 255, 255, 0.2)'
            : 'rgba(0, 0, 0, 0.2)'
        },
        grid: {
          color: theme === 'dark'
            ? 'rgba(255, 255, 255, 0.2)'
            : 'rgba(0, 0, 0, 0.2)'
        },
        pointLabels: {
          color: theme === 'dark'
            ? 'rgba(255, 255, 255, 0.9)'
            : 'rgba(0, 0, 0, 0.9)',
          font: {
            size: 14,
            weight: 'bold' as const
          }
        },
        ticks: {
          color: theme === 'dark'
            ? 'rgba(255, 255, 255, 0.8)'
            : 'rgba(0, 0, 0, 0.8)',
          backdropColor: 'transparent',
          stepSize: 1
        },
        suggestedMin: 0,
        suggestedMax: 5
      }
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          color: theme === 'dark'
            ? 'rgba(255, 255, 255, 0.9)'
            : 'rgba(0, 0, 0, 0.9)',
          font: {
            size: 14
          }
        }
      },
      tooltip: {
        backgroundColor: theme === 'dark'
          ? 'rgba(0, 0, 0, 0.8)'
          : 'rgba(255, 255, 255, 0.8)',
        titleColor: theme === 'dark'
          ? 'rgba(0, 255, 127, 1)'
          : 'rgba(147, 51, 234, 1)',
        bodyColor: theme === 'dark'
          ? 'rgba(255, 255, 255, 0.9)'
          : 'rgba(0, 0, 0, 0.9)',
        callbacks: {
          label: (context: any) => `Score: ${context.raw.toFixed(1)} (${(context.raw * 20).toFixed(1)}%)`
        }
      }
    }
  };

  const downloadChart = () => {
    const link = document.createElement('a');
    link.download = 'wellness-assessment.png';
    link.href = chartRef.current?.toBase64Image() || '';
    link.click();
  };

  return (
    <div className="min-h-screen dark:bg-black bg-white py-8">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-8 dark:text-white text-gray-900">Your Wellness Assessment Results</h1>
        
        <div className="dark:bg-black bg-white rounded-lg shadow-lg p-6 mb-8 dark:border-green-500 border-purple-500 border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold dark:text-green-400 text-purple-600">Radar Chart Analysis</h2>
            <button
              onClick={downloadChart}
              className="flex items-center gap-2 px-4 py-2 dark:bg-green-600 bg-purple-600 dark:text-black text-white rounded-md dark:hover:bg-green-500 hover:bg-purple-500 transition-colors"
            >
              <Download size={20} />
              Download Chart
            </button>
          </div>
          <div className="w-full h-[400px]">
            <Radar ref={chartRef} data={data} options={options} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(Object.entries(results.scores) as [Category, number][]).map(([category, score]) => (
            <div key={category} className="dark:bg-black bg-white rounded-lg shadow-lg p-6 dark:border-green-500 border-purple-500 border">
              <h3 className="text-lg font-semibold mb-2 dark:text-green-400 text-purple-600">
                {category}
              </h3>
              <div className="flex items-center gap-2 mb-2">
                <div className="text-2xl font-bold dark:text-white text-gray-900">{(score * 20).toFixed(1)}%</div>
                <div className="dark:text-gray-400 text-gray-500">({score.toFixed(1)} / 5.0)</div>
              </div>
              <p className="dark:text-gray-300 text-gray-600">
                {getGenderSpecificInsights(category, score, results.gender)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
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
);

type Props = {
  results: Results;
};

export const ResultsView: React.FC<Props> = ({ results }) => {
  const chartRef = useRef<ChartJS>(null);
  const { theme } = useTheme();

  const data = {
    labels: Object.keys(results.scores),
    datasets: [
      {
        label: 'Your Scores',
        data: Object.values(results.scores),
        backgroundColor: theme === 'dark' ? 'rgba(0, 255, 127, 0.2)' : 'rgba(147, 51, 234, 0.2)',
        borderColor: theme === 'dark' ? 'rgba(0, 255, 127, 1)' : 'rgba(147, 51, 234, 1)',
        borderWidth: 2,
        pointBackgroundColor: theme === 'dark' ? 'rgba(0, 255, 127, 1)' : 'rgba(147, 51, 234, 1)',
        pointBorderColor: theme === 'dark' ? '#000' : '#fff',
        pointHoverBackgroundColor: theme === 'dark' ? '#000' : '#fff',
        pointHoverBorderColor: theme === 'dark' ? 'rgba(0, 255, 127, 1)' : 'rgba(147, 51, 234, 1)'
      }
    ]
  };

  const options = {
    scales: {
      r: {
        angleLines: {
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'
        },
        grid: {
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'
        },
        pointLabels: {
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
          font: {
            size: 14,
            weight: 'bold' as const
          }
        },
        ticks: {
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
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
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
          font: {
            size: 14
          }
        }
      },
      tooltip: {
        backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
        titleColor: theme === 'dark' ? 'rgba(0, 255, 127, 1)' : 'rgba(147, 51, 234, 1)',
        bodyColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
        callbacks: {
          label: (context: any) => `Score: ${context.raw.toFixed(1)}`
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
      
        <div className="dark:bg-black bg-white rounded-lg shadow-lg p-6 mb-8 dark:border-green-500 border-purple-500 border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold dark:text-green-400 text-purple-600">
              Your Wellness Score
            </h2>
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
        
        <div className="text-center mt-8">
          <p className="text-md font-medium mb-2 dark:text-white text-gray-900">
            Connect with me:
          </p>
          <div className="flex justify-center space-x-4">
            <a href="https://github.com/CodeWithNed" target="_blank" rel="noopener noreferrer" className="dark:text-green-400 text-purple-600 hover:opacity-80">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/nadun-kumarasinghe-448b691a9/" target="_blank" rel="noopener noreferrer" className="dark:text-green-400 text-purple-600 hover:opacity-80">
              LinkedIn
            </a>
            <a href="https://www.buymeacoffee.com/NadunKumarasinghe" target="_blank" rel="noopener noreferrer" className="dark:text-green-400 text-purple-600 hover:opacity-80">
              Buy Me A Coffee
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
import { Category, Question } from './types';

export const categories: Category[] = [
  'Career',
  'Learning',
  'Nutrition',
  'Relationships',
  'Spirituality',
  'Strength'
];

export const questions: Question[] = [
  // Career
  { category: 'Career', text: 'I feel satisfied with my current career progress.' },
  { category: 'Career', text: 'I have clear goals for my professional future.' },
  { category: 'Career', text: 'I actively seek opportunities to advance in my career.' },
  { category: 'Career', text: 'My work aligns with my personal values and passions.' },
  
  // Learning
  { category: 'Learning', text: 'I regularly engage in activities that help me learn new skills or knowledge.' },
  { category: 'Learning', text: 'I am open to feedback and use it to improve myself.' },
  { category: 'Learning', text: 'I allocate time for personal or professional development.' },
  { category: 'Learning', text: 'I feel confident in my ability to adapt to new challenges or environments.' },
  
  // Nutrition
  { category: 'Nutrition', text: 'I maintain a balanced diet that supports my physical and mental health.' },
  { category: 'Nutrition', text: 'I am consistent in making healthy food choices.' },
  { category: 'Nutrition', text: 'I stay hydrated throughout the day.' },
  { category: 'Nutrition', text: 'I avoid habits that negatively impact my nutrition (e.g., overeating, skipping meals).' },
  
  // Relationships
  { category: 'Relationships', text: 'I invest time and effort into building strong relationships with others.' },
  { category: 'Relationships', text: 'I communicate effectively with family, friends, or colleagues.' },
  { category: 'Relationships', text: 'I feel supported by the people around me.' },
  { category: 'Relationships', text: 'I am able to resolve conflicts in a healthy and constructive way.' },
  
  // Spirituality
  { category: 'Spirituality', text: 'I take time to reflect on my purpose and values in life.' },
  { category: 'Spirituality', text: 'I practice mindfulness, meditation, or prayer regularly.' },
  { category: 'Spirituality', text: 'My actions align with my moral or ethical principles.' },
  { category: 'Spirituality', text: 'I feel connected to something greater than myself (e.g., community, nature, faith).' },
  
  // Strength
  { category: 'Strength', text: 'I engage in regular physical activity or exercise.' },
  { category: 'Strength', text: 'I feel physically strong and capable of handling daily tasks.' },
  { category: 'Strength', text: 'My energy levels are consistent throughout the day.' },
  { category: 'Strength', text: 'I prioritize rest and recovery as part of my fitness routine.' }
];

export const categoryColors: Record<Category, string> = {
  Career: '#FF6384',
  Learning: '#36A2EB',
  Nutrition: '#4BC0C0',
  Relationships: '#9966FF',
  Spirituality: '#FF9F40',
  Strength: '#FFCD56'
};

export const getGenderSpecificInsights = (category: Category, score: number, gender: Gender): string => {
  const insights: Record<Category, Record<Gender, string[]>> = {
    Career: {
      Male: [
        'Consider mentorship opportunities in your field',
        'Focus on building leadership skills',
        'Network with industry professionals'
      ],
      Female: [
        'Seek out women in leadership positions as mentors',
        'Join professional women\'s networks',
        'Advocate for equal opportunities'
      ],
      'Prefer not to say': [
        'Focus on skill development',
        'Build a strong professional network',
        'Set clear career milestones'
      ]
    },
    Learning: {
      Male: [
        'Explore technical and analytical skills',
        'Join professional development programs',
        'Consider certification courses'
      ],
      Female: [
        'Pursue STEM learning opportunities',
        'Develop public speaking skills',
        'Join learning communities'
      ],
      'Prefer not to say': [
        'Focus on self-paced learning',
        'Develop diverse skill sets',
        'Set personal learning goals'
      ]
    },
    Nutrition: {
      Male: [
        'Focus on protein-rich foods',
        'Monitor portion sizes',
        'Stay hydrated during workouts'
      ],
      Female: [
        'Ensure adequate iron intake',
        'Focus on calcium-rich foods',
        'Monitor nutritional needs'
      ],
      'Prefer not to say': [
        'Maintain a balanced diet',
        'Stay hydrated',
        'Plan meals ahead'
      ]
    },
    Relationships: {
      Male: [
        'Practice emotional expression',
        'Build deeper connections',
        'Improve active listening'
      ],
      Female: [
        'Set healthy boundaries',
        'Practice self-advocacy',
        'Build support networks'
      ],
      'Prefer not to say': [
        'Focus on authentic connections',
        'Maintain healthy boundaries',
        'Practice open communication'
      ]
    },
    Spirituality: {
      Male: [
        'Explore meditation practices',
        'Join spiritual communities',
        'Practice mindfulness'
      ],
      Female: [
        'Join women\'s spiritual circles',
        'Practice self-reflection',
        'Explore spiritual traditions'
      ],
      'Prefer not to say': [
        'Develop personal practices',
        'Connect with nature',
        'Practice mindfulness'
      ]
    },
    Strength: {
      Male: [
        'Focus on balanced strength training',
        'Include recovery days',
        'Practice proper form'
      ],
      Female: [
        'Include resistance training',
        'Focus on functional fitness',
        'Build core strength'
      ],
      'Prefer not to say': [
        'Develop personalized routine',
        'Focus on overall fitness',
        'Listen to your body'
      ]
    }
  };

  const scoreLevel = score < 2 ? 0 : score < 3.5 ? 1 : 2;
  return insights[category][gender][scoreLevel];
};
export type Gender = 'Male' | 'Female' | 'Prefer not to say';

export type Category = 'Career' | 'Learning' | 'Nutrition' | 'Relationships' | 'Spirituality' | 'Strength';

export type Question = {
  text: string;
  category: Category;
};

export type Assessment = {
  gender: Gender;
  scores: Record<Category, number[]>;
};

export type Results = {
  gender: Gender;
  scores: Record<Category, number>;
};
import React from 'react';

interface PromptRecommendationProps {
  onClickRecommendation: (text: string, isUser: boolean) => void;
}

const prompts = [
  'Recommend a place for dinner with friends',
  'Recommend a restaurant with a comfortable atmosphere',
  'Recommend a place for a romantic date',
  'Recommend a place for a business meeting',
  'Recommend a place for a family dinner',
  'Recommend a place for a birthday party',
  'Recommend a place for a wedding anniversary',
  'Recommend a place for a graduation party',
  'Recommend a place for a baby shower',
  'Recommend a place for a bridal shower',
];

const PromptRecommendation: React.FC<PromptRecommendationProps> = ({onClickRecommendation }) => {
  return (
    <div className="recommendation-texts">
      <h2>Please enter the restaurant you are looking for</h2>
      <div className="recommendation-buttons">
        {prompts.slice(0, 2).map((text, index) => (
          <button key={index} onClick={() => onClickRecommendation(text, true)}>
            {text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PromptRecommendation;
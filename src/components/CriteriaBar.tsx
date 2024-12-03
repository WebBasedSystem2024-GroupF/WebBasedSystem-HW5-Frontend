import React from 'react';
import '@/styles/GoogleMap.css';

interface CriteriaBarProps {
  label: string;
  percentage: number;
}

const CriteriaBar: React.FC<CriteriaBarProps> = ({ label, percentage }) => {
  const fillColor = `rgba(255, 103, 0, ${percentage / 100})`;

  return (
    <div className="criteria-item">
      <div className="criteria-bar">
        <div className="criteria-fill" style={{ width: `${percentage}%`, backgroundColor: fillColor }}></div>
      </div>
      <div className="criteria-info">
        <span className="criteria-label">{label}</span>
        <span className="criteria-percentage">{percentage}%</span>
      </div>
    </div>
  );
};

export default CriteriaBar;
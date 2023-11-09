import React from 'react';
import { FaSpinner } from 'react-icons/fa';

interface LoadingSpinnerProps {
  active: boolean;
  text?: string;
  transactionUrl?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ active, text = "Processing...", transactionUrl }) => {
  if (!active) return null;

  return (
    <div className="flex justify-center items-center space-x-2">
      <FaSpinner className="animate-spin text-xl text-blue-600" aria-hidden="true" />
      {transactionUrl ? (
        // If transactionUrl is provided, show it as a clickable link
        <a href={transactionUrl} className="text-lg text-blue-600" target="_blank" rel="noopener noreferrer">
          Transaction Details
        </a>
      ) : (
        // If transactionUrl is not provided, show the text
        <span className="text-lg text-blue-600">{text}</span>
      )}
    </div>
  );
};

export default LoadingSpinner;

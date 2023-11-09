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
    <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg shadow mt-4">
      <FaSpinner className="animate-spin text-3xl text-blue-600" aria-hidden="true" />
      <div className="mt-2 text-center">
        {transactionUrl ? (
          // If transactionUrl is provided, show it as a clickable link
          <a href={transactionUrl} className="text-blue-600 hover:text-blue-700 transition-colors duration-150" target="_blank" rel="noopener noreferrer">
            <span className="text-sm font-medium">Transaction Details</span>
          </a>
        ) : (
          // If transactionUrl is not provided, show the text
          <span className="text-sm text-blue-600">{text}</span>
        )}
      </div>
    </div>
  );
};

export default LoadingSpinner;
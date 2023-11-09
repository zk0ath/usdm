import React from 'react';

type BurnFormProps = {
  burnAmount: number;
  setBurnAmount: React.Dispatch<React.SetStateAction<number>>;
  burnRecipientAddress: string; // Added property for the recipient's address
  setBurnRecipientAddress: React.Dispatch<React.SetStateAction<string>>; // Added setter for the recipient's address
  onBurnTokens: () => void;
};

const BurnForm: React.FC<BurnFormProps> = ({
  burnAmount,
  setBurnAmount,
  burnRecipientAddress,
  setBurnRecipientAddress,
  onBurnTokens,
}) => {
  return (
    <section className="flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow space-y-3">
      <h2 className="text-lg font-semibold text-gray-700">Burn Tokens</h2>
      <div className="w-full">
        <label htmlFor="burnAmount" className="sr-only">Amount to Burn</label>
        <input
          id="burnAmount"
          type="number"
          value={burnAmount}
          onChange={(e) => setBurnAmount(Number(e.target.value))}
          className="w-full p-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
                    focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                    disabled:bg-gray-100 disabled:text-gray-500 disabled:border-gray-200 
                    invalid:border-red-500 invalid:text-red-600 
                    focus:invalid:border-red-500 focus:invalid:ring-red-500"
          min="0"
        />
      </div>
      <div className="w-full">
        <label htmlFor="burnRecipientAddress" className="sr-only">Address</label>
        <input
          id="burnRecipientAddress"
          type="text"
          value={burnRecipientAddress}
          onChange={(e) => setBurnRecipientAddress(e.target.value)}
          className="w-full p-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
                    focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                    disabled:bg-gray-100 disabled:text-gray-500 disabled:border-gray-200"
          placeholder="Recipient's Address"
        />
      </div>
      <button
        onClick={onBurnTokens}
        className="w-full px-5 py-3 text-sm font-medium text-white transition-colors duration-150 bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none"
      >
        Burn Tokens
      </button>
    </section>
  );
};

export default BurnForm;

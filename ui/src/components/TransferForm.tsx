import React from 'react';

type TransferFormProps = {
  transferAmount: number;
  setTransferAmount: React.Dispatch<React.SetStateAction<number>>;
  senderAddress: string;  // Add senderAddress to the props
  setSenderAddress: React.Dispatch<React.SetStateAction<string>>;  // Add setSenderAddress to the props
  transferRecipientAddress: string;
  setTransferRecipientAddress: React.Dispatch<React.SetStateAction<string>>;
  onTransferTokens: () => void;
};

const TransferForm: React.FC<TransferFormProps> = ({
  transferAmount,
  setTransferAmount,
  senderAddress,  // Add senderAddress to the component
  setSenderAddress,  // Add setSenderAddress to the component
  transferRecipientAddress,
  setTransferRecipientAddress,
  onTransferTokens,
}) => {
  return (
    <section className="flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow space-y-3">
      <h2 className="text-lg font-semibold text-gray-700">Transfer Tokens</h2>
      <div className="w-full">
        <label htmlFor="senderAddress" className="sr-only">Sender Address</label>
        <input
          id="senderAddress"
          type="text"
          value={senderAddress}
          onChange={(e) => setSenderAddress(e.target.value)}
          className="w-full p-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
                    focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                    disabled:bg-gray-100 disabled:text-gray-500 disabled:border-gray-200"
          placeholder="Sender's Address"
        />
      </div>
      <div className="w-full">
        <label htmlFor="transferRecipientAddress" className="sr-only">Recipient Address</label>
        <input
          id="transferRecipientAddress"
          type="text"
          value={transferRecipientAddress}
          onChange={(e) => setTransferRecipientAddress(e.target.value)}
          className="w-full p-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
                    focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                    disabled:bg-gray-100 disabled:text-gray-500 disabled:border-gray-200"
          placeholder="Recipient's Address"
        />
      </div>
      <div className="w-full">
        <label htmlFor="transferAmount" className="sr-only">Amount to Transfer</label>
        <input
          id="transferAmount"
          type="number"
          value={transferAmount}
          onChange={(e) => setTransferAmount(Number(e.target.value))}
          className="w-full p-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
                    focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                    disabled:bg-gray-100 disabled:text-gray-500 disabled:border-gray-200 
                    invalid:border-red-500 invalid:text-red-600 
                    focus:invalid:border-red-500 focus:invalid:ring-red-500"
          min="0"
        />
      </div>
      <button
        onClick={onTransferTokens}
        className="w-full px-5 py-3 text-sm font-medium text-white transition-colors duration-150 bg-purple-600 rounded-lg hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 focus:outline-none"
      >
        Transfer Tokens
      </button>
    </section>
  );
};

export default TransferForm;

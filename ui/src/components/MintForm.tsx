import React from 'react';

type MintFormProps = {
  mintAmount: number;
  setMintAmount: React.Dispatch<React.SetStateAction<number>>;
  mintRecipientAddress: string;
  mintAdminPrivateKey: string;
  setMintAdminPrivateKey: React.Dispatch<React.SetStateAction<string>>;
  setMintRecipientAddress: React.Dispatch<React.SetStateAction<string>>;
  onMintTokens: () => void;
};

const MintForm: React.FC<MintFormProps> = ({
  mintAmount,
  setMintAmount,
  mintRecipientAddress,
  mintAdminPrivateKey,
  setMintAdminPrivateKey,
  setMintRecipientAddress,
  onMintTokens,
}) => {
  return (
    <section className="flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow space-y-3">
      <h2 className="text-lg font-semibold text-gray-700">Mint Your Tokens</h2>
      <div className="w-full">
        <label htmlFor="mintAmount" className="sr-only">Amount to Mint</label>
        <input
          id="mintAmount"
          type="number"
          value={mintAmount.toString()}
          onChange={(e) => setMintAmount(Number(e.target.value))}
          className="w-full p-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
                    focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                    disabled:bg-gray-100 disabled:text-gray-500 disabled:border-gray-200 
                    invalid:border-red-500 invalid:text-red-600 
                    focus:invalid:border-red-500 focus:invalid:ring-red-500"
          min="0"
        />
      </div>
      <div className="w-full">
        <label htmlFor="mintRecipientAddress" className="sr-only">Recipient Address</label>
        <input
          id="mintRecipientAddress"
          type="text"
          value={mintRecipientAddress}
          onChange={(e) => setMintRecipientAddress(e.target.value)}
          className="w-full p-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
                    focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                    disabled:bg-gray-100 disabled:text-gray-500 disabled:border-gray-200"
          placeholder="Recipient's Address"
        />
      </div>
      <div className="w-full">
        <label htmlFor="mintAdminPrivateKey" className="sr-only">Admin's Private Key</label>
        <input
          id="mintAdminPrivateKey"
          type="text"
          value={mintAdminPrivateKey}
          onChange={(e) => setMintAdminPrivateKey(e.target.value)}
          className="w-full p-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
                    focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                    disabled:bg-gray-100 disabled:text-gray-500 disabled:border-gray-200"
          placeholder="Admin's Private Key"
        />
      </div>
      <button
        onClick={onMintTokens}
        className="w-full px-5 py-3 text-sm font-medium text-white transition-colors duration-150 bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-300 focus:outline-none"
      >
        Mint Tokens
      </button>
    </section>
  );
};

export default MintForm;

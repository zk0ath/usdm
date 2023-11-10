import React from 'react';

type SignatureFormProps = {
  signatureMintAmount: number;
  setSignatureMintAmount: React.Dispatch<React.SetStateAction<number>>;
  signatureZkAppPrivKey: string;
  setsignatureZkAppPrivKey: React.Dispatch<React.SetStateAction<string>>;
  signatureRecipientAddress: string;
  setSignatureReceipentAddress: React.Dispatch<React.SetStateAction<string>>;
  onCreateSignature: () => void;
};

const SignatureForm: React.FC<SignatureFormProps> = ({
  signatureMintAmount,
  setSignatureMintAmount,
  signatureZkAppPrivKey,
  setsignatureZkAppPrivKey,
  signatureRecipientAddress,
  setSignatureReceipentAddress,
  onCreateSignature,
}) => {
  return (
    <section className="flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow space-y-3">
      <h2 className="text-lg font-semibold text-gray-700">Create Signature</h2>
      <div className="w-full">
        <label htmlFor="signatureMintAmount" className="sr-only">Amount to Mint</label>
        <input
          id="signatureMintAmount"
          type="number"
          value={signatureMintAmount.toString()}
          onChange={(e) => setSignatureMintAmount(Number(e.target.value))}
          className="w-full p-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
                    focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                    disabled:bg-gray-100 disabled:text-gray-500 disabled:border-gray-200 
                    invalid:border-red-500 invalid:text-red-600 
                    focus:invalid:border-red-500 focus:invalid:ring-red-500"
          min="0"
        />
      </div>
      <div className="w-full">
        <label htmlFor="signatureZkAppPrivKey" className="sr-only">zkApp PrivKey</label>
        <input
          id="signatureZkAppPrivKey"
          type="text"
          value={signatureZkAppPrivKey}
          onChange={(e) => setsignatureZkAppPrivKey(e.target.value)}
          className="w-full p-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
                    focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                    disabled:bg-gray-100 disabled:text-gray-500 disabled:border-gray-200"
          placeholder="Signature"
        />
      </div>
      <div className="w-full">
        <label htmlFor="signatureRecipientAddress" className="sr-only">RecipientAddress</label>
        <input
          id="signatureRecipientAddress"
          type="text"
          value={signatureRecipientAddress}
          onChange={(e) => setSignatureReceipentAddress(e.target.value)}
          className="w-full p-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
                    focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                    disabled:bg-gray-100 disabled:text-gray-500 disabled:border-gray-200"
          placeholder="Recipient's Address"
        />
      </div>
      <button
        onClick={onCreateSignature}
        className="w-full px-5 py-3 text-sm font-medium text-white transition-colors duration-150 bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-300 focus:outline-none"
      >
        Create
      </button>
    </section>
  );
};

export default SignatureForm;

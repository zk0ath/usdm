import { Dispatch, SetStateAction } from 'react';

type MintFormProps = {
  mintAmount: number;
  setMintAmount: Dispatch<SetStateAction<number>>;
  onMintTokens: () => void;
};

const MintForm: React.FC<MintFormProps> = ({
  mintAmount,
  setMintAmount,
  onMintTokens,
}) => {
  return (
    <div className="flex flex-col space-y-2 items-center">
      <input
        type="number"
        value={mintAmount}
        onChange={(e) => setMintAmount(Number(e.target.value))}
        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                  disabled:bg-gray-100 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none
                  invalid:border-pink-500 invalid:text-pink-600
                  focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
        min="0" // Assuming mintAmount can't be negative
      />
      <button
        onClick={onMintTokens}
        className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
      >
        Mint Tokens
      </button>
    </div>
  );
};

export default MintForm;

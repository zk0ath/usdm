import { Dispatch, SetStateAction } from 'react';

type BurnFormProps = {
  burnAmount: number;
  setBurnAmount: Dispatch<SetStateAction<number>>;
  onBurnTokens: () => void;
};

const BurnForm: React.FC<BurnFormProps> = ({
  burnAmount,
  setBurnAmount,
  onBurnTokens,
}) => {
  return (
    <div className="flex flex-col space-y-2 items-center">
      <input
        type="number"
        value={burnAmount}
        onChange={(e) => setBurnAmount(Number(e.target.value))}
        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                  disabled:bg-gray-100 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none
                  invalid:border-pink-500 invalid:text-pink-600
                  focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
        min="0" // Assuming burnAmount can't be negative
      />
      <button
        onClick={onBurnTokens}
        className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Burn Tokens
      </button>
    </div>
  );
};

export default BurnForm;

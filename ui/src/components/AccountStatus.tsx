import React from 'react';

type AccountStatusProps = {
  accountExists: boolean;
  publicKey58: string;
};

const AccountStatus: React.FC<AccountStatusProps> = ({ accountExists, publicKey58 }) => {
  if (!accountExists) {
    const faucetLink = `https://faucet.minaprotocol.com/?address=${publicKey58}`;
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 mb-4 rounded">
        <span className="mr-2">Account does not exist.</span>
        <a href={faucetLink} 
           target="_blank" 
           rel="noopener noreferrer" 
           className="text-blue-600 hover:text-blue-800 underline">
          Visit the faucet to fund this fee payer account
        </a>
      </div>
    );
  }


  return (
    <div className="p-4 bg-green-100 border border-green-400 text-green-700 mb-4 rounded">
      <span>Account is set up and ready to use.</span>
    </div>
  ) || null;
};

export default AccountStatus;

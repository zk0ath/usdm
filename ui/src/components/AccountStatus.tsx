import { toast } from 'react-toastify';
import React, { useEffect } from 'react';

type AccountStatusProps = {
  accountExists: boolean;
  publicKey58: string;
};

const AccountStatus: React.FC<AccountStatusProps> = ({ accountExists, publicKey58 }) => {
  useEffect(() => {
    if (!accountExists) {
      const faucetLink = `https://faucet.minaprotocol.com/?address=${publicKey58}`;
      toast.error(
        <div>
          Account does not exist.{' '}
          <a href={faucetLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
            Visit the faucet to fund this fee payer account
          </a>
        </div>,
        {
          position: toast.POSITION.BOTTOM_RIGHT,
        }
      );
    } else {
      toast.success("Account is set up and ready to use.", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  }, [accountExists, publicKey58]);

  return null;
};

export default AccountStatus;


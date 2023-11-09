import { toast } from 'react-toastify';
import { useEffect } from 'react';


type WalletStatusProps = {
    hasWallet: boolean;
    publicKey: string;
  };
  
  const WalletStatus = ({ hasWallet, publicKey }: WalletStatusProps) => {
    useEffect(() => {
      if (!hasWallet) {
        toast.error("Wallet Not Detected! Could not find a wallet.", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      } else {
        toast.success(`Wallet Connected! Public Key: ${publicKey}`, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    }, [hasWallet, publicKey]);
  
    return null; // No need to return any JSX, as the toast handles the display
  };
  
  export default WalletStatus;
  
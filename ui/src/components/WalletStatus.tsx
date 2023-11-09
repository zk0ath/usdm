type WalletStatusProps = {
    hasWallet: boolean;
    publicKey: string;
  };
  
  const WalletStatus = ({ hasWallet, publicKey }: WalletStatusProps) => {
    if (!hasWallet) {
      const auroLink = 'https://www.aurowallet.com/';
      return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Wallet Not Detected! </strong>
          <span className="block sm:inline">Could not find a wallet. </span>
          <a href={auroLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 underline">
            Install Auro wallet here
          </a>.
        </div>
      );
    }
  
    // Optionally render the publicKey if wallet is found and you wish to display it
    return (
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Wallet Connected! </strong>
        <span className="block sm:inline">Public Key: {publicKey}</span>
      </div>
    ) || null;
  };
  
  export default WalletStatus;
  
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import { Provider } from "react-redux";
import store from "../store";
import { ToastContainer } from "react-toastify";
import Navigation from "@/components/Navigation";
import "react-toastify/dist/ReactToastify.css";
import {
  Mainnet,
  MetamaskConnector,
  CoinbaseWalletConnector,
  Config,
  DAppProvider,
} from "@usedapp/core";
import { WalletConnectConnector } from "@usedapp/wallet-connect-connector";
import "./reactCOIServiceWorker";

const config: Config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {},
  connectors: {
    metamask: new MetamaskConnector(),
    coinbase: new CoinbaseWalletConnector(),
    walletConnect: new WalletConnectConnector({
      infuraId: "d8df2cb7844e4a54ab0a782f608749dd",
    }),
    // portis: new PortisConnector(PORTIS_DAPP_ID, 'mainnet'),
  },
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Provider store={store}>
        <DAppProvider config={config}>
          <Navigation />
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Component {...pageProps} />
        </DAppProvider>
      </Provider>
    </Layout>
  );
}

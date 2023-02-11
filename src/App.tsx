import { WagmiConfig, createClient, configureChains } from "wagmi";

import { alchemyProvider } from "wagmi/providers/alchemy";

import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

import { polygonMumbai } from "wagmi/chains";

import { ALCHEMY_API_KEY } from "./key";
import Profile from "./Profile";

import { Buffer } from "buffer";
Buffer.from("anything", "base64");
window.Buffer = window.Buffer || require("buffer").Buffer;

const { chains, provider, webSocketProvider } = configureChains(
  [polygonMumbai],
  [alchemyProvider({ apiKey: ALCHEMY_API_KEY})]
);

// Set up client
const client = createClient({
  autoConnect: true,
  connectors: [
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new MetaMaskConnector({
      chains,
    }),
  ],
  provider,
  webSocketProvider,
});

// Pass client to React Context Provider
export default function App() {
  return (
    <WagmiConfig client={client}>
      <Profile />
    </WagmiConfig>
  );
}

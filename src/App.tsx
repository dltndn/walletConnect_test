import { WagmiConfig, createClient, configureChains } from "wagmi";

import { publicProvider } from "wagmi/providers/public";

import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

import { goerli, polygonMumbai } from "wagmi/chains";
import Profile from "./Profile";

import { Buffer } from "buffer";
Buffer.from("anything", "base64");
window.Buffer = window.Buffer || require("buffer").Buffer;

const { chains, provider, webSocketProvider } = configureChains(
  [goerli, polygonMumbai],
  [publicProvider()]
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

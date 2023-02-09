import { WagmiConfig, createClient, configureChains } from "wagmi";

import { alchemyProvider } from "wagmi/providers/alchemy";

import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

import { mainnet, polygonMumbai } from "wagmi/chains";
import Profile from "./Profile";

import { Buffer } from "buffer";
Buffer.from("anything", "base64");
window.Buffer = window.Buffer || require("buffer").Buffer;

const alchemy_api_key = "_86jypJDpkw3HQgYXr9I5NgFWPJnLBQf"

const { chains, provider, webSocketProvider } = configureChains(
  [polygonMumbai],
  [alchemyProvider({ apiKey: alchemy_api_key})]
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

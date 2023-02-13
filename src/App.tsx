import { WagmiConfig, createClient, configureChains } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import Profile from "./Profile";
import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { projectId } from "./key"

import { Buffer } from "buffer";
Buffer.from("anything", "base64");
window.Buffer = window.Buffer || require("buffer").Buffer;

const chains = [polygonMumbai]

const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId }),
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({
    projectId,
    version: "1", // or "2"
    appName: "web3Modal",
    chains,
  }),
  provider,
});

const ethereumClient = new EthereumClient(wagmiClient, chains);

// Pass client to React Context Provider
export default function App() {
  return (
    <>
    <WagmiConfig client={wagmiClient}>
      <Profile />
    </WagmiConfig>
    
    <Web3Modal
        projectId={projectId}
        ethereumClient={ethereumClient}
      />
    </>
  );
}

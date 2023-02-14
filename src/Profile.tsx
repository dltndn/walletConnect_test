import { useConnect, useAccount } from "wagmi";
import GetQkrwBalance from "./getQkrwBalance";
import SendQkrw from "./sendQkrw";
import { Web3Button } from "@web3modal/react";

export default function Profile() {
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();

  const { address, isConnected } = useAccount();

  return (
    <div>
      <Web3Button icon="hide" label="지갑연결" balance="hide"/>

      {error && <div>{error.message}</div>}
      <h4>
        연결여부:{" "}
        {isConnected ? (
          <div>
            <div>연결됨</div>
            <h3>연결된 지갑주소: {address}</h3>
            <p></p>
            {isConnected && address && <GetQkrwBalance address={address}/>}
            {isConnected && address && <SendQkrw address={address}/>}
          </div>
        ) : (
          "연결안됨"
        )}
      </h4>
    </div>
  );
}

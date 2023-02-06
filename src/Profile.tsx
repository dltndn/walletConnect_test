import { useConnect, useAccount, useDisconnect } from "wagmi";
import SendEth from "./sendEth";
import GetBalance from "./getBalance";

export default function Profile() {
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();

  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <div>
      {connectors.map((connector) => (
        <button
          disabled={isConnected}
          key={connector.id}
          onClick={() => {
            connect({ connector });
          }}
        >
          {connector.name}
          {!connector.ready && " (unsupported)"}
          {isLoading &&
            connector.id === pendingConnector?.id &&
            " (connecting)"}
        </button>
      ))}

      {error && <div>{error.message}</div>}
      <h4>
        연결여부:{" "}
        {isConnected ? (
          <div>
            <div>연결됨</div>
            <h3>연결된 지갑주소: {address}</h3>
            {isConnected && address && <GetBalance address={address} />}
            <button onClick={() => disconnect()}>지갑연결해제</button>
            <p></p>
            <SendEth />
            
          </div>
        ) : (
          "연결안됨"
        )}
      </h4>
      <button onClick={()=> alert("이건 되네")}>test btn</button>
    </div>
  );
}

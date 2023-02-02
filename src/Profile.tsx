import { useConnect, useAccount, useDisconnect } from 'wagmi'
 
export default function Profile() {
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect()

    const { address, isConnected } = useAccount();
    const { disconnect } = useDisconnect()
 
  return (
    <div>
      {connectors.map((connector) => (
        <button
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => {connect({ connector })}}
        >
          {connector.name}
          {!connector.ready && ' (unsupported)'}
          {isLoading &&
            connector.id === pendingConnector?.id &&
            ' (connecting)'}
        </button>
      ))}
 
      {error && <div>{error.message}</div>}
      <h4>연결여부: {isConnected ? (<div><div>연결됨</div><button onClick={()=>disconnect()}>연결해제</button></div>) : "연결안됨"}</h4>
      <h3>지갑주소: {address}</h3>
    </div>
  )
}


import { useNetwork, useSwitchNetwork } from 'wagmi'
import { useEffect } from 'react'
 
export default function CheckNetwork() {
  const { chain } = useNetwork()
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork()

    console.log(chain)
  return (
    <>
      {chain && <div>Connected to {chain.name}</div>}
 
      {chains.map((x) => (
        <button
          disabled={!switchNetwork || x.id === chain?.id}
          key={x.id}
          onClick={() => switchNetwork?.(x.id)}
        >
          {x.name}
          {isLoading && pendingChainId === x.id && ' (switching)'}
        </button>
      ))}
 
      <div>{error && error.message}</div>
    </>
  )
}
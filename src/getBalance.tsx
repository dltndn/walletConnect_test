import { useBalance } from "wagmi";
import { utils, BigNumber } from "ethers";

type AddressProps = {
    address: `0x${string}`;
  };

export default function GetBalance({address}: AddressProps) {
    // const { `0x${string}` } = address.params;
  const ethBalance = useBalance({
    address,
  })
  
  let walletEthFBalance = ethBalance.data?.value.toString()
  const balance = BigNumber.from(walletEthFBalance)
  const formatedBalance = utils.formatEther(balance)
  return (
    <>
        <div>현재 ETH 수량: {formatedBalance}</div>
    </>
  )
}


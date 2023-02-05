import { useBalance } from "wagmi";
import { utils, BigNumber } from "ethers";

type AddressProps = {
    address: `0x${string}`;
  };

export default function GetBalance({address}: AddressProps) {
  const ethBalance = useBalance({
    address,
  })
  
  let walletEthBalance = ethBalance.data?.value
//   const balance = BigNumber.from(walletEthBalance)
const balance = walletEthBalance ? BigNumber.from(walletEthBalance) : BigNumber.from(0);
  const formatedBalance = utils.formatEther(balance)
  return (
    <>
        <div>현재 ETH 수량: {formatedBalance}</div>
    </>
  )
}


import { useWaitForTransaction } from "wagmi";

type AddressProps = {
    hashData: `0x${string}`;
  };

  const getTxUrl = (hash: string) => {
    return `https://mumbai.polygonscan.com/tx/${hash}`;
  };

export default function GetTransactionUrl({hashData}: AddressProps) {
    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: hashData,
      })

    return(<>
        {isLoading && <div>transaction pending...</div>}
        {isSuccess ? (<a href={getTxUrl(hashData)} target="_blank" rel="noreferrer">
            확인하러가기
          </a>):(<></>)}
    </>)
}
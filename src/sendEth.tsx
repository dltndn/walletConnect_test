import { utils } from "ethers";
import { useSendTransaction, usePrepareSendTransaction } from "wagmi";
import { useState } from "react";

export default function SendEth() {
  const [recievedAddress, setrecieveAddress] = useState("");
  const [sendingAmmount, setSendingAmmount] = useState("");
  const { config } = usePrepareSendTransaction({
    request: {
      to: recievedAddress,
      value: utils.parseEther("0.001"),
    },
  });

  const { data, isLoading, isSuccess, sendTransaction } =
    useSendTransaction(config);
  let transactionUrl = `https://goerli.etherscan.io/tx/${data?.hash.toString()}` 
  return (
    <>
      <input
        type="text"
        value={recievedAddress}
        style={{ width: "20rem" }}
        placeholder="전송받는 지갑주소를 입력하세요"
        onChange={(event) => setrecieveAddress(event.target.value)}
      />
      <p></p>
      <input
        type="text"
        value={sendingAmmount}
        style={{ width: "10rem" }}
        placeholder="전송할 이더 수량을 입력하세요"
        onChange={(event) => setSendingAmmount(event.target.value)}
      />

      <button disabled={!sendTransaction} onClick={() => sendTransaction?.()}>
        전송
      </button>
      {isLoading && <div>Check Wallet</div>}
      {isSuccess && (
        <div>
          <div>전송완료</div>
          <p>Transaction: {JSON.stringify(data?.hash)}</p>
          <a href={transactionUrl}>확인하러가기</a>
        </div>
      )}
    </>
  );
}

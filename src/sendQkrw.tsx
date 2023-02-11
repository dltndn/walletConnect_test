import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { useState, useEffect } from "react";
import { REACT_APP_QKRW_CONTRACT_ABI, QKRW_ADDRESS } from "./key";
import { utils } from "ethers";
import GetTransactionUrl from "./getTransactionUrl";

//Qkrw token contract information - polygon mumbai network
const Qkrw_abi = REACT_APP_QKRW_CONTRACT_ABI;
const Qkrw_address = QKRW_ADDRESS;

type AddressProps = {
  address: `0x${string}`;
};

export default function SendQkrw({ address }: AddressProps) {
  const [recievedAddress, setRecievedAddress] = useState("");
  const [sendingAmmount, setSendingAmmount] = useState("");
  const [transactionUrl, setTransactionUrl] = useState("");
  const [beforeFormatedAmm, setBeforeFormatedAmm] = useState("");
  const [hash, setHash] = useState<`0x${string}`>("0x123")

  const formatTokenAmm = (amm: string) => {
    if (amm !== "") {
      let result;
      result = utils.parseUnits(amm, 18);
      setSendingAmmount(BigInt(result._hex).toString());
    }
    console.log("비어있는 amm");
  };

  const { config } = usePrepareContractWrite({
    address: Qkrw_address,
    abi: Qkrw_abi,
    functionName: "transfer",
    args: [recievedAddress, sendingAmmount],
    overrides: { from: address },
  });

  const { data, isLoading, isSuccess, write } = useContractWrite({
    ...config,
    onSuccess(data) {
    //   setTransactionUrl(getTxUrl(data.hash));
    setHash(data.hash)
    },
    onError(error) {
      console.log(error);
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setRecievedAddress("");
      setSendingAmmount("");
      setBeforeFormatedAmm("");
    }
  }, [isSuccess]);

  useEffect(() => {
    formatTokenAmm(beforeFormatedAmm);
  }, [beforeFormatedAmm]);
  return (
    <>
      <h2>krw 전송</h2>
      <input
        type="text"
        value={recievedAddress}
        style={{ width: "20rem" }}
        placeholder="전송받는 지갑주소를 입력하세요"
        onChange={(event) => setRecievedAddress(event.target.value)}
      />
      <p></p>
      <input
        type="text"
        value={beforeFormatedAmm}
        style={{ width: "10rem" }}
        placeholder="전송할 QKRW 수량을 입력하세요"
        onChange={(event) => setBeforeFormatedAmm(event.target.value)}
      />
      <button disabled={!write} onClick={() => write?.()}>
        전송
      </button>
      {isLoading && <div>Check Wallet</div>}
      {isSuccess && (
        <div>
          Transaction: {JSON.stringify(data)}
          <p></p>
          <GetTransactionUrl hashData={hash} />
        </div>
      )}
    </>
  );
}

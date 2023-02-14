import { utils } from "ethers";
import {
  useContract,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useBlockNumber
} from "wagmi";
import { useState, useEffect } from "react";
import { REACT_APP_QKRW_CONTRACT_ABI, QKRW_ADDRESS } from "./key";
// import contractQkrw from "./contractQkrw.json"

const Qkrw_abi = REACT_APP_QKRW_CONTRACT_ABI
const Qkrw_address = QKRW_ADDRESS

type AddressProps = {
  address: `0x${string}`;
};

export default function SendToken({ address }: AddressProps) {
  const [recievedAddress, setRecievedAddress] = useState("");
  const [sendingAmmount, setSendingAmmount] = useState("");
  const [krwBalance, setKrwBalance] = useState("0");
  const [objData, setObjData] = useState<any>();

  const { data, isError, isLoading } = useContractRead({
      address: Qkrw_address,
      abi: Qkrw_abi,
      functionName: 'balanceOf',
      args: [address],
      overrides: { from: address },
      onSuccess(data) {
          setObjData(data)
      },
    })

    useEffect(()=> {
      console.log(objData?._hex)
      // console.log(BigInt(objData?._hex).toString().slice(0, -18))
      objData === undefined ? (setKrwBalance("0")):(setKrwBalance(BigInt(objData?._hex).toString().slice(0, -18)))
    },[objData])
  return (
    <>
      <h2>krw 잔액</h2>
    <p></p>
    <div>현재 KRW 잔액: {krwBalance}</div>
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
        value={sendingAmmount}
        style={{ width: "10rem" }}
        placeholder="전송할 QKRW 수량을 입력하세요"
        onChange={(event) => setSendingAmmount(event.target.value)}
      />
    </>
  );
}

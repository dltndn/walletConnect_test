import { utils } from "ethers";
import { useContract, useContractRead } from "wagmi";
import { useState, useEffect } from "react";
import { REACT_APP_QKRW_CONTRACT_ABI, QKRW_ADDRESS } from "./key";

const Qkrw_abi = REACT_APP_QKRW_CONTRACT_ABI;
const Qkrw_address = QKRW_ADDRESS;


type AddressProps = {
    address: `0x${string}`;
  };

export default function SendToken({address}: AddressProps) {
    const [recievedAddress, setRecievedAddress] = useState('');
    const [sendingAmmount, setSendingAmmount] = useState('');
    const [krwBalance, setKrwBalance] = useState('');
    const [stringAddress, setStringAddress] = useState(address.toString())

    const checkValueEmpty = ():boolean => {
        if (recievedAddress === '') {
            if (sendingAmmount === ''){
                return true;
            }
        }
        return false
    }

    const { data, isError, isLoading } = useContractRead({
        address,
        abi: Qkrw_abi,
        functionName: 'balanceOf',
        args: [stringAddress],
      })
      alert(data)

//   const sendQkrw = async () => {
//     const tx = await QkrwContract?.transfer(recievedAddress, sendingAmmount)
//     const response = await tx.wait()
//     console.log(`Transaction response: ${response}`)
//   }

  return (
    <>
    <h2>krw 잔액</h2>
    <p></p>
    <div>현재 KRW 수량: {krwBalance}</div>
    <div>is Error: {isError}</div>
    <div>is Loading: {isLoading}</div>
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

      <button disabled={checkValueEmpty()} onClick={() => console.log("transfer")}>
        전송
      </button>
    </>
  );
}

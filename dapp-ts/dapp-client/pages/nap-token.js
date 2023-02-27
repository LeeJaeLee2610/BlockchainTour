import { api } from "../constants/constants";
import { ethers } from "ethers";

export default function NapToken() {
  const handleClick = async () => {
    const from = document.querySelector(".from").value;
    const to = document.querySelector(".to").value;
    const amount = document.querySelector(".amount").value;
    console.log(from, to, amount);
    if (!window.ethereum) {
      console.log("pls install metamask");
    } else {
      await window.ethereum.send("eth_requestAccounts");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const singer = provider.getSigner();
      const tx = await singer.sendTransaction({
        to: to,
        value: ethers.utils.parseEther(amount),
      });
      await tx.wait();
      fetch(`${api}/buy-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ from: to, to: from, ether: amount }),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res);
        });
    }
  };
  return (
    <>
      <h1 className="text-[20px] text-center">Send ETH payment</h1>
      <div className="w-full flex justify-center items-center bg-slate-300">
        <div className="w-[300px] p-4">
          <div>
            <div className="my-3">
              <label>Người nhận:</label>
              <input
                type="text"
                name="addr"
                className="to w-full focus:ring focus:outline-none p-3 rounded-lg"
                placeholder="Recipient Address"
                value="0xd765deAD1FD356cadE65B451FCcAdc3Cb1d30F32"
                readOnly
              />
            </div>
            <div className="my-3">
              <label>From:</label>
              <input
                type="text"
                name="addr"
                className="from w-full focus:ring focus:outline-none p-3 rounded-lg"
                placeholder="From Address"
              />
            </div>
            <div className="my-3">
              <label>Amount:</label>
              <input
                name="ether"
                type="text"
                className="amount w-full focus:ring focus:outline-none p-3 rounded-lg"
                placeholder="Amount in ETH"
              />
            </div>
          </div>
          <button
            className="bg-blue-200 w-full rounded-md"
            onClick={handleClick}
          >
            Nạp tiền
          </button>
        </div>
      </div>
      <div>
        <h1 className="flex justify-center items-center">Giá quy đổi:</h1>
        <span className="flex justify-center items-center">
          0.01 ETH = 100 MyT
        </span>
      </div>
    </>
  );
}

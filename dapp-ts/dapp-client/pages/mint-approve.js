import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { api } from "../constants/constants";

const MintApprove = () => {
  const routerHome = useRouter();

  const handleClickHome = (e) => {
    e.preventDefault();
    routerHome.push("/");
  };
  const handleMint = async () => {
    const address = document.querySelector(".address-mint").value;
    const amount = document.querySelector(".amount-mint").value;
    // console.log(address, amount);
    fetch(`${api}/mint`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ account: address, amount: amount }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
      });
  };
  const handleApprove = async () => {
    const address = document.querySelector(".address-approve").value;
    const amount = document.querySelector(".amount-approve").value;
    // console.log(address, amount);
    fetch(`${api}/approve`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        account: address,
        amount: amount,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
      });
  };
  return (
    <>
      <header className="flex items-center pl-2 pr-2 pt-[20px] pb-[20px] bg-slate-100 sticky top-0">
        <div className="basis-1/4 flex justify-start cursor-pointer hover:underline hover:decoration-1 hover:text-pink-300 text-[20px] font-bold">
          Dapp
        </div>
        <div className="basis-1/2 flex justify-center">
          <div
            onClick={handleClickHome}
            className="cursor-pointer hover:underline hover:decoration-1 hover:text-pink-300 text-[20px] font-bold"
          >
            Home
          </div>
        </div>
      </header>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex justify-center items-center">
          <div>
            <h1>Mint MyT</h1>
            <div className="flex justify-center items-center">
              <div>Address:</div>
              <input
                type="text"
                className="address-mint p-3"
                placeholder="Address"
              ></input>
            </div>
            <div className="flex justify-center items-center">
              <div>Amount:</div>
              <input
                type="text"
                className="amount-mint p-3"
                placeholder="Amount"
              ></input>
            </div>
            <button onClick={handleMint} className="p-3 bg-pink-300 rounded-lg">
              Mint
            </button>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div>
            <h1>Approve MyT</h1>
            <div className="flex justify-center items-center">
              <div>Address:</div>
              <input
                type="text"
                className="address-approve p-3"
                placeholder="Address"
              ></input>
            </div>
            <div className="flex justify-center items-center">
              <div>Amount:</div>
              <input
                type="text"
                className="amount-approve p-3"
                placeholder="Amount"
              ></input>
            </div>
            <button
              onClick={handleApprove}
              className="p-3 bg-pink-300 rounded-lg"
            >
              Approve
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MintApprove;

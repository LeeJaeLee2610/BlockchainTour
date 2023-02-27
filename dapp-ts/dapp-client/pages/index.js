import { Fragment, useEffect, useState } from "react";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import CardHomeList from "../components/card/CardHomeList.js";
import { api } from "../constants/constants.js";

export default function Home() {
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState("");
  const [symbol, setSymbol] = useState("");
  const routerInfoAccount = useRouter();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    getCurrentWalletConnected();
    addWalletAccount();
    // console.log(contract);
    fetch(`${api}/get-cards`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        // console.log(res);
        setCards(res);
      })
      .catch((err) => {
        console.log(err);
      });
    fetch(`${api}/symbol`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        // console.log(res);
        setSymbol(res.symbol);
      });
  }, [account]);

  const handleConnectWallet = async () => {
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        console.log(account);
      } catch (error) {}
    } else {
      console.log("pls install Metamask");
    }
  };

  const getCurrentWalletConnected = async () => {
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          await window.ethereum
            .request({
              method: "eth_getBalance",
              params: [accounts[0], "latest"],
            })
            .then((result) => {
              setBalance(ethers.utils.formatEther(result));
            });
          localStorage.setItem("account", account);
          localStorage.setItem("balance", balance);
          console.log(accounts[0]);
        } else {
          console.log("Connect to metamask using Button Connect Wallet");
          localStorage.removeItem("account");
          localStorage.removeItem("balance");
        }
      } catch (error) {
        console.error(error.message);
      }
    } else {
      console.log("Pls install Metamask");
    }
  };

  const addWalletAccount = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("accountsChanged", (accounts) => {
        setAccount(accounts[0]);
        console.log(accounts[0]);
      });
    } else {
      setAccount("");
      console.log("Pls install MetaMask");
    }
  };

  const handleAR = (e) => {
    e.preventDefault();
    routerInfoAccount.push("/account");
    localStorage.setItem("balance", balance);
  };

  return (
    <>
      <header className="flex items-center pl-2 pr-2 pt-[20px] pb-[20px] bg-slate-100 sticky top-0">
        <div className="basis-1/4 flex justify-start text-[20px] font-bold cursor-pointer hover:underline hover:decoration-1 hover:text-pink-300">
          Dapp
        </div>
        <div className="flex flex-1 basis-1/2 justify-center text-[20px] font-bold cursor-pointer hover:underline hover:decoration-1 hover:text-pink-300">
          <div>Home</div>
        </div>
        {!account ? (
          <div
            className="basis-1/4 flex justify-end text-[20px] font-bold cursor-pointer hover:underline hover:decoration-1 hover:text-pink-300"
            onClick={handleConnectWallet}
          >
            Connect Wallet
          </div>
        ) : (
          <div
            className="basis-1/4 flex justify-end text-[20px] font-bold cursor-pointer hover:underline hover:decoration-1 hover:text-pink-300"
            onClick={handleAR}
          >
            Connected
          </div>
        )}
      </header>
      <section className="grid grid-cols-5 gap-2 mt-5">
        <CardHomeList cards={cards} symbol={symbol}></CardHomeList>
      </section>
    </>
  );
}

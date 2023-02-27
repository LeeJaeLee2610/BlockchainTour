import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CardAccountList from "../components/card/CardAccountList";
import { api } from "../constants/constants";

const InfoAccount = () => {
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState("");
  const [symbol, setSymbol] = useState("");
  const [owner, setOwner] = useState(
    "0xd765deAD1FD356cadE65B451FCcAdc3Cb1d30F32",
  );
  const [balanceToken, setBalanceToken] = useState("");
  const routerHome = useRouter();
  const addCardRouter = useRouter();
  const napTokenRouter = useRouter();
  const [cards, setCards] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("account")) {
      setAccount(localStorage.getItem("account"));
      setBalance(localStorage.getItem("balance"));
    }
    fetch(`${api}/get-cards-by-account/${localStorage.getItem("account")}`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        // console.log(res);
        const result = res.filter((item) => {
          return item.id !== "0";
        });
        setCards(result);
      })
      .catch((err) => {
        console.log(err);
      });
    fetch(`${api}/get-balances`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ account: localStorage.getItem("account") }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        // console.log(res);
        setBalanceToken(res);
      })
      .catch((err) => {
        console.log(err);
      });
    fetch(`${api}/symbol`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setSymbol(res.symbol);
      });
  }, []);

  const handleClickHome = (e) => {
    e.preventDefault();
    routerHome.push("/");
  };

  const handleThem = (e) => {
    e.preventDefault();
    addCardRouter.push("/add-card");
  };

  const handleNapToken = (e) => {
    e.preventDefault();
    napTokenRouter.push("/nap-token");
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
      <section className="flex justify-end bg-white w-full text-right">
        <div className="mr-5">
          <div className="pt-3 pb-3 text-[20px] font-medium">
            Account: {account}
          </div>
          <div className="pt-3 pb-3 text-[20px] font-medium">
            Balance: {parseFloat(balance).toFixed()} ETH
          </div>
          <div className="pt-3 pb-3 text-[20px] font-medium">
            {balanceToken} MyT
          </div>
        </div>
      </section>
      <section
        className="flex justify-end items-end mr-5 cursor-pointer"
        onClick={handleNapToken}
      >
        <span className="pt-3 pb-3 bg-pink-400 w-[200px] text-center rounded-xl font-semibold text-[20px]">
          Nạp Token
        </span>
      </section>
      <section className="flex justify-center items-center mt-5 w-full">
        <button
          className="w-[50%] pt-3 pb-3 bg-pink-400 text-[20px] font-semibold border rounded-lg"
          onClick={handleThem}
        >
          Thêm Card
        </button>
      </section>
      <section className="grid grid-cols-5 gap-2 mt-5">
        <CardAccountList cards={cards} symbol={symbol}></CardAccountList>
      </section>
    </>
  );
};

export default InfoAccount;

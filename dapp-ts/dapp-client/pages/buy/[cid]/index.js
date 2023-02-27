import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api, hrefImage } from "../../../constants/constants";
import { ethers } from "ethers";

export default function Cid() {
  const router = useRouter();
  const [symbol, setSymbol] = useState("");
  const [owner, setOwner] = useState("");
  const { cid } = router.query;
  const [card, setCard] = useState(null);
  const routerHome = useRouter();

  useEffect(() => {
    if (cid !== undefined) {
      fetch(`${api}/get-card-by-tokenId/${cid}`)
        .then((res) => {
          return res.json();
        })
        .then((res) => setCard(res));
      fetch(`${api}/symbol`)
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res);
          setSymbol(res.symbol);
        });
      fetch(`${api}/get-owner-by-tokenId/${cid}`)
        .then((res) => {
          // console.log(res);
          return res.json();
        })
        .then((res) => {
          setOwner(res.owner);
          // console.log(res);
        });
    }
  }, [cid]);

  const handleBuy = (card) => {
    const from = document.querySelector(".account").value;
    const to = owner;
    const tokenId = cid;
    const token = card.token;
    console.log(from, to, tokenId, token);
    fetch(`${api}/buy-nft-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: from,
        to: to,
        tokenId: tokenId,
        token: token,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
      });
    console.log(token);
  };
  const handleBuyByETH = async (card) => {
    if (!window.ethereum) {
      console.log("pls install metamask");
    } else {
      const from = document.querySelector(".account").value;
      console.log(from);
      const to = owner;
      const tokenId = cid;
      const eth = card.eth;
      await window.ethereum.send("eth_requestAccounts");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const singer = provider.getSigner();
      const tx = await singer.sendTransaction({
        to: to,
        value: ethers.utils.parseEther(parseFloat(eth).toString()),
      });
      await tx.wait();
      // console.log(from, to, tokenId, token);
      fetch(`${api}/buy-nft-eth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: to,
          to: from,
          tokenId: tokenId,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res);
        });
    }
  };

  const handleClickHome = (e) => {
    e.preventDefault();
    routerHome.push("/");
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
      {card ? (
        <div className="flex justify-center items-center">
          <div>
            <div>
              <img
                src={`${hrefImage}${card.image}`}
                alt=""
                className="w-[500px] h-[500px] object-cover overflow-hidden"
              />
            </div>
            <div>
              <h2>Owner: {owner}</h2>
              <h2>Name: {card.name}</h2>
              <h4>ETH: {card.eth} ETH</h4>
              <h4>
                MyT: {card.token} {symbol}
              </h4>
              <div>
                <label>Account:</label>
                <input
                  type="text"
                  name="account"
                  placeholder="address account"
                  className="account ml-3 p-2"
                ></input>
              </div>
              <div className="w-full flex justify-between items-center pl-5 pr-5">
                <button
                  className="w-[40%] bg-pink-400 rounded-md"
                  onClick={() => {
                    handleBuy(card);
                  }}
                >
                  Buy MyT
                </button>
                <button
                  className="w-[40%] bg-pink-400 rounded-md"
                  onClick={() => {
                    handleBuyByETH(card);
                  }}
                >
                  Buy ETH
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

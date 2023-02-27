import { api } from "../constants/constants";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function AddCard() {
  const [account, setAccount] = useState("");
  const routerHome = useRouter();

  useEffect(() => {
    setAccount(localStorage.getItem("account"));
  }, []);

  const handleSubmit = () => {
    let address = account;
    let tokenId = document.querySelector(".tokenId").value;
    let image = document.querySelector(".image").files[0];
    let eth = document.querySelector(".eth").value;
    let token = document.querySelector(".myt").value;
    // console.log(address, tokenId, input, eth, token);
    upload(address, tokenId, image, eth, token);
  };

  function upload(address, tokenId, image, eth, token) {
    console.log(address, tokenId, image, eth, token);
    var formData = new FormData();
    formData.append("account", address);
    formData.append("tokenId", tokenId);
    formData.append("image", image);
    formData.append("eth", eth);
    formData.append("token", token);
    // console.log(formData);
    fetch(`${api}/add-card`, {
      method: "POST",
      body: formData,
    });
  }

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
      <div className="flex justify-center items-center bg-slate-300 mt-3 p-3">
        <div>
          <div>
            <label htmlFor="tokenId">TokenId:</label>
            <input
              type="text"
              className="tokenId ml-3 p-3"
              placeholder="TokenId"
            />
          </div>
          <div>
            <label htmlFor="file">Select File:</label>
            <input type="file" className="image p-3" name="image" />
          </div>
          <div>
            <label htmlFor="price">ETH:</label>
            <input type="text" className="eth ml-3 p-3" placeholder="ETH" />
          </div>
          <div>
            <label htmlFor="price">MyT:</label>
            <input type="text" className="myt ml-3 p-3" placeholder="MyT" />
          </div>
          <div className="flex justify-center items-center">
            <button
              onClick={handleSubmit}
              className="p-2 rounded-lg bg-pink-300"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

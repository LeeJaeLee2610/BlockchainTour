import express from "express";
import appRootPath from "app-root-path";
import multer from "multer";
import path from "path";
import fs from "fs";
import cors from "cors";
import bodyParser from "body-parser";
import { create } from "ipfs-http-client";
import { ethers } from "ethers";
import abi from "./abi/MyTokenAbi.js";

// Connect IPFS
const ipfs = await create({
  host: "127.0.0.1",
  port: 5001,
  protocol: "http",
});

// Create Express
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// middleware handle File Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, appRootPath + "/public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname),
    );
  },
});

const imageFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFilter });

// EtherJS
const provider = new ethers.providers.JsonRpcProvider(
  "https://eth-goerli.g.alchemy.com/v2/4jL3BtZd1dbfzUJN1KqQ5TvGU3rUBVHv",
);

// connect wallet owner create contract
const wallet = new ethers.Wallet(
  "3457d6119dd9ebe8d33c894189b4184abf43291a1fc2fa236dfc5eeac4d5d1b9",
  provider,
);

const wallet1 = new ethers.Wallet(
  "425905ccaf65891340be7795292f4100a8055a2327965d0582166d66b6896db2",
  provider,
);

const singer = wallet.provider.getSigner(wallet.address);
const contractAddress = "0xD08CF7F75A3C07D35eE9f16a252bC96e3BBBb084";

const contract = new ethers.Contract(contractAddress, abi, singer);

app.post("/mint", async (req, res) => {
  // OK
  try {
    console.log("OK");
    // console.log(req.body);
    const mint = await contract
      .connect(wallet)
      .mint(req.body.account, req.body.amount);
    await mint.wait();
    res.status(200).send({ message: "Success" });
  } catch (error) {
    res.status(400).send(error);
  }
});

// API
app.post("/approve", async (req, res) => {
  // OK
  try {
    const approve = await contract
      .connect(wallet)
      .approve(req.body.account, req.body.amount);
    await approve.wait();
    res.status(200).send({ message: "Success" });
  } catch (error) {}
});

app.post("/get-balances", async (req, res) => {
  // OK
  try {
    const balance = await contract.balanceOf(req.body.account);
    res.status(200).send(ethers.utils.formatUnits(balance, 0));
  } catch (error) {}
});

app.get("/symbol", async (req, res) => {
  // OK
  try {
    const symbol = await contract.symbol();
    res.status(200).send({ symbol: symbol });
  } catch (error) {}
});

app.post("/buy-token", async (req, res) => {
  // OK
  try {
    console.log(req.body);
    const token = (100 * parseFloat(req.body.ether)) / 0.01;
    console.log(token);
    const transfer = await contract
      .connect(wallet)
      .buyToken(req.body.from, req.body.to, token.toString());
    await transfer.wait();
    console.log("OK");
    res.status(200).send({ message: "Success" });
  } catch (error) {
    res.status(400).send(error);
  }
});

// wallet1 mua token wallet bang ether
// 0.01 eth = 100 token
// app.post("/send-token", async (req, res) => {
//   const a = (100 * parseFloat(req.body.ether)) / 0.01;
//   console.log(a);
//   const transferToken = await contract
//     .connect(wallet)
//     .transferToken(req.body.from, req.body.to, a.toString());
//   await transferToken.wait();
//   console.log(req.body);
//   res.status(200).send("OK");
// });

app.post("/transfer", async (req, res) => {
  try {
    const transfer = await contract
      .connect(wallet1)
      .transfer("0xd765deAD1FD356cadE65B451FCcAdc3Cb1d30F32", "20");
    console.log(transfer);
    await transfer.wait();
    res.status(200).send({ message: "Success" });
  } catch (error) {}
});

// giao dịch nft chuyển token
app.post("/buy-nft-token", async (req, res) => {
  try {
    const from = req.body.from;
    const to = req.body.to; // giữ NFT và nhận
    const tokenId = req.body.tokenId;
    const token = req.body.token;
    console.log(wallet1.address === req.body.to);
    const buyNFT = await contract
      .connect(wallet1.address === req.body.from ? wallet1 : wallet)
      .buyCardBuyToken(from, to, tokenId, token);
    await buyNFT.wait();
    console.log(from, to, token);
    res.status(200).send({ message: "Success" });
  } catch (error) {}
});

app.post("/buy-nft-eth", async (req, res) => {
  try {
    const buyNFT = await contract
      .connect(wallet)
      .transferFromNFT(req.body.from, req.body.to, req.body.tokenId);
    await buyNFT.wait();
    res.status(200).send({ message: "Success" });
  } catch (error) {}
});

app.post("/add-card", upload.single("image"), async (req, res) => {
  // OK
  try {
    let image = await ipfs.add(
      fs.readFileSync(req.file.path, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          return data;
        }
      }),
    );

    const account = req.body.account;
    const tokenId = req.body.tokenId;
    const imageHass = image.path;
    const iname = req.file.filename;
    const eth = req.body.eth;
    const token = req.body.token;
    const card = await contract
      .connect(wallet)
      .addCard(account, tokenId, imageHass, iname, eth, token);
    await card.wait();
    res.status(200).send({ message: "Success" });
  } catch (error) {}
});

app.get("/get-cards", async (req, res) => {
  // OK
  try {
    const cards = await contract.getCards();
    const result = [];
    console.log(cards);
    cards.map((item) => {
      result.push({
        id: ethers.utils.formatUnits(item.tokenId, 0),
        name: item.name,
        image: item.image,
        eth: item.eth,
        token: ethers.utils.formatUnits(item.token, 0),
      });
    });
    res.status(200).send(result);
  } catch (error) {}
});

app.get("/get-card-by-tokenId/:tokenId", async (req, res) => {
  // OK
  try {
    const tokenId = parseInt(req.params.tokenId);
    const card = await contract.getCardByTokenId(tokenId.toString());
    console.log(card);
    const result = {
      id: ethers.utils.formatUnits(card.tokenId, 0),
      name: card.name,
      image: card.image,
      eth: card.eth,
      token: ethers.utils.formatUnits(card.token, 0),
    };
    res.status(200).send(result);
  } catch (error) {}
});

app.get("/get-owner-by-tokenId/:tokenId", async (req, res) => {
  try {
    const owner = await contract.ownerOf(req.params.tokenId);
    res.status(200).send({ owner: owner });
  } catch (error) {}
});

app.get("/get-cards-by-account/:account", async (req, res) => {
  // OK
  try {
    const cards = await contract.getCardsByAddress(req.params.account);
    const result = [];
    cards.map((item) => {
      result.push({
        id: ethers.utils.formatUnits(item.tokenId, 0),
        name: item.name,
        image: item.image,
        eth: item.eth,
        token: ethers.utils.formatUnits(item.token, 0),
      });
    });
    res.status(200).send(result);
  } catch (error) {}
});

app.listen(3030);

/* eslint-disable comma-dangle */
/* eslint-disable operator-linebreak */
/* eslint-disable no-underscore-dangle */
/* eslint-disable indent */
import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import FormData from "form-data";
import axios from "axios";
// import { create as ipfsHttpClient } from "ipfs-http-client";

import { MarketAddress, MarketAddressABI, rpcProvier } from "./constants";

// eslint-disable-next-line operator-linebreak
const JWT =
  // eslint-disable-next-line max-len
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJkODEyYzg0Yy0zYjhjLTRjM2MtODE3Mi04NWU3NWMzOGMwYTgiLCJlbWFpbCI6Im1kcy5tdWhpYkBvdXRsb29rLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIyZDQ4MjU3YWUyYzI0ZDZlYWI1NSIsInNjb3BlZEtleVNlY3JldCI6IjFiMzExMjVjZDhiZmI4YmUyN2YxYjc0ZDIyYzJhMzEyMjQ1MjE0MDE0ZTdmOWQzMDllMzA2NWYzODA3NDA2NTYiLCJpYXQiOjE2NzI4MDE3MjR9.hKfk0rhiYDx_bFUgL0xs89ZU1DRnbD7ENzWCE7SBW4o";

const fetchContract = (signerOrProvider) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  new ethers.Contract(MarketAddress, MarketAddressABI, signerOrProvider);
export const NFTContext = React.createContext();
export const NFTProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoadingNft, setIsLoadingNft] = useState(false);
  const checkIfWalletIsConnected = async () => {
    try {
      if (!window.ethereum) alert("Please install MetaMask!");
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong, please try again!");
    }
  };
  const nftCurrency = "ETH";
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);
  const connectWallet = async () => {
    try {
      if (!window.ethereum) alert("Please install MetaMask!");
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Something went wrong, please try again!");
    }
  };
  const uploadToIPFS = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const metadata = JSON.stringify({
        name: "File name",
      });
      formData.append("pinataMetadata", metadata);

      const options = JSON.stringify({
        cidVersion: 0,
      });
      formData.append("pinataOptions", options);

      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers: {
            "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
            Authorization: JWT,
          },
          // eslint-disable-next-line comma-dangle
        }
      );
      const hash = res.data.IpfsHash;
      const url = `https://ipfs.io/ipfs/${hash}`;
      return url;
    } catch (error) {
      console.log(error);
      alert("Something went wrong, please try again!");
    }
  };

  const createNFT = async (formInput, fileUrl, router) => {
    try {
      // eslint-disable-next-line operator-linebreak
      const jw =
        // eslint-disable-next-line max-len
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJkODEyYzg0Yy0zYjhjLTRjM2MtODE3Mi04NWU3NWMzOGMwYTgiLCJlbWFpbCI6Im1kcy5tdWhpYkBvdXRsb29rLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI0ZDFmMGZmOGE5YmZkNGUwNmE3OSIsInNjb3BlZEtleVNlY3JldCI6IjNmMmE0MDNlNDM1ZDY3NzJhYzI3ODY3ZGZiZTlmZGU3ZjJlZTg0YjcwZDExMGViM2E4YjIwOTFiMjMzZmU2YTYiLCJpYXQiOjE2NzU4ODc2MDV9.30wnGfHURiZ3IH_rIJaiq25TmHBmfWNeDDfc2-GqlRU";
      const { name, description, price } = formInput;
      if (!name || !description || !price || !fileUrl) return;
      // const data = JSON.stringify({ name, description, image: fileUrl });
      // console.log(data);
      const data = JSON.stringify({
        pinataOptions: {
          cidVersion: 1,
        },
        pinataMetadata: {
          name: "testing",
          keyvalues: {
            customKey: "customValue",
            customKey2: "customValue2",
          },
        },
        pinataContent: {
          name,
          description,
          image: fileUrl,
        },
      });

      const config = {
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jw}`,
        },
        data,
      };

      const res = await axios(config);
      const hashValue = res.data.IpfsHash;
      const url = `https://ipfs.io/ipfs/${hashValue}`;
      // eslint-disable-next-line no-use-before-define
      await createSale(url, price);
      router.push("/");
    } catch (error) {
      console.log(error);
      alert("Something went wrong, please try again!");
    }
  };

  const createSale = async (url, formInputPrice, isReselling, id) => {
    try {
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const price = ethers.utils.parseUnits(formInputPrice, "ether");
      const contract = fetchContract(signer);
      const listingPrice = await contract.getListingPrice();
      const transaction = !isReselling
        ? await contract.createToken(url, price, {
            // eslint-disable-next-line indent
            // eslint-disable-next-line indent
            value: listingPrice.toString(),
            // eslint-disable-next-line indent
          })
        : await contract.resellToken(id, price, {
            value: listingPrice.toString(),
          });
      setIsLoadingNft();
      await transaction.wait();
    } catch (error) {
      console.log(error);
      alert("Something went wrong, please try again!");
    }
  };

  const fetchNFTs = async () => {
    try {
      setIsLoadingNft(true);
      const provider = new ethers.providers.JsonRpcProvider(rpcProvier);
      const contract = fetchContract(provider);
      const data = await contract.fetchMarketItems();
      console.log(data);
      const items = await Promise.all(
        data.map(
          async ({ tokenId, seller, owner, price: unformattedPrice }) => {
            const tokenURI = await contract.tokenURI(tokenId);
            const {
              data: { image, name, description },
            } = await axios.get(tokenURI);
            const price = ethers.utils.formatUnits(
              unformattedPrice.toString(),
              // eslint-disable-next-line comma-dangle
              "ether"
            );
            return {
              price,
              tokenId: tokenId.toNumber(),
              seller,
              owner,
              image,
              name,
              description,
              tokenURI,
            };
            // eslint-disable-next-line comma-dangle
          }
        )
      );
      setIsLoadingNft(false);
      return items;
    } catch (error) {
      setIsLoadingNft(false);
      console.log(error);
      alert("Something went wrong, please try again!");
    }
  };

  const fetchMyNFTsOrListedNFTs = async (type) => {
    try {
      setIsLoadingNft(false);
      let provider;
      if (type === "fetchItemsListed") {
        provider = new ethers.providers.JsonRpcProvider(rpcProvier);
      } else {
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provid = new ethers.providers.Web3Provider(connection);

        provider = provid.getSigner();
      }
      const contract = fetchContract(provider);
      // eslint-disable-next-line operator-linebreak
      const data =
        type === "fetchItemsListed"
          ? await contract.fetchItemsListed()
          : await contract.fetchMyNFTs();
      const items = await Promise.all(
        data.map(
          async ({ tokenId, seller, owner, price: unformattedPrice }) => {
            const tokenURI = await contract.tokenURI(tokenId);
            const {
              data: { image, name, description },
            } = await axios.get(tokenURI);
            const price = ethers.utils.formatUnits(
              unformattedPrice.toString(),
              // eslint-disable-next-line comma-dangle
              "ether"
            );
            return {
              price,
              tokenId: tokenId.toNumber(),
              seller,
              owner,
              image,
              name,
              description,
              tokenURI,
            };
            // eslint-disable-next-line comma-dangle
          }
        )
      );
      return items;
    } catch (error) {
      console.log(error);
      alert("Something went wrong, please try again!");
    }
  };

  const buyNFT = async (nft) => {
    try {
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const contract = fetchContract(signer);

      const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
      const transaction = await contract.createMarketSale(nft.tokenId, {
        value: price,
      });
      setIsLoadingNft(true);
      await transaction.wait();
      setIsLoadingNft(false);
    } catch (error) {
      console.log(error);
      alert("Something went wrong, please try again!");
    }
  };

  return (
    <NFTContext.Provider
      value={{
        nftCurrency,
        connectWallet,
        currentAccount,
        uploadToIPFS,
        createNFT,
        fetchNFTs,
        fetchMyNFTsOrListedNFTs,
        buyNFT,
        createSale,
        isLoadingNft,
        setIsLoadingNft,
      }}
    >
      {children}
    </NFTContext.Provider>
  );
};

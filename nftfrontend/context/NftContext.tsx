"use client";
import { ethers } from "../utils/ethers";
import React, { createContext, useEffect, useState } from "react";
// import Web3Modal from "web3modal";
import { MarketAddress, MarketAddressAbi } from "./constants";
import axios from "axios";
declare var window: any;

const fetchContract = (signerOrProvider: any) =>
    new ethers.Contract(MarketAddress, MarketAddressAbi, signerOrProvider);

export const NFTContext = createContext({});

export const NFTProvider = ({ children }: { children: any }) => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [isLoadingNft, setIsLoadingNft] = useState(false);
    const nftCurrency = "ETH";
    const checkIfWallerIsConnected = async () => {
        if (!window.ethereum) {
            return alert("Please install metamask");
        }
        const accounts = await window.ethereum.request({
            method: "eth_accounts",
        });
        if (accounts.length) {
            setCurrentAccount(accounts[0]);
        } else {
            console.log("No accounts found");
        }
    };
    useEffect(() => {
        checkIfWallerIsConnected();
    }, []);

    const connectWallet = async () => {
        if (!window.ethereum) {
            return alert("Please install metamask");
        }
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        setCurrentAccount(accounts[0]);
        window.location.reload();
    };

    const uploadToIPFS = async (file: any, setFileUrl: any) => {
        try {
            const form = new FormData();
            form.append("file", file);
            const res = await fetch(
                "https://api.pinata.cloud/pinning/pinFileToIPFS",
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${process.env.PINATA_JWT}`,
                    },
                    body: form,
                }
            );
            const jsonRes = await res.json();
            return jsonRes.IpfsHash;
        } catch (error: any) {
            console.log("Eror uploading file to IPFS " + error.message);
        }
    };

    const createNFT = async (formInput: any, fileUrl: any, router: any) => {
        // fileUrl is IPFS hash
        const { name, description, price } = formInput;
        if (!name || !description || !price || !fileUrl) {
            return;
        }
        const data = JSON.stringify({
            pinataContent: { name, description, image: fileUrl },
            pinataMetadata: {
                name: `Metadata of ${name}`,
            },
        });
        try {
            const res = await axios.post(
                "https://api.pinata.cloud/pinning/pinJSONToIPFS",
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${process.env.PINATA_JWT}`,
                    },
                }
            );
            const url = `https://${process.env.PINATADOMAIN}/ipfs/${res.data.IpfsHash}`;
            console.log({ url });
            await createSale(url, price, false, -1);
            router.push("/");
        } catch (error: any) {
            console.log(`Error uploading file to IPFS ${error}`);
        }
    };

    const createSale = async (
        url: any,
        formInputPrice: any,
        isReselling: any,
        id: any
    ) => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const price = ethers.parseUnits(formInputPrice, "ether");
        const contract = fetchContract(signer);
        const listingPrice = await contract.getListingPrice();
        const transaction = !isReselling
            ? await contract.createNft(price, url, {
                  value: listingPrice.toString(),
              })
            : await contract.relistNft(id, price, {
                  value: listingPrice.toString(),
              });
        setIsLoadingNft(true);
        await transaction.wait();
    };

    const fetchNfts = async () => {
        setIsLoadingNft(false);
        const provider = new ethers.JsonRpcProvider(
            "https://sepolia.drpc.org",
            "sepolia"
        );
        const contract = fetchContract(provider);
        const data = await contract.listedItemsForSale();
        const items = await Promise.all(
            data.map(
                async ({ tokenId, seller, owner, price: unformattedPrice }) => {
                    const tokenURI = await contract.tokenURI(tokenId);
                    const {
                        data: { image, name, description },
                    } = await axios.get(`${tokenURI}`);
                    const price = ethers.formatEther(unformattedPrice);
                    tokenId = parseInt(tokenId);
                    return {
                        price,
                        tokenId,
                        seller,
                        owner,
                        image: `https://${process.env.PINATADOMAIN}/ipfs/${image}`,
                        name,
                        description,
                        tokenURI,
                    };
                }
            )
        );
        return items;
    };

    const fetchMyNftsOrListedNfts = async (type: any) => {
        setIsLoadingNft(false);
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = fetchContract(signer);

        const data =
            type === "fetchItemsListed"
                ? await contract.myListedNfts()
                : await contract.myNftsPurchased();

        const items = await Promise.all(
            data.map(
                async ({ tokenId, seller, owner, price: unformattedPrice }) => {
                    const tokenURI = await contract.tokenURI(tokenId);
                    const {
                        data: { image, name, description },
                    } = await axios.get(`${tokenURI}`);
                    const price = ethers.formatEther(unformattedPrice);
                    tokenId = parseInt(tokenId);
                    return {
                        price,
                        tokenId,
                        seller,
                        owner,
                        image: `https://${process.env.PINATADOMAIN}/ipfs/${image}`,
                        name,
                        description,
                        tokenURI,
                    };
                }
            )
        );
        return items;
    };

    const buyNft = async (nft: any) => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const price = ethers.parseUnits(nft.price.toString(), "ether");
        const contract = fetchContract(signer);
        const tx = await contract.exchangeNft(nft.tokenId, {
            value: price,
        });
        setIsLoadingNft(true);
        await tx.wait();
        setIsLoadingNft(false);
    };

    return (
        <NFTContext.Provider
            value={{
                nftCurrency,
                connectWallet,
                currentAccount,
                uploadToIPFS,
                createNFT,
                fetchNfts,
                fetchMyNftsOrListedNfts,
                buyNft,
                createSale,
                isLoadingNft,
            }}
        >
            {children}
        </NFTContext.Provider>
    );
};

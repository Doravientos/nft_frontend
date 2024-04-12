"use client";
import { Suspense, useContext, useEffect, useState } from "react";
import { NFTContext } from "../../../context/NftContext";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { Button, Input, Loader } from "@/components";
import Image from "next/image";

function Page() {
    // @ts-ignore
    const { createSale, isLoadingNft } = useContext(NFTContext);
    const router = useRouter();
    const searchParams = useSearchParams();
    const tokenId = searchParams.get("tokenId");
    const tokenURI = searchParams.get("tokenURI");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const fetchNFT = async () => {
        // @ts-ignore
        const { data } = await axios.get(tokenURI);
        setPrice(data.price);
        setImage(data.image);
    };
    useEffect(() => {
        if (tokenURI) fetchNFT();
    }, [tokenURI]);

    const resell = async () => {
        if (!price || !tokenId || !tokenURI) {
            console.log("Invalid inputs");
            return;
        }
        console.log("Creating sale");
        await createSale(tokenURI, price, true, tokenId);
        router.push("/");
    };

    if (isLoadingNft) {
        return (
            <div className="flexStart min-h-screen">
                <Loader />
            </div>
        );
    }
    return (
        <Suspense fallback={<Loader />}>
            <div className="flex justify-center p-12 sm:px-4">
                <div className="w-3/5 md:w-full">
                    <h1 className="font-poppins text-2xl font-semibold text-nft-black-1 dark:text-white">
                        Resell NFT
                    </h1>
                    <Input
                        inputType="number"
                        title="Price"
                        placeHolder="NFT Price"
                        // @ts-ignore
                        handleClick={(e) => setPrice(e.target.value)}
                    />
                    {image && (
                        <div className="relative size-52">
                            <Image
                                src={`https://gray-certain-bison-693.mypinata.cloud/ipfs/${image}`}
                                className="mt-4 rounded"
                                layout="fill"
                                objectFit="cover"
                                alt="NFT image"
                            />
                        </div>
                    )}
                    <div className="mt-7 flex w-full justify-end">
                        <Button
                            btnName="List NFT"
                            classStyles="rounded-xl"
                            handleClick={resell}
                        />
                    </div>
                </div>
            </div>
        </Suspense>
    );
}

export default Page;

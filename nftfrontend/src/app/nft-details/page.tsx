"use client";

import { useContext, useEffect, useState } from "react";
import images from "../../assets";
import { NFTContext } from "../../../context/NftContext";
import { Button, Loader, NFTCard } from "@/components";
import Image from "next/image";
import { shortenAddress } from "../../../utils/shortenAddress";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { generateAvatarURL } from "@cfx-kit/wallet-avatar";

function page() {
    const { currentAccount, nftCurrency } = useContext(NFTContext);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [nft, setNft] = useState({
        image: "",
        tokenId: "",
        name: "",
        owner: "",
        price: "",
        seller: "",
        description: "",
    });
    const isBrowser = () => typeof window !== "undefined"; // The approach recommended by Next.js
    function scrollToTop() {
        if (!isBrowser()) return;
        setTimeout(() => {
            window.document.body.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }
    useEffect(() => {
        setNft({
            price: searchParams.get("price"),
            image: searchParams.get("image"),
            tokenId: searchParams.get("tokenId"),
            name: searchParams.get("name"),
            owner: searchParams.get("owner"),
            seller: searchParams.get("seller"),
            description: searchParams.get("description"),
        });
        console.log({ nft });
        setIsLoading(false);
    }, []);

    if (isLoading) {
        return <Loader />;
    }
    return (
        <div
            className="relative flex min-h-screen flex-col justify-center"
            onLoad={() => scrollToTop()}
        >
            <div className="flexCenter relative flex-1 border-r border-nft-gray-1 p-12 dark:border-nft-black-1 md:border-b md:border-r-0 sm:px-4">
                <div className="relative h-557 w-557 sm:h-300 sm:w-full minmd:size-2/3">
                    <Image
                        src={nft.image}
                        objectFit="cover"
                        className="rounded-xl shadow-lg"
                        layout="fill"
                        alt="nft image"
                    />
                </div>
            </div>
            <div className="flex-1 justify-start p-12 sm:px-4 sm:pb-4">
                <div className="flex flex-row sm:flex-col">
                    <h2 className="font-poppins text-2xl font-semibold text-nft-black-1 dark:text-white minlg:text-3xl">
                        {nft.name}
                    </h2>
                </div>
                <div className="mt-10">
                    <p className="font-poppins text-xs font-normal text-nft-black-1 dark:text-white minlg:text-base">
                        Creator
                    </p>
                    <div className="mt-3 flex flex-row items-center">
                        <div className="relative mr-2 size-12 minlg:size-20">
                            <Image
                                src={generateAvatarURL(currentAccount)}
                                objectFit="cover"
                                layout="fill"
                                className="rounded-full"
                                alt="creator image"
                            />
                        </div>
                        <p className="font-poppins text-xs font-semibold text-nft-black-1 dark:text-white minlg:text-base">
                            {shortenAddress(nft.seller)}
                        </p>
                    </div>
                </div>
                <div className="mt-10 flex flex-col">
                    <div className="flex w-full flex-row border-b-2 border-nft-black-1 dark:border-nft-gray-1">
                        <p className="mb-2 font-poppins text-base font-medium text-nft-black-1 dark:text-white minlg:text-base">
                            Details
                        </p>
                    </div>
                    <div className="mt-3">
                        <p className="font-poppins text-base font-normal text-nft-black-1 dark:text-white">
                            {nft.description}
                        </p>
                    </div>
                </div>
                <div className="mt-10 flex flex-row sm:flex-col">
                    {currentAccount === nft.seller.toLowerCase() ? (
                        <p className="border border-gray-50 p-2 font-poppins text-base font-normal text-nft-black-1 dark:text-white">
                            You cannot buy your own NFT!!
                        </p>
                    ) : (
                        <Button
                            btnName={`Buy for ${nft.price} ${nftCurrency}`}
                            classStyles="mr-5 sm:mr-0 rounded-xl"
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default page;

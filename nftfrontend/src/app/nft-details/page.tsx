"use client";

import { useContext, useEffect, useState } from "react";
// import images from "../../assets";
import { NFTContext } from "../../../context/NftContext";
import { Button, Loader, Modal } from "@/components";
import Image from "next/image";
import { shortenAddress } from "../../../utils/shortenAddress";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { generateAvatarURL } from "@cfx-kit/wallet-avatar";

const PaymentBodyCmp = ({ nft, nftCurrency }) => {
    return (
        <div className="flex flex-col">
            <div className="flexBetween">
                <p className="font-poppins text-base font-semibold text-nft-black-1 dark:text-white minlg:text-xl">
                    Item
                </p>
                <p className="font-poppins text-base font-semibold text-nft-black-1 dark:text-white minlg:text-xl">
                    Subtotal
                </p>
            </div>
            <div className="flexBetweenStart my-5">
                <div className="flexStartCenter flex-1">
                    <div className="relative size-28">
                        <Image
                            src={nft.image}
                            layout="fill"
                            objectFit="cover"
                            alt="nft image"
                        />
                    </div>
                    <div className="flexCenterStart ml-5 flex-col">
                        <p className="font-poppins text-sm font-semibold text-nft-black-1 dark:text-white minlg:text-xl">
                            {shortenAddress(nft.seller)}
                        </p>
                        <p className="font-poppins text-sm font-semibold text-nft-black-1 dark:text-white minlg:text-xl">
                            {nft.name}
                        </p>
                    </div>
                </div>
                <div>
                    <p className="font-poppins text-sm font-normal text-nft-black-1 dark:text-white minlg:text-xl">
                        {nft.price}{" "}
                        <span className="font-semibold ">{nftCurrency}</span>
                    </p>
                </div>
            </div>
            <div className="flexBetween mt-10">
                <p className="font-poppins text-base font-normal text-nft-black-1 dark:text-white minlg:text-xl">
                    Total
                </p>
                <p className="font-poppins text-sm font-normal text-nft-black-1 dark:text-white minlg:text-xl">
                    {nft.price}{" "}
                    <span className="font-semibold ">{nftCurrency}</span>
                </p>
            </div>
        </div>
    );
};

function Page() {
    const { currentAccount, nftCurrency, buyNft, isLoadingNft } =
        useContext(NFTContext);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    // const pathname = usePathname();
    const searchParams = useSearchParams();
    const [paymentModal, setPaymentModal] = useState(false);
    const [successModal, setSuccessModal] = useState(false);

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
            tokenURI: searchParams.get("tokenURI"),
        });
        console.log({ nft });
        setIsLoading(false);
    }, []);

    const checkout = async () => {
        await buyNft(nft);
        setPaymentModal(false);
        setSuccessModal(true);
    };

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
                                src={generateAvatarURL(nft.seller)}
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
                    {currentAccount === nft.seller.toLowerCase() &&
                    nft.owner.toLowerCase() ===
                        "0x0000000000000000000000000000000000000000" ? (
                        <Button
                            btnName="List on Marketplace"
                            classStyles="mr-5 sm:mr-0 sm:mb-5 rounded-xl"
                            handleClick={() =>
                                router.push(
                                    `/resell-nft?tokenId=${nft.tokenId}&tokenURI=${nft.tokenURI}`
                                )
                            }
                        />
                    ) : currentAccount === nft.seller.toLowerCase() ? (
                        <p className="border border-gray-50 p-2 font-poppins text-base font-normal text-nft-black-1 dark:text-white">
                            You cannot buy your own NFT!!
                        </p>
                    ) : (
                        <Button
                            btnName={`Buy for ${nft.price} ${nftCurrency}`}
                            classStyles="mr-5 sm:mr-0 rounded-xl"
                            handleClick={() => {
                                setPaymentModal(true);
                            }}
                        />
                    )}
                </div>
            </div>
            {paymentModal && (
                <Modal
                    header="Check Out"
                    body={
                        <PaymentBodyCmp nft={nft} nftCurrency={nftCurrency} />
                    }
                    footer={
                        <div className="flex flex-row sm:flex-col">
                            <Button
                                btnName={"Checkout"}
                                classStyles="mr-5 sm:mb-5 sm:mr-0 rounded-xl"
                                handleClick={checkout}
                            />
                            <Button
                                btnName={"Cancel"}
                                classStyles="rounded-xl"
                                handleClick={() => {
                                    setPaymentModal(false);
                                }}
                            />
                        </div>
                    }
                    handleClose={() => {
                        setPaymentModal(false);
                    }}
                />
            )}
            {isLoadingNft && (
                <Modal
                    header="Buying NFT..."
                    body={
                        <div className="flexCenter flex-col text-center">
                            <div className="relative size-52">
                                <Loader />
                            </div>
                        </div>
                    }
                    handleClose={() => {
                        setPaymentModal(false);
                    }}
                />
            )}
            {successModal && (
                <Modal
                    header="Payment Successful"
                    body={
                        <div
                            className="flexCenter flex-col text-center"
                            onClick={() => setSuccessModal(false)}
                        >
                            <div className="relative size-52">
                                <Image
                                    src={nft.image}
                                    objectFit="cover"
                                    layout="fill"
                                    alt="nft image"
                                />
                            </div>
                            <p className="mt-10 font-poppins text-sm font-normal text-nft-black-1 dark:text-white minlg:text-xl">
                                You successfully puchased
                                <span className="font-semibold ">
                                    {" "}
                                    {nft.name}{" "}
                                </span>
                                from
                                <span className="font-semibold ">
                                    {` ${shortenAddress(nft.seller)}`}
                                </span>
                            </p>
                        </div>
                    }
                    footer={
                        <div className="flexCenter flex-col">
                            <Button
                                btnName={"Check it out"}
                                classStyles="sm:mb-5 sm:mr-0 rounded-xl"
                                handleClick={() => {
                                    router.push("/my-nfts");
                                }}
                            />
                        </div>
                    }
                    handleClose={() => {
                        setPaymentModal(false);
                    }}
                />
            )}
        </div>
    );
}

export default Page;

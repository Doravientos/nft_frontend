"use client";
import { useState, useMemo, useCallback, useContext } from "react";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { useTheme } from "next-themes";

import { Button, Input, Loader } from "@/components";
import images from "../../assets";
import { NFTContext } from "../../../context/NftContext";

function page() {
    const [fileUrl, setFileUrl] = useState(null);
    const [formInput, setFormInput] = useState({
        price: "",
        name: "",
        description: "",
    });
    const { theme } = useTheme();
    const { uploadToIPFS, createNFT, isLoadingNft } = useContext(NFTContext);
    const router = useRouter();

    const onDrop = useCallback(async (acceptedFile) => {
        const url = await uploadToIPFS(acceptedFile[0]);
        setFileUrl(url);
        console.log(`Being fetched on created page: ${url}`);
    }, []);
    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
    } = useDropzone({
        onDrop,
        accept: "image/*",
        maxSize: 5000000,
    });

    const fileStyle = useMemo(
        () =>
            `dark:bg-nft-black-1 bg-white border dark:border-white border-nft-gray-2 flex flex-col items-center p-5 rounded-sm border-dashed
            ${isDragActive && "border-file-active"}
            ${isDragAccept && "border-file-accept"}
            ${isDragReject && "border-file-reject"}
            `,
        [isDragActive, isDragAccept, isDragReject]
    );
    if (isLoadingNft) {
        return (
            <div className="flexStart min-h-screen">
                <Loader />
            </div>
        );
    }
    return (
        <div className="flex justify-center p-12 sm:px-4">
            <div className="w-3/5 md:w-full ">
                <h1 className="ml-4 font-poppins text-2xl font-semibold text-nft-black-1 dark:text-white xs:ml-0 minlg:text-4xl">
                    Create new NFT
                </h1>
                <div className="mt-16">
                    <p className="font-poppins text-xl font-semibold text-nft-black-1 dark:text-white">
                        Upload File
                    </p>
                    <div className="mt-4">
                        <div {...getRootProps()} className={fileStyle}>
                            <input {...getInputProps()} />
                            <div className="flexCenter flex-col text-center">
                                <p className="font-poppins text-xl font-semibold text-nft-black-1 dark:text-white">
                                    JPG, PNG, GIF, WEBM, Max 100mb
                                </p>
                                <div className="my-12 flex w-full justify-center">
                                    <Image
                                        src={images.upload}
                                        width={100}
                                        height={100}
                                        objectFit="contain"
                                        alt="File upload"
                                        className={
                                            theme === "light" ? "invert" : ""
                                        }
                                    />
                                </div>
                                <p className="font-poppins text-sm font-semibold text-nft-black-1 dark:text-white">
                                    Drag and Drop File
                                </p>
                                <p className="mt-2 font-poppins text-sm font-semibold text-nft-black-1 dark:text-white">
                                    or Browse media on your device
                                </p>
                            </div>
                        </div>
                        {fileUrl && (
                            <aside>
                                <div className="relative size-52 overflow-hidden rounded-2xl sm:h-36 xs:h-56 minmd:h-60 minlg:h-300">
                                    <Image
                                        src={`https://${process.env.PINATADOMAIN}/ipfs/${fileUrl}`}
                                        layout="fill"
                                        objectFit="cover"
                                        alt="asset_file"
                                    />
                                </div>
                            </aside>
                        )}
                    </div>
                </div>
                <Input
                    inputType="input"
                    title="Name"
                    placeHolder="NFT Name"
                    handleClick={(e) =>
                        setFormInput({ ...formInput, name: e.target.value })
                    }
                />
                <Input
                    inputType="textarea"
                    title="Description"
                    placeHolder="NFT Description"
                    handleClick={(e) =>
                        setFormInput({
                            ...formInput,
                            description: e.target.value,
                        })
                    }
                />
                <Input
                    inputType="number"
                    title="Price"
                    placeHolder="NFT Price"
                    handleClick={(e) =>
                        setFormInput({ ...formInput, price: e.target.value })
                    }
                />
                <div className="mt-7 flex w-full justify-end">
                    <Button
                        btnName="Create NFT"
                        classStyles="rounded-xl"
                        handleClick={() =>
                            createNFT(formInput, fileUrl, router)
                        }
                    />
                </div>
            </div>
        </div>
    );
}

export default page;

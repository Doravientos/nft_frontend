import React from "react";
import Image from "next/image";
import images from "../assets";

const CreatorCard = ({ rank, creatorImage, creatorName, creatorEths }) => {
    return (
        <div className="m-4 flex min-w-190 flex-col rounded-3xl border border-nft-gray-1 bg-white p-4 dark:border-nft-black-3 dark:bg-nft-black-3 minlg:min-w-240">
            <div className="flexCenter size-8 rounded-full bg-nft-red-violet minlg:size-10">
                <p className="font-poppins text-base font-semibold text-white minlg:text-lg">
                    {rank}
                </p>
            </div>
            <div className="my-2 flex justify-center">
                <div className="relative size-20 minlg:size-28">
                    <Image
                        src={creatorImage}
                        layout="fill"
                        objectFit="cover"
                        alt="creatorName"
                        className="rounded-full"
                    />
                    <div className="absolute -right-0 bottom-2 size-4 minlg:size-7">
                        <Image
                            src={images.tick}
                            layout="fill"
                            objectFit="contain"
                            alt="tick"
                        />
                    </div>
                </div>
            </div>
            <div className="flexCenter mt-3 flex-col text-center minlg:mt-7">
                <p className="font-poppins text-base font-semibold text-nft-black-1 dark:text-white">
                    {creatorName}
                </p>
                <p className="mt-1 font-poppins text-base font-semibold text-nft-black-1 dark:text-white">
                    {creatorEths.toFixed(2)}{" "}
                    <span className="font-normal">ETH</span>
                </p>
            </div>
        </div>
    );
};

export default CreatorCard;

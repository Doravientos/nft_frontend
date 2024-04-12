import React, { useContext } from "react";
import { NFTContext } from "../../context/NftContext";
// @ts-ignore
const Input = ({ inputType, title, placeHolder, handleClick }) => {
    // @ts-ignore
    const { nftCurrency } = useContext(NFTContext);
    return (
        <div className="mt-10 w-full">
            <p className="font-poppins text-xl font-semibold text-nft-black-1 dark:text-white">
                {title}
            </p>
            {inputType === "number" ? (
                <div
                    className="flexBetween mt-4 w-full flex-row rounded-lg border border-nft-gray-2 bg-white px-4 py-3 font-poppins
            text-base text-nft-gray-2 outline-none dark:border-nft-black-1 dark:bg-nft-black-1 dark:text-white
            "
                >
                    <input
                        type="number"
                        className="flex w-full bg-white outline-none dark:bg-nft-black-1"
                        placeholder={placeHolder}
                        onChange={handleClick}
                    />
                    <p className="font-poppins text-xl font-semibold text-nft-black-1 dark:text-white">
                        {nftCurrency}
                    </p>
                </div>
            ) : inputType === "textarea" ? (
                <textarea
                    rows={10}
                    className="mt-4 w-full rounded-lg border border-nft-gray-2 bg-white px-4 py-3 font-poppins text-base text-nft-gray-2
            outline-none dark:border-nft-black-1 dark:bg-nft-black-1 dark:text-white
            "
                    placeholder={placeHolder}
                    onChange={handleClick}
                />
            ) : (
                <input
                    className="mt-4 w-full rounded-lg border border-nft-gray-2 bg-white px-4 py-3 font-poppins text-base text-nft-gray-2
            outline-none dark:border-nft-black-1 dark:bg-nft-black-1 dark:text-white
            "
                    placeholder={placeHolder}
                    onChange={handleClick}
                />
            )}
        </div>
    );
};

export default Input;

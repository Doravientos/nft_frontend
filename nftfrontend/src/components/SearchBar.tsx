"use client";

import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
// import { NFTContext } from "../../context/NftContext";
import images from "../assets";
import Image from "next/image";

const SearchBar = ({
    activeSelect,
    setActiveSelect,
    handleSearch,
    clearSearch,
}) => {
    const { theme } = useTheme();
    const [search, setSearch] = useState("");
    const [debouncedSearch, setdebouncedSearch] = useState("");
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setSearch(debouncedSearch);
        }, 1000);
        return () => clearTimeout(timer);
    }, [debouncedSearch]);

    useEffect(() => {
        if (search) {
            handleSearch(search);
        } else {
            clearSearch();
        }
    }, [search]);
    return (
        <>
            <div className="flexCenter flex-1 rounded-md border border-nft-gray-2 bg-white px-4 py-3 dark:border-nft-black-2 dark:bg-nft-black-2">
                <Image
                    src={images.search}
                    objectFit="contain"
                    width={20}
                    height={20}
                    alt="search"
                    className={theme === "light" ? "invert" : ""}
                />
                <input
                    type="text"
                    placeholder="Search NFT here..."
                    className="mx-4 w-full bg-white text-xs font-normal text-nft-black-1 outline-none dark:bg-nft-black-2 dark:text-white"
                    onChange={(e) => {
                        setdebouncedSearch(e.target.value);
                    }}
                    value={debouncedSearch}
                />
            </div>
            <div
                onClick={() => {
                    setToggle((toggle) => !toggle);
                }}
                className="flexBetween relative ml-4 min-w-190 cursor-pointer rounded-md border border-nft-gray-2 bg-white px-4 dark:border-nft-black-2 dark:bg-nft-black-2 sm:ml-0 sm:mt-2"
            >
                <p className="py-3 font-poppins text-xs font-normal text-nft-black-1 dark:text-white">
                    {activeSelect}
                </p>
                <Image
                    src={images.arrow}
                    objectFit="contain"
                    width={15}
                    height={15}
                    alt="arrow"
                    className={theme === "light" ? "invert" : ""}
                />
                {toggle && (
                    <div className="absolute inset-x-0 top-full z-10 mt-3 w-full rounded-md border-nft-gray-2 bg-white px-4 py-3 dark:border-nft-black-2 dark:bg-nft-black-2">
                        {[
                            "Recently Added",
                            "Price (low to high)",
                            "Price (high to low)",
                        ].map((item) => (
                            <p
                                key={item}
                                className="my-3 cursor-pointer font-poppins text-xs font-normal text-nft-black-1 dark:text-white"
                                onClick={() => setActiveSelect(item)}
                            >
                                {item}
                            </p>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default SearchBar;

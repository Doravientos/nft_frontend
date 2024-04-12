"use client";
import React, { useState, useEffect, useContext } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

import images from "../assets";
import { Button } from "./";
import { NFTContext } from "../../context/NftContext";

const MenuItems = ({ isMobile, active, setActive, setIsOpen }) => {
    const generateLink = (i) => {
        switch (i) {
            case 0:
                return "/";
            case 1:
                return "/created-nfts";
            case 2:
                return "/my-nfts";
            default:
                return "/";
        }
    };
    return (
        <ul
            className={`flexCenter list-none flex-row ${isMobile && "h-full flex-col"}`}
        >
            {["Explore NFTs", "Listed NFTs", "My NFTs"].map((item, i) => (
                <li
                    key={i}
                    onClick={() => {
                        setActive(item);
                        if (isMobile) setIsOpen(false);
                    }}
                    className={`mx-3 flex flex-row items-center font-poppins text-base font-semibold hover:text-nft-dark dark:hover:text-white ${active === item ? "text-nft-black-1 dark:text-white" : "text-nft-gray-2 dark:text-nft-gray-3"}`}
                >
                    <Link href={generateLink(i)}>{item}</Link>
                </li>
            ))}
        </ul>
    );
};

const ButtonGroup = ({ setActive, router, setIsOpen }) => {
    const { connectWallet, currentAccount } = useContext(NFTContext);
    // const hasConnected = true;
    return currentAccount ? (
        <Button
            btnName="Create"
            classStyles="mx-2 rounded-xl"
            handleClick={() => {
                setActive("");
                setIsOpen(false);
                router.push("/create-nft");
            }}
        />
    ) : (
        <Button
            btnName="Connect"
            classStyles="mx-2 rounded-xl"
            handleClick={() => {
                connectWallet();
            }}
        />
    );
};

const checkActive = (active, setActive, router, pathname) => {
    console.log(router.pathname);

    switch (pathname) {
        case "/":
            if (active !== "Explore NFTs") setActive("Explore NFTs");
            break;
        case "/created-nfts":
            if (active !== "Listed NFTs") setActive("Listed NFTs");
            break;
        case "/my-nfts":
            if (active !== "My NFTs") setActive("My NFTs");
            break;
        case "/create-nft":
            setActive("");
            break;
        default:
            setActive("");
            break;
    }
};

const Navbar = () => {
    const { theme, setTheme } = useTheme();
    const [active, setActive] = useState("Explore NFTs");
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        checkActive(active, setActive, router, pathname);
    }, [pathname]);

    useEffect(() => {
        setTheme("dark");
    }, []);
    return (
        <nav className="flexBetween fixed z-10 w-full flex-row border-b border-nft-gray-1 bg-white p-4 dark:border-nft-black-1 dark:bg-nft-dark">
            <div className="flex flex-1 flex-row justify-start">
                <Link href="/">
                    <div
                        className="flexCenter cursor-pointer md:hidden"
                        onClick={() => {
                            setActive("Explore NFTs");
                        }}
                    >
                        <Image
                            src={images.logo02}
                            objectFit="contain"
                            width={32}
                            height={32}
                            alt="logo"
                        />
                        <p className="ml-1 text-lg font-semibold text-nft-black-1 dark:text-white">
                            EnmaGalaxy
                        </p>
                    </div>
                </Link>
                <Link href="/">
                    <div
                        className="hidden md:flex"
                        onClick={() => {
                            setActive("Explore NFTs");
                            setIsOpen(false);
                        }}
                    >
                        <Image
                            src={images.logo02}
                            objectFit="contain"
                            width={32}
                            height={32}
                            alt="logo"
                        />
                    </div>
                </Link>
            </div>
            <div className="flex flex-initial flex-row justify-end">
                <div className="mr-2 flex items-center">
                    <input
                        type="checkbox"
                        className="checkbox"
                        id="checkbox"
                        onChange={() =>
                            setTheme(theme === "light" ? "dark" : "light")
                        }
                    />
                    <label
                        htmlFor="checkbox"
                        className="flexBetween label relative h-4 w-8 rounded-2xl bg-black p-1"
                    >
                        <i className="fas fa-sun" />
                        <i className="fas fa-moon" />
                        <div className="ball absolute size-3 rounded-full bg-white" />
                    </label>
                </div>
                <div className="flex md:hidden">
                    <MenuItems active={active} setActive={setActive} />
                    <div className="ml-4">
                        <ButtonGroup
                            setActive={setActive}
                            router={router}
                            setIsOpen={setIsOpen}
                        />
                    </div>
                </div>
            </div>
            <div className="ml-2 hidden md:flex">
                {isOpen ? (
                    <Image
                        src={images.cross}
                        objectFit="contain"
                        width={20}
                        height={20}
                        alt="close"
                        onClick={() => {
                            setIsOpen(false);
                        }}
                        className={theme === "light" ? "invert" : ""}
                    />
                ) : (
                    <Image
                        src={images.menu}
                        objectFit="contain"
                        width={25}
                        height={25}
                        alt="menu"
                        onClick={() => {
                            setIsOpen(true);
                        }}
                        className={theme === "light" ? "invert" : ""}
                    />
                )}
                {isOpen && (
                    <div className="nav-h fixed inset-0 top-65 z-10 flex flex-col justify-between bg-white dark:bg-nft-dark">
                        <div className="flex-1 p-4">
                            <MenuItems
                                active={active}
                                setActive={setActive}
                                setIsOpen={setIsOpen}
                                isMobile
                            />
                        </div>
                        <div className="border-t border-nft-gray-1 p-4 dark:border-nft-black-1">
                            <ButtonGroup
                                setActive={setActive}
                                router={router}
                                setIsOpen={setIsOpen}
                            />
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

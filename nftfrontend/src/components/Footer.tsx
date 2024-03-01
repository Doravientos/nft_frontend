"use client";
import React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Button } from "./";
import console from "console";

import images from "../assets";

const FooterLinks = ({ heading, items }) => (
    <div className="flex-1 items-start justify-start">
        <h3 className="mb-10 font-poppins text-xl font-semibold text-nft-black-1 dark:text-white">
            {heading}
        </h3>
        {items.map((item, index) => (
            <p
                key={index}
                className="my-3 cursor-pointer font-poppins text-base font-normal text-nft-black-1 hover:text-nft-black-1 dark:text-white dark:hover:text-nft-gray-2"
            >
                {item}
            </p>
        ))}
    </div>
);

const Footer = () => {
    const { theme, setTheme } = useTheme();

    return (
        <footer className="flexCenter flex-col border-t py-16 dark:border-nft-black-1 sm:py-8">
            <div className="flex w-full flex-row p-16 md:flex-col sm:px-4 minmd:w-4/5">
                <div className="flexStart flex-1 flex-col">
                    <div className="flexCenter cursor-pointer">
                        <Image
                            src={images.logo02}
                            objectFit="contain"
                            width={32}
                            height={32}
                            alt="logo"
                        />
                        <p className="ml-1 text-lg font-semibold text-nft-black-1 dark:text-white">
                            EnmaKet
                        </p>
                    </div>
                    <p className="mt-6 font-poppins text-base font-semibold text-nft-black-1 dark:text-white">
                        Get the latest updates
                    </p>
                    <div className="flexBetween mt-6 w-357 rounded-md border border-nft-gray-2 bg-white dark:border-nft-black-2 dark:bg-nft-black-2 md:w-full minlg:w-557">
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="size-full flex-1 rounded-md bg-white px-4 text-xs font-normal text-nft-black-1 outline-none dark:bg-nft-black-2 dark:text-white minlg:text-lg"
                        />
                        <div className="flex-initial">
                            <Button
                                btnName="Email me"
                                classStyles="rounded-md"
                            />
                        </div>
                    </div>
                </div>
                <div className="flexBetweenStart ml-10 flex-1 flex-wrap md:ml-0 md:mt-8">
                    <FooterLinks
                        heading="EnmaKet"
                        items={["Explore", "How it Works", "Contact Us"]}
                    />
                    <FooterLinks
                        heading="Support"
                        items={[
                            "Help Center",
                            "Terms of Service",
                            "Legal",
                            "Privacy Policy",
                        ]}
                    />
                </div>
            </div>

            <div className="flexCenter mt-5 w-full border-t border-nft-gray-1 px-16 dark:bg-nft-black-1 sm:px-4">
                <div className="flexBetween mt-7 w-full flex-row sm:flex-col minmd:w-4/5">
                    <p className="font-poppins text-base font-semibold text-nft-black-1 dark:text-white">
                        EnmaKet, Inc. All Rights Reserved
                    </p>
                    <div className="flex flex-row sm:mt-4">
                        {[images.instagram, images.twitter, images.discord].map(
                            (image, index) => (
                                <div
                                    className="mx-2 cursor-pointer"
                                    key={index}
                                >
                                    <Image
                                        src={image}
                                        objectFit="contain"
                                        width={24}
                                        height={24}
                                        alt="social"
                                        className={
                                            theme === "light" && "invert"
                                        }
                                    />
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

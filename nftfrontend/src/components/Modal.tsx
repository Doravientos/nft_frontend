"use client";
import React, { useRef } from "react";
import { useTheme } from "next-themes";
import images from "../assets";
import Image from "next/image";
// @ts-ignore
const Modal = ({ header, body, footer, handleClose }) => {
    const modalRef = useRef(null);
    const { theme } = useTheme();
    // @ts-ignore
    const handleClickOutside = (e) => {
        // @ts-ignore
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            handleClose();
        }
    };
    return (
        <div
            className="flexCenter animated fadeIn fixed inset-0 z-10 bg-overlay-black"
            onClick={handleClickOutside}
        >
            <div
                ref={modalRef}
                className="flex w-2/5 flex-col rounded-lg bg-white dark:bg-nft-dark md:w-11/12 minlg:w-2/4"
            >
                <div className="mr-4 mt-4 flex justify-end minlg:mr-6 minlg:mt-6">
                    <div
                        className="relative size-3 cursor-pointer minlg:size-6"
                        onClick={handleClose}
                    >
                        <Image
                            src={images.cross}
                            layout="fill"
                            className={theme === "light" ? "invert" : ""}
                            alt="close sell modal"
                        />
                    </div>
                </div>
                <div className="flexCenter w-full p-4 text-center">
                    <h2 className="font-poppins text-2xl font-normal text-nft-black-1 dark:text-white">
                        {header}
                    </h2>
                </div>
                <div className="border-y border-nft-gray-1 p-10 dark:border-nft-black-3 sm:px-4">
                    {body}
                </div>
                <div className="flexCenter p-4">{footer}</div>
            </div>
        </div>
    );
};

export default Modal;

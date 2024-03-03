import React from "react";
import Image from "next/image";
import images from "../assets";

const Loader = () => {
    return (
        <div className="flexCenter my-4 w-full">
            <Image
                src={images.loader}
                alt="loader"
                width={100}
                objectFit="contain"
            />
        </div>
    );
};

export default Loader;

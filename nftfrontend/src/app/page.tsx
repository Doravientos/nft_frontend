"use client";
import { Banner, CreatorCard, NFTCard } from "@/components";
import { useState, useEffect, useRef, useContext } from "react";
import images from "../assets";
import { makeId } from "../../utils/makeId";
import Image from "next/image";
import { useTheme } from "next-themes";
import { NFTContext } from "../../context/NftContext";

function Home() {
    const { fetchNfts } = useContext(NFTContext);
    const parentRef = useRef(null);
    const scrollRef = useRef(null);
    const { theme } = useTheme();
    const [hideButtons, setHideButtons] = useState(false);
    const [nfts, setNFTS] = useState([]);

    useEffect(() => {
        const fetchAndSetNfs = async () => {
            const fetchedNfts = await fetchNfts();
            console.log({ fetchedNfts });
            setNFTS(fetchedNfts);
        };
        fetchAndSetNfs();
    }, []);

    const handleScroll = (direction) => {
        const { current } = scrollRef;
        const scrollAmount = window.innerWidth > 1800 ? 270 : 210;
        if (direction === "left") {
            current.scrollLeft -= scrollAmount;
        } else {
            current.scrollLeft += scrollAmount;
        }
    };

    const isScrollable = () => {
        const { current } = scrollRef;
        const { current: parent } = parentRef;
        if (current?.scrollWidth >= parent?.offsetWidth) {
            setHideButtons(false);
        } else {
            setHideButtons(true);
        }
    };

    useEffect(() => {
        isScrollable();
        window.addEventListener("resize", isScrollable);
        return () => {
            window.removeEventListener("resize", isScrollable);
        };
    });

    return (
        <div className="flex justify-center p-12 sm:px-4">
            <div className="w-full minmd:w-4/5">
                <Banner
                    parentStyles="justify-start mb-6 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl"
                    childStyles="md:text-4xl sm:text-2xl xs:text-xl text-left"
                    name="Discover, collect, and sell extraordinary NFTs"
                />
                <div>
                    <h1 className="ml-4 font-poppins text-2xl font-semibold text-nft-black-1 dark:text-white xs:ml-0 minlg:text-4xl">
                        Best Creators
                    </h1>
                    <div
                        className="relative mt-3 flex max-w-full flex-1"
                        ref={parentRef}
                    >
                        <div
                            className="no-scrollbar flex w-max select-none flex-row overflow-x-scroll"
                            ref={scrollRef}
                        >
                            {[6, 7, 8, 9, 10].map((i) => (
                                <CreatorCard
                                    key={`creator-${i}`}
                                    rank={i}
                                    creatorImage={images[`creator${i}`]}
                                    creatorName={`0x${makeId(3)}...${makeId(4)}`}
                                    creatorEths={10 - i * 0.5}
                                />
                            ))}
                            {!hideButtons && (
                                <>
                                    <div
                                        className="absolute left-0 top-45 size-8 cursor-pointer minlg:size-12"
                                        onClick={() => handleScroll("left")}
                                    >
                                        <Image
                                            src={images.left}
                                            layout="fill"
                                            objectFit="contain"
                                            alt="left_arrow"
                                            className={
                                                theme === "light" && "invert"
                                            }
                                        />
                                    </div>
                                    <div
                                        className="absolute right-0 top-45 size-8 cursor-pointer minlg:size-12"
                                        onClick={() => handleScroll("right")}
                                    >
                                        <Image
                                            src={images.right}
                                            layout="fill"
                                            objectFit="contain"
                                            alt="left_arrow"
                                            className={
                                                theme === "light" && "invert"
                                            }
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className="mt-10">
                    <div className="flexBetween mx-4 sm:flex-col sm:items-start xs:mx-0 minlg:mx-8">
                        <h1 className="flex-1 font-poppins text-2xl font-semibold text-nft-black-1 dark:text-white sm:mb-4 minlg:text-4xl">
                            Hot Bids
                        </h1>
                        <div>SearchBar</div>
                    </div>
                    <div className="mt-3 flex w-full flex-wrap justify-start md:justify-center">
                        {nfts.map((nft) => (
                            <NFTCard key={nft.tokenId} nft={nft} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;

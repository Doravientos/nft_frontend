"use client";
import { Banner, CreatorCard, Loader, NFTCard, SearchBar } from "@/components";
import { useState, useEffect, useRef, useContext } from "react";
import images from "../assets";
// import { makeId } from "../../utils/makeId";
import Image from "next/image";
import { useTheme } from "next-themes";
import { NFTContext } from "../../context/NftContext";
import { getTopCreators } from "../../utils/getTopCreators";
import { shortenAddress } from "../../utils/shortenAddress";

function Home() {
    // @ts-ignore
    const { fetchNfts } = useContext(NFTContext);
    const parentRef = useRef(null);
    const scrollRef = useRef(null);
    const { theme } = useTheme();
    const [hideButtons, setHideButtons] = useState(false);
    const [nfts, setNFTS] = useState([]);
    const [nftsCopy, setNFTSCopy] = useState([]);
    const [topCreators, setTopCreators] = useState([]);
    const [activeSelect, setActiveSelect] = useState("Recently Added");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const sortedNfts = [...nfts];
        switch (activeSelect) {
            case "Price (low to high)":
                // @ts-ignore
                setNFTS(sortedNfts.sort((a, b) => a.price - b.price));
                break;
            case "Price (high to low)":
                // @ts-ignore
                setNFTS(sortedNfts.sort((a, b) => b.price - a.price));
                break;
            case "Recently Added":
                // @ts-ignore
                setNFTS(sortedNfts.sort((a, b) => b.tokenId - a.tokenId));
                break;
            default:
                setNFTS(nfts);
                break;
        }
    }, [activeSelect]);
    // @ts-ignore
    const onHandleSearch = (value) => {
        const filteredNfts = nfts.filter(({ name }) =>
            // @ts-ignore
            name.toLowerCase().includes(value.toLowerCase())
        );
        if (filteredNfts.length) {
            setNFTS(filteredNfts);
        } else {
            setNFTS(nftsCopy);
        }
    };
    const onClearSearch = () => {
        if (nfts.length && nftsCopy.length) {
            setNFTS(nftsCopy);
        }
    };

    useEffect(() => {
        const fetchAndSetNfs = async () => {
            const fetchedNfts = await fetchNfts();
            console.log({ fetchedNfts });
            setNFTS(fetchedNfts);
            setNFTSCopy(fetchedNfts);
            setIsLoading(false);
            const topCreatorsFetched = getTopCreators(fetchedNfts);
            console.log({ topCreatorsFetched });
            // @ts-ignore
            setTopCreators(topCreatorsFetched);
        };
        fetchAndSetNfs();
    }, []);
    // @ts-ignore
    const handleScroll = (direction) => {
        const { current } = scrollRef;
        const scrollAmount = window.innerWidth > 1800 ? 270 : 210;
        if (direction === "left") {
            // @ts-ignore
            current.scrollLeft -= scrollAmount;
        } else {
            // @ts-ignore
            current.scrollLeft += scrollAmount;
        }
    };

    const isScrollable = () => {
        const { current } = scrollRef;
        const { current: parent } = parentRef;
        // @ts-ignore
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
                    name={
                        <>
                            Discover, collect, and sell <br /> extraordinary
                            NFTs
                        </>
                    }
                />
                {!isLoading && !nfts.length ? (
                    <h1 className="ml-4 font-poppins text-2xl font-semibold text-nft-black-1 dark:text-white xs:ml-0 minlg:text-4xl">
                        That is weird... No NFTs for sale!
                    </h1>
                ) : isLoading ? (
                    <Loader />
                ) : (
                    <>
                        <div>
                            <h1 className="ml-4 font-poppins text-2xl font-semibold text-nft-black-1 dark:text-white xs:ml-0 minlg:text-4xl">
                                Top Sellers
                            </h1>
                            <div
                                className="relative mt-3 flex max-w-full flex-1"
                                ref={parentRef}
                            >
                                <div
                                    className="no-scrollbar flex w-max select-none flex-row overflow-x-scroll"
                                    ref={scrollRef}
                                >
                                    {topCreators.map((creator, i) => (
                                        <CreatorCard
                                            // @ts-ignore
                                            key={creator.seller}
                                            rank={i + 1}
                                            // @ts-ignore
                                            creatorImage={creator.seller}
                                            creatorName={shortenAddress(
                                                // @ts-ignore
                                                creator.seller
                                            )}
                                            // @ts-ignore
                                            creatorEths={creator.price}
                                        />
                                    ))}
                                    {!hideButtons && (
                                        <>
                                            <div
                                                className="absolute left-0 top-45 size-8 cursor-pointer minlg:size-12"
                                                onClick={() =>
                                                    handleScroll("left")
                                                }
                                            >
                                                <Image
                                                    src={images.left}
                                                    layout="fill"
                                                    objectFit="contain"
                                                    alt="left_arrow"
                                                    className={
                                                        theme === "light"
                                                            ? "invert"
                                                            : ""
                                                    }
                                                />
                                            </div>
                                            <div
                                                className="absolute right-0 top-45 size-8 cursor-pointer minlg:size-12"
                                                onClick={() =>
                                                    handleScroll("right")
                                                }
                                            >
                                                <Image
                                                    src={images.right}
                                                    layout="fill"
                                                    objectFit="contain"
                                                    alt="left_arrow"
                                                    className={
                                                        theme === "light"
                                                            ? "invert"
                                                            : ""
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
                                    Hot NFTs
                                </h1>
                                <div className="flex flex-2 flex-row sm:w-full sm:flex-col">
                                    <SearchBar
                                        activeSelect={activeSelect}
                                        setActiveSelect={setActiveSelect}
                                        handleSearch={onHandleSearch}
                                        clearSearch={onClearSearch}
                                    />
                                </div>
                            </div>
                            <div className="mt-3 flex w-full flex-wrap justify-start md:justify-center">
                                {nfts.map((nft) => (
                                    // @ts-ignore
                                    <NFTCard key={nft.tokenId} nft={nft} />
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Home;

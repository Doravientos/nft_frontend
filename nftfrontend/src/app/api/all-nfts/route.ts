import { ethers } from "ethers";
import { MarketAddress, MarketAddressAbi } from "../../../../context/constants";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server.js";

export async function GET(req: NextRequest) {
    const provider = new ethers.JsonRpcProvider(
        "https://sepolia.drpc.org",
        "sepolia"
    );
    const contract = new ethers.Contract(
        MarketAddress,
        MarketAddressAbi,
        provider
    );
    const allNfts = await contract.listedItemsForSale();
    console.log(allNfts.length);
    const listedNfts = await Promise.all(
        allNfts.map(
            // @ts-ignore
            async ({ tokenId, seller, owner, price: unformattedPrice }) => {
                const tokenURI = await contract.tokenURI(tokenId);
                const {
                    data: { image, name, description },
                } = await axios.get(`${tokenURI}`);
                const price = ethers.formatEther(unformattedPrice);
                tokenId = parseInt(tokenId);
                return {
                    price,
                    tokenId,
                    seller,
                    owner,
                    image: `https://${process.env.PINATADOMAIN}/ipfs/${image}`,
                    name,
                    description,
                    tokenURI,
                };
            }
        )
    );
    return NextResponse.json(
        { listedNfts },
        {
            status: 200,
        }
    );
}

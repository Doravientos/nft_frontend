export function getTopCreators(nfts) {
    const nftSingleObj = {};
    for (let i = 0; i < nfts.length; i++) {
        const currentNft = nfts[i];
        if (nftSingleObj[currentNft.seller]) {
            const curPrice = nftSingleObj[currentNft.seller].price;
            nftSingleObj[currentNft.seller] = { ...currentNft, price: parseFloat(currentNft.price) + parseFloat(curPrice) };
        } else {
            nftSingleObj[currentNft.seller] = currentNft;
        }
    }
    const returnArr = [];
    for (const seller in nftSingleObj) {
        returnArr.push(nftSingleObj[seller]);
    }
    returnArr.sort((a, b) => b.price - a.price); // decreasing order
    return returnArr;
};

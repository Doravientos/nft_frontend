export const makeId = (length) => {
    let res = "";
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        res += "a";
    }
    return res;
};

import React from "react";
// @ts-ignore
const Button = ({ classStyles, btnName, handleClick }) => {
    return (
        <button
            type="button"
            className={`nft-gradient px-6 py-2 font-poppins text-sm font-semibold text-white minlg:px-8 minlg:text-lg ${classStyles}`}
            onClick={handleClick}
        >
            {btnName}
        </button>
    );
};

export default Button;

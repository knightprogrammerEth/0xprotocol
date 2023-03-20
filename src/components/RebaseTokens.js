import { BigNumber, ethers } from "ethers";
import { useEffect, useState } from "react";
import { ButtonTokenDetails } from "./contractDetails";

function RebaseTokens() {
  const [totalSuppply, setTotalSupply] = useState(0);
  const [error, setError] = useState("");
  async function callRebase() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const signer = provider.getSigner();
      const buttonTokenContract = new ethers.Contract(
        ButtonTokenDetails.address,
        ButtonTokenDetails.abi,
        signer
      );
      try {
        const tx = await buttonTokenContract.rebase();
        await tx.wait();
      } catch (e) {
        setError("" + e.reason);
      }

      const balance = await buttonTokenContract.totalSupply();
      const valueToset = ethers.BigNumber.from(balance).toString();

      // const valueToset =
      // parseFloat(ethers.BigNumber.from(balance).toString()) / 10 ** 18;

      setTotalSupply(valueToset);
    } else {
      setError("MetaMask not installed");
    }
  }
  async function getTotalSupply() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const buttonTokenContract = new ethers.Contract(
        ButtonTokenDetails.address,
        ButtonTokenDetails.abi,
        provider
      );
      const balance = await buttonTokenContract.totalSupply();

      const valueToset = ethers.BigNumber.from(balance).toString();
      // const valueToset =
      //   parseFloat(ethers.BigNumber.from(balance).toString()) / 10 ** 18;

      setTotalSupply(valueToset);
    }
  }
  useEffect(() => {
    getTotalSupply();
  }, []);
  return (
    <div>
      <div className="flex flex-col items-center">
        <p className="text-xl">Rebase Tokens</p>
        {error && (
          <div className="text-white p-2 bg-red-600 m-2 rounded-md">
            <p>Error: {error}</p>
          </div>
        )}
        <p>
          {"ButtonToken's"} Total Supply: {totalSuppply}
        </p>
        <button
          className="text w-40 h-14 bg-stone-500 text-white"
          onClick={() => {
            console.log("Rebase Called");
            callRebase();
          }}
        >
          Rebase
        </button>
      </div>
    </div>
  );
}

export default RebaseTokens;

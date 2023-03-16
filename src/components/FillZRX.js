import { useState } from "react";

import { LimitOrder, SignatureType } from "@0x/protocol-utils";
import { getContractAddressesForChainOrThrow } from "@0x/contract-addresses";

import { MetamaskSubprovider } from "@0x/subproviders";
const ContractWrappers = require("@0x/contract-wrappers");
import { BigNumber } from "@0x/utils";

function FillZRX({ value }) {
  const [error, setError] = useState("");
  async function fill() {
    try {
      setError("");
      const CHAIN_ID = 137;
      // Unlock metamask
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      // Use first selected Metamask account
      const maker = accounts[0];
      

      const order = value;

      let supportedProvider = new MetamaskSubprovider(window.ethereum);

      const addresses = getContractAddressesForChainOrThrow(CHAIN_ID);

      const exchange = new ContractWrappers.IZeroExContract(
        addresses.exchangeProxy,
        supportedProvider,
        {
          from: maker,
        }
      );
      const tx = await exchange
        .fillLimitOrder(order, value.signature, new BigNumber(order.takerAmount))
        .awaitTransactionSuccessAsync();
      console.log(tx);
    } catch (e) {
      setError(e.message);
    }
  }
  return (
    <>
      {error && (
        <div className="text-white p-2 bg-red-600 m-2 rounded-md">
          <p>Error: {error}</p>
        </div>
      )}
      <button
        className="text w-40 h-14 bg-orange-600 text-white"
        onClick={fill}
      >
        Fill Order
      </button>
    </>
  );
}

export default FillZRX;

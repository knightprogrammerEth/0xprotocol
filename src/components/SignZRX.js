import { useState } from "react";
import { LimitOrder, SignatureType } from "@0x/protocol-utils";
import { getContractAddressesForChainOrThrow } from "@0x/contract-addresses";
import { MetamaskSubprovider } from "@0x/subproviders";

/**
 * Component to sign and submit a 0x limit order
 */

function SignZRX() {
  const [sellAmount, setSellAmount] = useState("");
  const [buyAmount, setBuyAmount] = useState("");
  const [error, setError] = useState("");

  async function sign() {
    try {
      setError("");
      const CHAIN_ID = 137; // 3: Ropsten; 1: Mainnet; 137: Polygon
      const NULL_ADDRESS = "0x0000000000000000000000000000000000000000";
      const addresses = getContractAddressesForChainOrThrow(CHAIN_ID);

      // Calculate value for order expiry parameter (here: 50 minutes)
      const getFutureExpiryInSeconds = () =>
        Math.floor(Date.now() / 1000 + 3000).toString();

      // Unlock MetaMask (assumes that you have MetaMask installed; Wallet connect logic is handled in WalletConnectButton component)
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      // Use currently connected MetaMask account as the maker account
      const maker = accounts[0];
      console.log("Maker address: " + maker);

      // Create order
      // maker is the account creating the order; makerToken is the asset the maker wants to sell
      // taker is the account filling a maker's order; takerToken is the token the maker wants to buy / taker will sell
      // QUESTION: Can maker create the order even when he doesn't own the respective amount of takerTokens?
      const order = new LimitOrder({
        makerToken: "0x63dade39ad23811f8c021306917dbbde808388b2", //"0xc03ce38bc55836a4ef61ab570253cd7bfff3af44", // 0x32de... is a test ERC20 token; you can leverage the @0x/contract-addresses library for standard tokens (e.g., addresses.etherToken, addresses.zrxToken)
        takerToken: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174", // Polygon USDC: 0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174; Ropsten DAI: 0xad6d458402f60fd3bd25163575031acdce07538d
        makerAmount: (+sellAmount * 1000000000000000000).toString(), // 1 LONG; 0.01 for ERC20 tokens with 18 decimals
        takerAmount: (+buyAmount * 1000000).toString(), // 0.5 WAGMI18; <- Polygon USDC with 6 decimals (1000 = 0.001); Ropsten DAI with 18 decimals (50000000000000000 = 0.05)
        maker: maker,
        sender: NULL_ADDRESS,
        expiry: getFutureExpiryInSeconds(),
        salt: Date.now().toString(), // Some random input to ensure uniqueness of order
        chainId: CHAIN_ID,
        verifyingContract: addresses.exchangeProxy, // typically 0x's exchangeProxy contract; erc20Proxy:
        takerTokenFeeAmount: "0",
        sender: "0x0000000000000000000000000000000000000000",
        feeRecipient: "0x0000000000000000000000000000000000000000",
      });

      const supportedProvider = new MetamaskSubprovider(window.ethereum);

      // Sign order conforming to the EIP712 standard
      const signature = await order.getSignatureWithProviderAsync(
        supportedProvider, // assuming Metamask is installed and connected. Wallet connect logic is handled in WalletConnectButton component
        SignatureType.EIP712 // Optional
      );
      console.log(`Signature: ${JSON.stringify(signature, undefined, 2)}`);

      // Append signature object to order object for the post of the order
      const signedOrder = { ...order, signature };

      const resp = await fetch(
        "https://polygon.api.0x.org/orderbook/v1/order",
        {
          method: "POST",
          body: JSON.stringify(signedOrder),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // // Handle response
      if (resp.status === 200) {
        alert("Successfully posted order to SRA");
      } else {
        const body = await resp.json();
        alert(
          `ERROR(status code ${resp.status}): ${JSON.stringify(
            body,
            undefined,
            2
          )}`
        );
      }
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center space-y-5">
      {error && (
        <div className="text-white p-2 bg-red-600 m-2 rounded-md">
          <p>Error: {error}</p>
        </div>
      )}
      <label htmlFor="sellAmt" className="text-xl">
        [buttonClone] Token Amount:
      </label>
      <input
        className="border-black border-2 w-1/5 p-2"
        id="sellAmt"
        value={sellAmount}
        onChange={(e) => setSellAmount(e.target.value)}
      />
      <label htmlFor="buyAmt" className="text-xl">
      [USDC] Selling Price:
      </label>
      <input
        className="border-black border-2 w-1/5 p-2"
        id="buyAmt"
        value={buyAmount}
        onChange={(e) => setBuyAmount(e.target.value)}
      />
      <button className="text w-40 h-14 bg-stone-500 text-white" onClick={sign}>
        Sign and submit
      </button>
    </div>
  );
}

export default SignZRX;

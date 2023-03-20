This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# OxProtcol Dapp

Welcome to the decentralized application (dapp) of Oxprotocol. This dapp employs 0xprotocol to facilitate peer-to-peer asset exchange on the polygon mainet.

The dapp provides users with the ability to swap USDC and ButtonTokenClone. ButtonTokenClone is an ERC20 rebase token that adjusts its total supply in response to changes in its price, typically on a regular basis.

When the price of a rebase token increases, the protocol automatically increases the total supply of the token, diluting the value of each individual token. Conversely, when the price of the token decreases, the protocol reduces the total supply of the token, increasing the value of each individual token. This mechanism is designed to incentivize buying and selling of the token to stabilize its price.

## Features

1. This Dapp allows user to swap between USDC and ButtonTokenClone <br />
2. Onwer of the ButtonToken can also call rebase operation from the same interface

# Prerequisites

To use the 0xProtocol Dapp, you must have the following:

Node.js (v18.14.2 or later)</br>
A Web3-enabled browser (e.g. Metamask)</br>
ButtonTokensClone</br>
USDC tokens

# How to run

## Installing

To install the 0xProtocol Dapp, clone the repository and install the dependencies:

```bash
git clone https://github.com/knightprogrammerEth/0xprotocol

cd 0xprotocol

npm install

npm run dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

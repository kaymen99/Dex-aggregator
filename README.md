<div id="top"></div>

<!-- ABOUT THE PROJECT -->
## Dex-aggregator

With the ever growing DEFI world and the appearance of multiple decentralized exchanges on the different blockchains, the WEB3 ecosystem needs a way to compare the pros & cons of swapping on each DEX. 

This excatly what Paraswap & 1inch protocol are trying to do, they aggregate the prices of tokens from multiple exchanges in each Blockchain (for example: uniswap, sushiswap, shibaswap in the Ethereum Mainnet), then they compare those prices and the swapping fee and offer to their user the best exchange rate possible.

In this Dapp, i built a simplified version of Paraswap it works on 4 blockchains: Ethereum, Polygon, Binance Smart Chain and the kovan testnet.For the moment it supports some well known tokens (ETH, Matic, Dai, USDC,...).

<p align="center">
  <img alt="Dark" src="https://user-images.githubusercontent.com/83681204/182487367-977ccc2f-2ba3-414c-9a5f-1b4b855af4a6.png" width="100%">
</p>

### Built With

* [Solidity](https://docs.soliditylang.org/)
* [Brownie](https://eth-brownie.readthedocs.io)
* [React.js](https://reactjs.org/)
* [ethers.js](https://docs.ethers.io/v5/)
* [web3modal](https://github.com/Web3Modal/web3modal)
* [material ui](https://mui.com/getting-started/installation/)


<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

Please install or have installed the following:
* [nodejs and npm](https://nodejs.org/en/download/) 
* [python](https://www.python.org/downloads/)
* [MetaMask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn) Chrome extension installed in your browser

### Installation

1. Installing Brownie: Brownie is a python framework for smart contracts development,testing and deployments. It's quit like [HardHat](https://hardhat.org) but it uses python for writing test and deployements scripts instead of javascript.
   Here is a simple way to install brownie.
   ```
    pip install --user pipx
    pipx ensurepath
    # restart your terminal
    pipx install eth-brownie
   ```
   Or if you can't get pipx to work, via pip (it's recommended to use pipx)
    ```sh
    pip install eth-brownie
    ```
   Install [ganache-cli](https://www.npmjs.com/package/ganache-cli): 
   ```sh
    npm install -g ganache-cli
    ```
2. Clone the repo:
   ```sh
   git clone https://github.com/kaymen99/Dex-aggregator.git
   cd Dex-aggregator
   ```
   
3. Set your environment variables
   To be able to deploy to real testnets you need to add your PRIVATE_KEY (You can find your PRIVATE_KEY from your ethereum wallet like metamask) and the infura project Id (just create an infura account it's free) to the .env file:
   ```
   PRIVATE_KEY=<PRIVATE_KEY>
   WEB3_INFURA_PROJECT_ID=<< YOUR INFURA PROJECT ID >>
   ```
   You can choose to use ethereum testnets like rinkeby, Kovan or any other evm compatible testnet.
   You'll also need some eth in the testnet. You can get it into your wallet by using a public faucet. 


<p align="right">(<a href="#top">back to top</a>)</p>


<!-- USAGE EXAMPLES -->
## How to Use
   After going throught the installation part you can start the app by running:
   ```sh
   cd front-end
   yarn
   yarn start
   ```
   The front-end is built using the following libraries:
      <ul>
        <li><b>Ethers.js:</b> used as interface between the UI and the deployed smart contract</li>
        <li><b>Web3modal:</b> for conecting to Metamask</li>
        <li><b>@reduxjs/toolkit & redux-persist:</b> for managing the app states (account, balance, blockchain) </li>
        <li><b>Material UI:</b> used for react components and styles </li>    
      </ul>
   There are 2 main components:
      <ul>
        <li><b>Swap component:</b> It finds the best price possible for the user tokens from the supported exchanges and allow user to approve & excute the swap transaction </li>
        <li><b>Exchanges component:</b> For getting the token prices on the different exchanges</li>  
      </ul>   

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- Contact -->
## Contact

If you have any question or problem running this project just contact me: aymenMir1001@gmail.com

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<div id="top"></div>

<!-- ABOUT THE PROJECT -->
## Dex-aggregator


<p align="center">
  <img alt="Dark" src="https://user-images.githubusercontent.com/83681204/164813894-c23e969f-0fc5-4beb-bcac-09ef92f364ce.png" width="100%">
</p>


Dapp that enable user to compare prices a cross different exchanges and swap at the best rate 


### Built With

* [Solidity](https://docs.soliditylang.org/)
* [Brownie](https://eth-brownie.readthedocs.io)
* [React.js](https://reactjs.org/)
* [ethers.js](https://docs.ethers.io/v5/)
* [web3modal](https://github.com/Web3Modal/web3modal)
* [material ui](https://mui.com/getting-started/installation/)


<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
      <a href="#how-it-works">How it Works</a>
    </li>
    <li>
      <a href="#usage">How to Use</a>
    </li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>


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
    ```
    pip install eth-brownie
    ```
   
2. Clone the repo:
   ```sh
   git clone https://github.com/Aymen1001/Dex-aggregator.git
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


<!-- Working EXAMPLES -->
## How it Works



<p align="right">(<a href="#top">back to top</a>)</p>


<!-- USAGE EXAMPLES -->
## How to Use

   
<p align="right">(<a href="#top">back to top</a>)</p>


<!-- Contact -->
## Contact

If you have any question or problem running this project just contact me: aymenMir1001@gmail.com

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



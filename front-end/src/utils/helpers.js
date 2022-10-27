import IRouter from "./../artifacts/interfaces/IUniswapV2Router02.json";
import ISwapRouter from "./../artifacts/interfaces/ISwapRouter.json";
import IQouter from "./../artifacts/interfaces/IQuoter.json";

import eth from "./../assets/images/etherLogo.png";
import bnb from "./../assets/images/bnb.png";
import matic from "./../assets/images/matic.png";
import dai from "./../assets/images/dai.png";
import crv from "./../assets/images/crv.png";
import usdc from "./../assets/images/usdc.png";
import aave from "./../assets/images/aave.png"
import link from "./../assets/images/link.png"
import usdt from "./../assets/images/usdt.png";
import uni from "./../assets/images/uni.jpg"

export const tokens = {
    "Ethereum Mainnet": [
        {
            "image": eth,
            "name": "ETH",
            "address": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
            "decimals": 18
        },
        {
            "image": dai,
            "name": "DAI",
            "address": "0x6b175474e89094c44da98b954eedeac495271d0f",
            "decimals": 18
        },
        {
            "image": usdc,
            "name": "USDC",
            "address": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
            "decimals": 6
        },
        {
            "image": usdt,
            "name": "USDT",
            "address": "0xdAC17F958D2ee523a2206206994597C13D831ec7",
            "decimals": 6
        },
        {
            "image": matic,
            "name": "MATIC",
            "address": "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
            "decimals": 18
        },
        {
            "image": crv,
            "name": "CRV",
            "address": "0xD533a949740bb3306d119CC777fa900bA034cd52",
            "decimals": 18
        },
        {
            "image": link,
            "name": "LINK",
            "address": "0x514910771AF9Ca656af840dff83E8264EcF986CA",
            "decimals": 18
        },
        {
            "image": uni,
            "name": "UNI",
            "address": "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
            "decimals": 18
        }
    ],
    "Goerli": [
        {
            "image": eth,
            "name": "ETH",
            "address": "0xd0A1E359811322d97991E03f863a0C30C2cF029C",
            "decimals": 18
        },
        {
            "image": dai,
            "name": "DAI",
            "address": "0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa",
            "decimals": 18
        },
        {
            "image": usdc,
            "name": "USDC",
            "address": "0xdCFaB8057d08634279f8201b55d311c2a67897D2",
            "decimals": 2
        },
        {
            "image": usdt,
            "name": "USDT",
            "address": "0xf3e0d7bF58c5d455D31ef1c2d5375904dF525105",
            "decimals": 6
        },
        {
            "image": crv,
            "name": "CRV",
            "address": "0xB8EEb94cFf33EfACf0c6def6967FD8852DcECDdB",
            "decimals": 18
        },
        {
            "image": matic,
            "name": "MATIC",
            "address": "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
            "decimals": 18
        },
        {
            "image": link,
            "name": "LINK",
            "address": "0xa36085F69e2889c224210F603D836748e7dC0088",
            "decimals": 18
        },
        {
            "image": uni,
            "name": "UNI",
            "address": "0x9b6Ff80Ff8348852d5281de45E66B7ED36E7B8a9",
            "decimals": 18
        },
    ],
    "Polygon Mainnet": [
        {
            "image": matic,
            "name": "MATIC",
            "address": "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
            "decimals": 18
        },
        {
            "image": eth,
            "name": "ETH",
            "address": "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
            "decimals": 18
        },
        {
            "image": dai,
            "name": "DAI",
            "address": "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
            "decimals": 18
        },
        {
            "image": usdc,
            "name": "USDC",
            "address": "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
            "decimals": 6
        },
        {
            "image": usdt,
            "name": "USDT",
            "address": "0xdAC17F958D2ee523a2206206994597C13D831ec7",
            "decimals": 6
        },
        {
            "image": aave,
            "name": "AAVE",
            "address": "0xD6DF932A45C0f255f85145f286eA0b292B21C90B",
            "decimals": 18
        },
        {
            "image": link,
            "name": "LINK",
            "address": "0x53E0bca35eC356BD5ddDFebbD1Fc0fD03FaBad39",
            "decimals": 18
        }
    ],
    "BSC": [
        {
            "image": eth,
            "name": "ETH",
            "address": "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
            "decimals": 18
        },
        {
            "image": bnb,
            "name": "BNB",
            "address": "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
            "decimals": 18
        },
        {
            "image": dai,
            "name": "DAI",
            "address": "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3",
            "decimals": 18
        },
        {
            "image": usdc,
            "name": "USDC",
            "address": "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
            "decimals": 6
        },
        {
            "image": usdt,
            "name": "USDT",
            "address": "0xdAC17F958D2ee523a2206206994597C13D831ec7",
            "decimals": 6
        },
        {
            "image": link,
            "name": "LINK",
            "address": "0xF8A0BF9cF54Bb92F17374d9e9A321E6a111a51bD",
            "decimals": 18
        }
    ],
}

export const exchanges = {
    "Ethereum Mainnet": [
        {
            "name": "Uniswap",
            "address": "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
            "router": IRouter
        },
        {
            "name": "Uniswap V3",
            "address": "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6",
            "router": ISwapRouter,
            "quoter": IQouter
        },
        {
            "name": "Sushiswap",
            "address": "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F",
            "router": IRouter
        },
        {
            "name": "Shibaswap",
            "address": "0x03f7724180AA6b939894B5Ca4314783B0b36b329",
            "router": IRouter
        }
    ],
    "Goerli": [
        {
            "name": "Uniswap",
            "address": "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
            "router": IRouter
        },
        {
            "name": "Uniswap V3",
            "address": "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6",
            "router": ISwapRouter,
            "quoter": IQouter
        },
        {
            "name": "Sushiswap",
            "address": "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F",
            "router": IRouter
        },
        {
            "name": "Shibaswap",
            "address": "0x03f7724180AA6b939894B5Ca4314783B0b36b329",
            "router": IRouter
        }
    ],
    "Polygon Mainnet": [
        {
            "name": "Sushiswap",
            "address": "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506",
            "router": IRouter
        },
        {
            "name": "Uniswap V3",
            "address": "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6",
            "router": ISwapRouter,
            "quoter": IQouter
        },
        {
            "name": "Quickswap",
            "address": "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff",
            "router": IRouter
        },
        {
            "name": "Jetswap",
            "address": "0x5C6EC38fb0e2609672BDf628B1fD605A523E5923",
            "router": IRouter
        },
        {
            "name": "Apeswap",
            "address": "0xC0788A3aD43d79aa53B09c2EaCc313A787d1d607",
            "router": IRouter
        }

    ],
    "BSC": [
        {
            "name": "Sushiswap",
            "address": "0x947950BcC74888a40Ffa2593C5798F11Fc9124C4",
            "router": IRouter
        },
        {
            "name": "Apeswap",
            "address": "0xcF0feBd3f17CEf5b47b0cD257aCf6025c5BFf3b7",
            "router": IRouter
        },
        {
            "name": "Jetswap",
            "address": "0x5C6EC38fb0e2609672BDf628B1fD605A523E5923",
            "router": IRouter
        },
        {
            "name": "Pancakeswap",
            "address": "0x10ED43C718714eb63d5aA57B78B54704E256024E",
            "router": IRouter
        }
    ]
}

export const exchangesMap = {
    "Ethereum Mainnet": {
        0: {
            "name": "UNISWAP",
            "address": "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"
        },
        1: {
            "name": "Uniswap V3",
            "address": "0xE592427A0AEce92De3Edee1F18E0157C05861564",
        },
        2: {
            "name": "SUSHISWAP",
            "address": "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F"
        },
        3: {
            "name": "SHIBASWAP",
            "address": "0x03f7724180AA6b939894B5Ca4314783B0b36b329"
        }
    },
    "Goerli": {
        0: {
            "name": "UNISWAP",
            "address": "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"
        },
        1: {
            "name": "Uniswap V3",
            "address": "0xE592427A0AEce92De3Edee1F18E0157C05861564",
        },
        2: {
            "name": "SUSHISWAP",
            "address": "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F"
        },
        3: {
            "name": "SHIBASWAP",
            "address": "0x03f7724180AA6b939894B5Ca4314783B0b36b329"
        }
    },
    "Polygon Mainnet": {
        0: {
            "name": "SUSHISWAP",
            "address": "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506"
        },
        1: {
            "name": "Uniswap V3",
            "address": "0xE592427A0AEce92De3Edee1F18E0157C05861564",
        },
        2: {
            "name": "QUICKSWAP",
            "address": "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff"
        },
        3: {
            "name": "JETSWAP",
            "address": "0x5C6EC38fb0e2609672BDf628B1fD605A523E5923"
        },
        4: {
            "name": "APESWAP",
            "address": "0xC0788A3aD43d79aa53B09c2EaCc313A787d1d607"
        }
    },
    "BSC": {
        0: {
            "name": "SUSHISWAP",
            "address": "0x947950BcC74888a40Ffa2593C5798F11Fc9124C4"
        },
        1: {
            "name": "PANCAKESWAP",
            "address": "0x10ED43C718714eb63d5aA57B78B54704E256024E"
        },
        2: {
            "name": "JETSWAP",
            "address": "0x5C6EC38fb0e2609672BDf628B1fD605A523E5923"
        },
        3: {
            "name": "APESWAP",
            "address": "0xcF0feBd3f17CEf5b47b0cD257aCf6025c5BFf3b7"
        }
    },
}

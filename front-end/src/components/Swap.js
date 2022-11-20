import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import { Modal } from "react-bootstrap"
import { Button, CircularProgress } from "@mui/material";
import { ethers, utils } from 'ethers';
import qs from 'qs'

import "../assets/css/styles.css";
import { tokens, exchanges, exchangesMap } from "../utils/helpers";
import IRouter from "../artifacts/interfaces/IUniswapV2Router02.json";
import ISwapRouter from "../artifacts/interfaces/ISwapRouter.json";
import ERC20 from "../artifacts/interfaces/IERC20.json";
import Exchanges from './Exchanges';

function Swap() {
    const data = useSelector((state) => state.blockchain.value)
    const [amountIn, setAmountIn] = useState(0);
    const [amountOut, setAmountOut] = useState(0);
    const [tokenInBalance, setTokenInBalance] = useState(null);
    const [gasPrice, setGasPrice] = useState(null);
    const [bestExchange, setBestExchange] = useState(null);
    const [isSwapping, setIsSwapping] = useState(false);

    const [tradeSide, setTradeSide] = useState("");
    const [trade, setTrade] = useState({
        fromToken: "0",
        toToken: "1"
    });

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (side) => {
        setTradeSide(side)
        setShow(true);
    }


    async function getPriceOut(_amountIn) {
        if (window.ethereum !== undefined) {
            const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
            setAmountIn(Number(_amountIn))
            if (Number(_amountIn) !== 0) {
                const decimals = tokens[currentNet][trade.toToken]["decimals"]
                const _tokenIn = tokens[currentNet][trade.fromToken]["address"]
                const _tokenOut = tokens[currentNet][trade.toToken]["address"]
                let path = [_tokenIn, _tokenOut]

                let amount_in = utils.parseEther(_amountIn.toString(), "ether")
                const prices = await Promise.all(
                    exchanges[currentNet].map(async (e) => {
                        if (e.name !== "Uniswap V3") {
                            const router = new ethers.Contract(e.address, e.router.abi, provider)
                            try {
                                const amount = await router.getAmountsOut(amount_in, path)
                                return Number(amount[1])
                            } catch (err) {
                                return 0
                            }
                        } else {
                            const quoter = new ethers.Contract(e.address, e.quoter.abi, provider)
                            try {
                                const amount = await quoter.callStatic.quoteExactInputSingle(
                                    _tokenIn,
                                    _tokenOut,
                                    3000,
                                    amount_in,
                                    0
                                )
                                return Number(amount)
                            } catch (err) {
                                return 0
                            }
                        }
                    }))

                const maxPrice = Math.max.apply(null, prices)
                const maxPriceIndex = prices.indexOf(maxPrice)

                setAmountOut(Number(maxPrice) / 10 ** decimals)
                getGasPrice(_tokenIn, _tokenOut, Number(_amountIn) * 10 ** decimals)
                setBestExchange(exchangesMap[currentNet][maxPriceIndex])
            } else {
                setAmountOut("0")
            }
        }
    }

    async function getPriceIn(_amountOut) {
        if (window.ethereum !== undefined) {
            const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
            setAmountOut(Number(_amountOut))
            if (Number(_amountOut) !== 0) {
                const decimals = tokens[currentNet][trade.toToken]["decimals"]
                const _tokenIn = tokens[currentNet][trade.fromToken]["address"]
                const _tokenOut = tokens[currentNet][trade.toToken]["address"]
                let path = [_tokenIn, _tokenOut]

                let amount_out = utils.parseEther(_amountOut.toString(), "ether")
                const prices = await Promise.all(
                    exchanges[currentNet].map(async (e) => {
                        const router = new ethers.Contract(e.address, e.router.abi, provider)
                        try {
                            const amount = await router.getAmountsIn(amount_out, path)
                            return Number(amount[0])
                        } catch (err) {
                            return 10 ** 60
                        }
                    }))

                const minPrice = Math.min.apply(null, prices)
                const minPriceIndex = prices.indexOf(minPrice)

                setAmountIn(Number(minPrice) / 10 ** decimals)
                getGasPrice(_tokenOut, _tokenIn, Number(_amountOut) * 10 ** decimals)
                setBestExchange(exchangesMap[currentNet][minPriceIndex])
            } else {
                setAmountIn("0")
            }
        }
    }

    async function swap() {
        if (window.ethereum !== undefined) {
            const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
            try {
                setIsSwapping(true)
                const _tokenIn = tokens[currentNet][trade.fromToken]["address"]
                const _tokenOut = tokens[currentNet][trade.toToken]["address"]
                let path = [_tokenIn, _tokenOut]

                const _amountOutMin = Number(amountOut) * 0.95

                const amountOutMin = utils.parseEther(_amountOutMin.toString(), "ether")

                const signer = provider.getSigner()

                const erc20Contract = new ethers.Contract(_tokenIn, ERC20.abi, signer);

                const amount_in = utils.parseEther(amountIn.toString(), "ether")

                const approve_tx = await erc20Contract.approve(bestExchange["address"], amount_in)

                await approve_tx.wait()

                let timestamp = Math.floor(new Date().getTime() / 1000.0) + 15

                let router;
                if (bestExchange["name"] !== "Uniswap V3") {
                    router = new ethers.Contract(bestExchange["address"], IRouter.abi, signer)
                    try {
                        const swap_tx = await router.swapExactTokensForTokens(
                            amount_in,
                            amountOutMin,
                            path,
                            data.account,
                            timestamp
                        );
                        await swap_tx.wait()

                        setIsSwapping(false)
                        setAmountIn(null)
                        setAmountIn(null)
                    } catch (err) {
                        setIsSwapping(false)
                        window.alert("An error has occured")
                    }
                } else {
                    router = new ethers.Contract(bestExchange["address"], ISwapRouter.abi, signer)
                    try {
                        const params = {
                            tokenIn: path[0],
                            tokenOut: path[1],
                            fee: 3000,
                            recipient: data.account,
                            deadline: timestamp,
                            amountIn: amount_in,
                            amountOutMinimum: amountOutMin,
                            sqrtPriceLimitX96: 0
                        }
                        const swap_tx = await router.exactInputSingle(params);
                        await swap_tx.wait()

                        setIsSwapping(false)
                        setAmountIn(null)
                        setAmountIn(null)
                    } catch (err) {
                        setIsSwapping(false)
                        window.alert("An error has occured")
                    }
                }
            } catch (err) {
                setIsSwapping(false)
                window.alert("An error has occured")
            }
        }
    }

    async function getGasPrice(tokenIn, tokenOut, amount) {
        if (window.ethereum !== undefined) {
            const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
            const params = {
                sellToken: tokenIn,
                buyToken: tokenOut,
                sellAmount: amount,
            }
            // Fetch the swap price.
            const response = await fetch(
                `https://api.0x.org/swap/v1/price?${qs.stringify(params)}`
            );
            const swapPriceJSON = await response.json();
            const _gasPrice = await provider.getGasPrice()
            setGasPrice(swapPriceJSON.estimatedGas)
        }
    }

    async function getErc20Balance() {
        if (window.ethereum !== undefined) {
            const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
            const signer = provider.getSigner()

            const decimals = tokens[currentNet][trade.fromToken]["decimals"]
            const _tokenIn = tokens[currentNet][trade.fromToken]["address"]

            const erc20Contract = new ethers.Contract(_tokenIn, ERC20.abi, signer);
            const balance = (await erc20Contract.balanceOf(data.account)).toString();

            setTokenInBalance(Number(balance) / 10 ** decimals)
        }
    }

    async function selectToken(tokenIndex) {
        handleClose()
        if (tradeSide == "from") {
            setTrade({ ...trade, fromToken: tokenIndex })
        } else {
            setTrade({ ...trade, toToken: tokenIndex })
        }
    }
    const currentNet = data.network !== "" ? data.network : "Ethereum Mainnet"

    useEffect(() => {
        if (window.ethereum != undefined && data.network !== "") {
            getErc20Balance()
        }
    }, [trade.fromToken, data.network])

    return (
        data.network !== "" ? (
            <div className="header" >
                <div className="header-container">
                    <div className="header-box">
                        <div id="window">
                            <h4>Swap</h4>
                            <div id="form">
                                <div className="swapbox">
                                    <div className="swapbox_select token_select"
                                        onClick={() => { handleShow("from") }}>
                                        {trade.fromToken !== "" ? (
                                            <>
                                                <img className="token_img"
                                                    src={tokens["Ethereum Mainnet"][trade.fromToken].image}
                                                />
                                                <span className='token_text'>
                                                    {tokens["Ethereum Mainnet"][trade.fromToken].name}
                                                </span>
                                            </>
                                        ) : "Select A Token"}
                                    </div>
                                    <div className="swapbox_select">
                                        <input className="number form-control"
                                            type="number"
                                            value={amountIn !== 0 ? amountIn : ""}
                                            placeholder='Enter Amount'
                                            onChange={(e) => { getPriceOut(e.target.value) }} />
                                    </div>
                                </div>
                                <div className="swapbox">
                                    <div className="swapbox_select token_select"
                                        onClick={() => { handleShow("to") }}>
                                        {trade.toToken !== "" ? (
                                            <>
                                                <img className="token_img"
                                                    src={tokens["Ethereum Mainnet"][trade.toToken].image}
                                                />
                                                <span className='token_text'>
                                                    {tokens["Ethereum Mainnet"][trade.toToken].name}
                                                </span>
                                            </>
                                        ) : "Select A Token"}
                                    </div>
                                    <div className="swapbox_select">
                                        <input className="number form-control"
                                            type="number"
                                            value={amountOut !== 0 ? amountOut : ""}
                                            placeholder={'Enter Amount'}
                                            onChange={(e) => { getPriceIn(e.target.value) }} />
                                    </div>
                                </div>
                                <div className="gas_estimate_label">
                                    Estimated Gas: <span>{gasPrice}</span>
                                </div>
                                <div className="gas_estimate_label">
                                    Your {tokens["Ethereum Mainnet"][trade.fromToken].name} Balance: <span>{tokenInBalance}</span>
                                </div>
                                <button className="btn btn-primary" style={{ width: "100%" }} onClick={swap}>
                                    {isSwapping ? <CircularProgress color="inherit" size={18} /> : "Swap"}
                                </button>
                            </div>
                        </div>
                    </div>
                    <Modal show={show} onHide={handleClose} style={{ overflow: 'scroll' }}>
                        <Modal.Header closeButton>
                            <Modal.Title>SELECT A TOKEN</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {tokens["Ethereum Mainnet"].map((token, index) => {
                                return (
                                    <div className="token_row" key={index} onClick={() => { selectToken(index) }} >
                                        <img className="token_img" src={token.image} />
                                        <span className="token_text">{token.name}</span>
                                    </div>
                                )
                            })}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="contained" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <div className="header-box" style={{ textAlign: "center" }}>
                        <h3 >Exchanges</h3>
                        <Exchanges token0={trade.fromToken} token1={trade.toToken} />
                    </div>
                </div>
            </div>
        ) : null
    )
}

export default Swap;

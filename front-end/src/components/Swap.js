import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import { Modal } from "react-bootstrap"
import { Button, CircularProgress } from "@mui/material";
import { ethers, utils } from 'ethers';
import qs from 'qs'

import "../assets/css/styles.css";
import { tokens, exchanges, exchangesMap } from "../utils/helpers";
import IRouter from "../artifacts/interfaces/IUniswapV2Router02.json";
import ERC20 from "../artifacts/interfaces/IERC20.json";
import Exchanges from './Exchanges';

const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

function Swap() {
    const data = useSelector((state) => state.blockchain.value)
    const [amountIn, setAmountIn] = useState(null);
    const [amountOut, setAmountOut] = useState(null);
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
        setAmountIn(Number(_amountIn))
        if (Number(_amountIn) !== 0) {
            const decimals = tokens[currentNet][trade.toToken]["decimals"]
            const _tokenIn = tokens[currentNet][trade.fromToken]["address"]
            const _tokenOut = tokens[currentNet][trade.toToken]["address"]
            let path = [_tokenIn, _tokenOut]

            let amount_in = utils.parseEther(_amountIn.toString(), "ether")
            const prices = await Promise.all(
                exchanges[currentNet]["Dexes"].map(async (e) => {
                    const router = new ethers.Contract(e.address, e.router.abi, provider)
                    try {
                        const amount = await router.getAmountsOut(amount_in, path)

                        return Number(amount[1])
                    } catch (err) {
                        return 0
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

    async function getPriceIn(_amountOut) {
        setAmountOut(Number(_amountOut))
        if (Number(_amountOut) !== 0) {
            const decimals = tokens[currentNet][trade.toToken]["decimals"]
            const _tokenIn = tokens[currentNet][trade.fromToken]["address"]
            const _tokenOut = tokens[currentNet][trade.toToken]["address"]
            let path = [_tokenIn, _tokenOut]

            let amount_out = utils.parseEther(_amountOut.toString(), "ether")
            const prices = await Promise.all(
                exchanges[currentNet]["Dexes"].map(async (e) => {
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

    async function swap() {
        try {
            setIsSwapping(true)
            const _tokenIn = tokens[currentNet][trade.fromToken]["address"]
            const _tokenOut = tokens[currentNet][trade.toToken]["address"]
            let path = [_tokenIn, _tokenOut]

            const _amountOutMin = Number(amountOut) * 0.95

            const amountOutMin = utils.parseEther(_amountOutMin.toString(), "ether")

            const signer = provider.getSigner()

            const erc20Contract = new ethers.Contract(_tokenIn, ERC20.abi, signer);

            const router = new ethers.Contract(bestExchange["address"], IRouter.abi, signer)

            const amount_in = utils.parseEther(amountIn.toString(), "ether")

            const approve_tx = await erc20Contract.approve(bestExchange["address"], amount_in)

            await approve_tx.wait()

            let timestamp = Math.floor(new Date().getTime() / 1000.0) + 15

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
        } catch (err) {
            setIsSwapping(false)
            window.alert("An error has occured")
        }
    }

    async function getGasPrice(tokenIn, tokenOut, amount) {
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
        console.log(Number(_gasPrice))
        setGasPrice(swapPriceJSON.estimatedGas)
    }

    async function getErc20Balance() {
        const signer = provider.getSigner()

        const decimals = tokens[currentNet][trade.fromToken]["decimals"]
        const _tokenIn = tokens[currentNet][trade.fromToken]["address"]

        const erc20Contract = new ethers.Contract(_tokenIn, ERC20.abi, signer);
        const balance = (await erc20Contract.balanceOf(data.account)).toString();

        setTokenInBalance(Number(balance) / 10 ** decimals)
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
        getErc20Balance()
    }, [trade.fromToken, data.network])

    return (
        data.network !== "" ? (
            <div className="header" >
                <div className="header-container">
                    <div className="header-box">
                        <div id="window">
                            <h4>Swap</h4>
                            <div id="form">
                                <div class="swapbox">
                                    <div class="swapbox_select token_select" id="from_token_select" onClick={() => { handleShow("from") }}>
                                        {trade.fromToken !== "" ? (
                                            <>
                                                <img className="token_img"
                                                    src={tokens[currentNet][trade.fromToken].image}
                                                />
                                                <span className='token_text'>
                                                    {tokens[currentNet][trade.fromToken].name}
                                                </span>
                                            </>
                                        ) : "Select A Token"}
                                    </div>
                                    <div class="swapbox_select">
                                        <input class="number form-control"
                                            type="number"
                                            value={amountIn !== 0 ? amountIn : ""}
                                            placeholder='Enter Amount'
                                            onChange={(e) => { getPriceOut(e.target.value) }} />
                                    </div>
                                </div>
                                <div class="swapbox">
                                    <div class="swapbox_select token_select" id="from_token_select" onClick={() => { handleShow("to") }}>
                                        {trade.toToken !== "" ? (
                                            <>
                                                <img className="token_img"
                                                    src={tokens[currentNet][trade.toToken].image}
                                                />
                                                <span className='token_text'>
                                                    {tokens[currentNet][trade.toToken].name}
                                                </span>
                                            </>
                                        ) : "Select A Token"}
                                    </div>
                                    <div class="swapbox_select">
                                        <input class="number form-control"
                                            type="number"
                                            value={amountOut !== 0 ? amountOut : ""}
                                            placeholder={'Enter Amount'}
                                            onChange={(e) => { getPriceIn(e.target.value) }} />
                                    </div>
                                </div>
                                <div class="gas_estimate_label">Estimated Gas: <span id="gas_estimate">{gasPrice}</span></div>
                                <div class="gas_estimate_label">Your {tokens[currentNet][trade.fromToken].name} Balance: <span id="gas_estimate">{tokenInBalance}</span></div>
                                <button class="btn btn-primary" style={{ width: "100%" }} onClick={swap}>Swap</button>
                            </div>
                        </div>
                    </div>
                    <Modal show={show} onHide={handleClose} style={{ overflow: 'scroll' }}>
                        <Modal.Header closeButton>
                            <Modal.Title>SELECT A TOKEN</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {tokens[currentNet].map((token, index) => {
                                return (
                                    <div className="token_row" key={index} onClick={() => { selectToken(index) }} >
                                        <img class="token_img" src={token.image} />
                                        <span class="token_text">{token.name}</span>
                                    </div>
                                )
                            })}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="contained" >
                                Disconnect
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

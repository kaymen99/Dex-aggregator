import React, { useEffect } from 'react'
import { useSelector } from "react-redux"
import {
    Box,
    Button,
    Container,
    FormControl,
    Select,
    MenuItem,
    Avatar,
    Input,
    ListItemText,
    ListItemAvatar
} from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import { ethers, utils } from 'ethers';

import { tokens, exchanges, exchangesMap } from "../utils/helpers";
import IRouter from "../artifacts/interfaces/IUniswapV2Router02.json";
import ERC20 from "../artifacts/interfaces/IERC20.json";
import Exchanges from './Exchanges';

const provider = new ethers.providers.Web3Provider(window.ethereum, "any");


function Swap() {
    const data = useSelector((state) => state.blockchain.value)
    const [tokenIn, setTokenIn] = React.useState("ETH");
    const [tokenOut, setTokenOut] = React.useState("DAI");
    const [amountIn, setAmountIn] = React.useState(null);
    const [amountOut, setAmountOut] = React.useState(null);
    const [tokenInBalance, setTokenInBalance] = React.useState(null);

    const [bestExchange, setBestExchange] = React.useState(null);

    const [isSwapping, setIsSwapping] = React.useState(false)

    async function getPriceOut(_amountIn) {

        setAmountIn(Number(_amountIn))
        if (Number(_amountIn) !== 0) {
            const decimals = tokens[currentNet]["tokensAddress"][tokenOut]["decimals"]
            const _tokenIn = tokens[currentNet]["tokensAddress"][tokenIn]["address"]
            const _tokenOut = tokens[currentNet]["tokensAddress"][tokenOut]["address"]
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
            setBestExchange(exchangesMap[currentNet][maxPriceIndex])
        } else {
            setAmountOut("0")
        }
    }

    async function getPriceIn(_amountOut) {
        setAmountOut(Number(_amountOut))
        if (Number(_amountOut) !== 0) {
            const decimals = tokens[currentNet]["tokensAddress"][tokenOut]["decimals"]
            const _tokenIn = tokens[currentNet]["tokensAddress"][tokenIn]["address"]
            const _tokenOut = tokens[currentNet]["tokensAddress"][tokenOut]["address"]
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
            setBestExchange(exchangesMap[currentNet][minPriceIndex])

            console.log(exchangesMap[currentNet][minPriceIndex])
        } else {
            setAmountIn("0")
        }
    }

    async function swap() {
        try {
            setIsSwapping(true)
            const decimals = tokens[currentNet]["tokensAddress"][tokenOut]["decimals"]
            const _tokenIn = tokens[currentNet]["tokensAddress"][tokenIn]["address"]
            const _tokenOut = tokens[currentNet]["tokensAddress"][tokenOut]["address"]
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

    async function getErc20Balance() {
        const signer = provider.getSigner()

        const decimals = tokens[currentNet]["tokensAddress"][tokenIn]["decimals"]
        const _tokenIn = tokens[currentNet]["tokensAddress"][tokenIn]["address"]

        const erc20Contract = new ethers.Contract(_tokenIn, ERC20.abi, signer);
        const balance = (await erc20Contract.balanceOf(data.account)).toString();

        setTokenInBalance(Number(balance) / 10 ** decimals)
    }

    const currentNet = data.network !== "" ? data.network : "Ethereum Mainnet"

    useEffect(() => {
        getErc20Balance()
    }, [tokenIn])

    return (
        data.network !== "" ? (
            <div className='row p-2'>
                <div className='col-md-7 text-center p-3'>
                    <div className='p-3'>
                        <Container>
                            <Box
                                p={2}
                                mt="10px"
                                sx={{
                                    width: 500,
                                    height: 400,
                                    backgroundColor: 'white'
                                }}>
                                <FormControl style={{ alignItems: "left", paddingBottom: "10px" }}>
                                    <Select
                                        value={tokenIn}
                                        onChange={(e) => { setTokenIn(e.target.value) }}
                                        style={{ width: "200px" }}
                                    >
                                        {tokens[currentNet]["tokens"].map((token, index) => {
                                            return (
                                                <MenuItem value={token.name}>
                                                    <ListItemAvatar>
                                                        <Avatar src={token.image} />
                                                    </ListItemAvatar>
                                                    <ListItemText>{token.name}</ListItemText>
                                                </MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                                <br />
                                <FormControl style={{ width: "300px", paddingBottom: "10px" }}>
                                    <Input
                                        value={amountIn !== 0 ? amountIn : null}
                                        type='number'
                                        placeholder='Enter Amount'
                                        onChange={(e) => { getPriceOut(e.target.value) }} />
                                </FormControl>
                                <br />
                                <FormControl style={{ paddingBottom: "10px" }}>
                                    <Select
                                        value={tokenOut}
                                        placeholder='ETH'
                                        onChange={(e) => { setTokenOut(e.target.value) }}
                                        style={{ width: "200px" }}
                                    >
                                        {tokens[currentNet]["tokens"].map((token, index) => {
                                            return (
                                                <MenuItem value={token.name}>
                                                    <Avatar src={token.image} />
                                                    <div style={{ paddingLeft: "5px" }}>
                                                        {token.name}
                                                    </div>
                                                </MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                                <br />
                                <FormControl style={{ width: "300px", paddingBottom: "10px" }}>
                                    <Input
                                        type='number'
                                        value={amountOut !== 0 ? amountOut : null}
                                        placeholder={'Enter Amount'}
                                        onChange={(e) => { getPriceIn(e.target.value) }} />
                                </FormControl>
                                <br />
                                <br />

                                {tokenInBalance !== null ? (
                                    <div>
                                        Your {tokenIn} balance:
                                        <b>{"  " + tokenInBalance + " " + tokenIn}</b>
                                    </div>
                                ) : null}
                                <br />

                                {bestExchange !== null ? (
                                    <div>
                                        Best rate on:
                                        <b>{"  " + bestExchange.name}</b>
                                    </div>
                                ) : null}

                                <br />
                                <Button variant='contained' onClick={swap} >
                                    {isSwapping ? <CircularProgress color="inherit" /> : "Swap"}
                                </Button>
                            </Box>
                        </Container>
                    </div>

                </div>
                <div className='col-md-5 text-center p-5'>
                    <h3 className='text-center p-2'>Exchanges</h3>
                    <Exchanges token0={tokenIn} token1={tokenOut} />
                </div>
            </div>
        ) : null
    )
}

export default Swap
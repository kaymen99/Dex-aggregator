import React, { useEffect, useState } from 'react'
import { ethers, utils } from 'ethers';
import { Table } from "@mui/material"
import { useSelector } from "react-redux";
import { tokens, exchanges } from "../utils/helpers";

function Exchanges(props) {

    const data = useSelector((state) => state.blockchain.value)
    const [amounts, setAmounts] = useState([])

    const currentNet = data.network !== "" ? data.network : "Ethereum Mainnet"

    async function getPrices() {
        if (window.ethereum !== undefined) {
            const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

            const _tokenIn = tokens[currentNet][props.token0]["address"]
            const _tokenOut = tokens[currentNet][props.token1]["address"]
            let path = [_tokenIn, _tokenOut]

            const decimals = tokens[currentNet][props.token1]["decimals"]

            let amountIn = utils.parseEther("1", "ether")

            const items = await Promise.all(
                exchanges[currentNet].map(async (e) => {
                    if (e.name !== "Uniswap V3") {
                        const router = new ethers.Contract(e.address, e.router.abi, provider)
                        try {
                            const amount = await router.getAmountsOut(amountIn, path)

                            let item = {
                                exchange: e.name,
                                price: amount[1] / 10 ** decimals
                            }
                            return item
                        } catch (err) {
                            let item = {
                                exchange: e.name,
                                price: 0
                            }
                            return item
                        }
                    } else {
                        const quoter = new ethers.Contract(e.address, e.quoter.abi, provider)
                        try {
                            const amount = await quoter.callStatic.quoteExactInputSingle(
                                _tokenIn,
                                _tokenOut,
                                3000,
                                amountIn,
                                0
                            )

                            let item = {
                                exchange: e.name,
                                price: amount / 10 ** decimals
                            }
                            return item
                        } catch (err) {
                            let item = {
                                exchange: e.name,
                                price: 0
                            }
                            return item
                        }
                    }
                }))
            setAmounts(items)
        }
    }

    /*
    setInterval(() => {
        getPrices()
    }, 30000);
    */

    useEffect(() => {
        if (window.ethereum != undefined && data.network !== "") {
            getPrices()
        }

    }, [props.token0, props.token1, data.network])

    return (
        <>
            <Table >
                <thead>
                    <tr>
                        <th>Exchange</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {amounts.map((a, index) => {
                        return (
                            <tr key={index}>
                                <td>
                                    {a.exchange}
                                </td>
                                <td>
                                    {a.price !== 0 ? parseFloat(a.price).toFixed(8) : "/"}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </>
    )
}

export default Exchanges;

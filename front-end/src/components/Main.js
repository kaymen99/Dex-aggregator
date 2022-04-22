import React from 'react'
import { useSelector } from "react-redux"
import NavBar from "./NavBar"
import { NoteNav, Note } from "./NavbarElements"

function Main() {
    const data = useSelector((state) => state.blockchain.value)

    const isConnected = data.account !== ""

    return (
        <>
            <NavBar />
            <NoteNav>
                <Note >
                    {isConnected ? (
                        <p>
                            Note: You are currently connected to the {data.network} network
                        </p>
                    ) : (
                        <p>Please connect your wallet</p>
                    )}
                </Note>
            </NoteNav>

        </>
    )
}

export default Main
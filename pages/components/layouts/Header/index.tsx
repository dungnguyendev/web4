import { ConnectWallet } from '@thirdweb-dev/react'
import React from 'react'
import Logo from '../../customs/Logo'

export default function Header() {
    return (
        <header className='backdrop-blur-[2rem] fixed w-full top-0 z-50 p-3 flex justify-between'>
            <Logo />
            <ConnectWallet
                dropdownPosition={{
                    side: "bottom",
                    align: "center",
                }}
            />
        </header>
    )
}

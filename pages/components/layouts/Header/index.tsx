import { ConnectWallet } from '@thirdweb-dev/react'
import React from 'react'
import Logo from '../../customs/Logo'

export default function Header() {
    return (
        <header className='bg-white sticky top-0 z-50 p-3 flex justify-between border-b border-[#d6d6d6]'>
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

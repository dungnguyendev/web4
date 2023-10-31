import React from 'react'
import Header from '../Header'
import Navigation from '../../Navigation'

type DefaultLayoutProps = {
    children: React.ReactNode
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
    return (
        <div className='bg-[#1a1a1a] min-h-screen'>
            <Header />
            <main className='mb-14'>
                {children}
            </main>
            <Navigation />
        </div>
    )
}

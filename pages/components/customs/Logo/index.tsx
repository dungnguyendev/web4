import Link from 'next/link'
import React from 'react'

type LogoProps = {
    className?: string
}

export default function Logo({ className }: LogoProps) {
    return (
        <Link href={'/'} className={`flex justify-center items-center uppercase font-bold text-2xl text-[#ffffff] ${className}`}>Nev</Link>
    )
}

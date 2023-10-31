import Image from 'next/image';
import React from 'react'

type ItemProps = {
    className?: string;
    image: string;
    title: string;
    description: string;
    onClick?: () => void;
}

export default function Item({ className, onClick, image, title, description }: ItemProps) {
    return (
        <div className={`p-4 rounded-lg bg-[#ffffff1a] border border-[#464646] shadow-sm ${className}`}>
            <div className='h-[300px] rounded-lg overflow-hidden'>
                <Image src={image ? image : 'https://i.pinimg.com/564x/cc/c9/df/ccc9df4d1bd3a6598d6f331ec8f8684f.jpg'} width={500} height={500} alt='' className='w-ful h-full object-cover' />
            </div>
            <div className='py-3 flex flex-col gap-2'>
                <h1 className='text-white font-semibold text-2xl'>{title}</h1>
                <p className='line-clamp-2 text-[#636363]  text-sm'>{description}</p>
            </div>
            <button className='text-sm mt-2 duration-150 active:scale-90 py-2 font-semibold w-full rounded-lg bg-[#271b70] text-white'
                onClick={onClick}
            >
                Xem dự án
            </button>
        </div>
    )
}

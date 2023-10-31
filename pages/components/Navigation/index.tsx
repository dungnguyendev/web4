import IonIcon from '@reacticons/ionicons'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const dataNavlink = [
    {
        name: 'Home',
        icon: <IonIcon name='home' />,
        path: '/'
    },
    {
        name: 'Add',
        icon: <IonIcon name='add' />,
        path: '/add'
    },
    {
        name: 'Profile',
        icon: <IonIcon name='person' />,
        path: '/profile'
    },
    {
        name: 'Setting',
        icon: <IonIcon name='settings' />,
        path: '/setting'
    }
]

export default function Navigation() {

    const router = usePathname()

    return (
        <div className='bottom-0 left-0 fixed z-50 w-full flex items-center justify-around backdrop-blur-[2rem] border-t border-[#5f5f5f] p-3'>
            {
                dataNavlink.map((item, i) => {
                    return (
                        <Link href={item.path} key={i} className='flex justify-center items-center'>
                            <span className={`translate-y-1 duration-150 ${router === item.path ? 'text-[#5543c4] text-2xl' : 'text-2xl'}`}>{item.icon}</span>
                        </Link>
                    )
                })
            }
        </div>
    )
}

import React, { useState } from 'react'
import DefaultLayout from './components/layouts/DefaultLayout'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Web3Button, useAddress } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

export default function AddPage() {
    const address = useAddress();
    const contractAddress = "0xC74E4380380235380f218f8783e27F5aA0A5428f";


    const [isValueTitle, setIsValueTitle] = useState<string>('');
    const [isDescription, setIsDescription] = useState<string>('');
    const [isImage, setIsImage] = useState<string>('');
    const [isTarget, setIsTarget] = useState<string>('');
    const [isStartTime, setIsStartTime] = useState<any>();
    const [isDeadline, setIsDeadline] = useState<any>();

    return (
        <DefaultLayout>
            <motion.main className="min-h-screen bg-[#030014] text-white">
                <div className='flex flex-col items-center'>
                    <div className='h-[300px]'>
                        <Image src={'https://reflect.app/home/build/q-6c12dbae.png'} width={500} height={500} alt="" className='w-full h-full object-cover' />
                    </div>
                    <h1 className='uppercase font-bold text-2xl translate-y-[-50%]'>Tạo dự án  </h1>
                    {
                        address ? (
                            <div className='mt-4 w-full flex flex-col gap-3 items-start px-3'>
                                <div className='flex flex-col w-full gap-2'>
                                    <label htmlFor="title" className='font-semibold text-sm text-[#c0c0c0]'>Title</label>
                                    <input type="text" id='title' placeholder='...' className='py-2 text-[#c0c0c0] outline-none rounded-lg text-sm px-4 border border-[#666464] bg-[#ffffff1e]' value={isValueTitle} onChange={(e) => setIsValueTitle(e.target.value)} />
                                </div>
                                <div className='flex flex-col w-full gap-2'>
                                    <label htmlFor="image" className='font-semibold text-sm text-[#c0c0c0]'>Image</label>
                                    <input type="text" id='image' placeholder='...' className='py-2 text-[#c0c0c0] outline-none rounded-lg text-sm px-4 border border-[#666464] bg-[#ffffff1e]' value={isImage} onChange={(e) => setIsImage(e.target.value)} />
                                </div>
                                <div className='flex flex-col w-full gap-2'>
                                    <label htmlFor="target" className='font-semibold text-sm text-[#c0c0c0]'>Target</label>
                                    <input type="text" id='target' placeholder='...' className='py-2 text-[#c0c0c0] outline-none rounded-lg text-sm px-4 border border-[#666464] bg-[#ffffff1e]' value={isTarget} onChange={(e) => setIsTarget(e.target.value)} />
                                </div>
                                <div className='flex flex-col w-full gap-2'>
                                    <label htmlFor="startTime" className='font-semibold text-sm text-[#c0c0c0]'>Start Time</label>
                                    <input type="date" id='startTime' placeholder='...' className='py-2 text-[#c0c0c0] outline-none rounded-lg text-sm px-4 border border-[#666464] bg-[#ffffff1e]' value={isStartTime} onChange={(e) => setIsStartTime(e.target.value)} />
                                </div>
                                <div className='flex flex-col w-full gap-2'>
                                    <label htmlFor="deadline" className='font-semibold text-sm text-[#c0c0c0]'>Deadline</label>
                                    <input type="date" id='deadline' placeholder='...' className='py-2 text-[#c0c0c0] outline-none rounded-lg text-sm px-4 border border-[#666464] bg-[#ffffff1e]' value={isDeadline} onChange={(e) => setIsDeadline(e.target.value)} />
                                </div>
                                <div className='flex flex-col w-full gap-2'>
                                    <label htmlFor="description" className='font-semibold text-sm text-[#c0c0c0]'>Description</label>
                                    <textarea id='description' placeholder='...' className='py-2 text-[#c0c0c0] outline-none rounded-lg text-sm px-4 border border-[#666464] bg-[#ffffff1e]' value={isDescription} onChange={(e) => setIsDescription(e.target.value)} />
                                </div>
                                <div className='mb-2'>
                                    <Web3Button
                                        contractAddress={contractAddress}
                                        action={(contract) => {
                                            if (!isValueTitle || !isDescription || !isTarget || !isStartTime || !isDeadline) {
                                                alert('Vui lòng nhập đủ thông tin');
                                                return;
                                            } else {
                                                console.log(address, isValueTitle, isDescription, ethers.utils.parseUnits(isTarget, 18), new Date(isStartTime).getTime(), new Date(isDeadline).getTime(), isImage);

                                                contract.call("createCampaign", [address, isValueTitle, isDescription, ethers.utils.parseUnits(isTarget, 18), new Date(isStartTime).getTime(), new Date(isDeadline).getTime(), isImage])
                                            }
                                        }}
                                        onSuccess={() => {
                                            setIsValueTitle('');
                                            setIsDescription('');
                                            setIsImage('');
                                            setIsTarget('');
                                            setIsStartTime(0);
                                            setIsDeadline(0);
                                        }}
                                    >
                                        <span className="text-[0.85rem]">{" Buy a Art 0.01ETH"}</span>
                                    </Web3Button>
                                </div>
                            </div>
                        ) : (
                            <div className='mt-4 w-4/5 flex justify-center'>
                                <span className='p-2 rounded-lg w-full font-semibold text-[#7764f1] text-center border border-[#666464] bg-[#ffffff1e]'>
                                    Vui lòng kết nối ví
                                </span>
                            </div>
                        )
                    }
                </div>
            </motion.main>
        </DefaultLayout>
    )
}

'use client'

import IonIcon from "@reacticons/ionicons";
import {
  Web3Button,
  useAddress,
  useContract,
  useContractRead
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { motion } from 'framer-motion';
import { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import Item from "./components/customs/Item";
import DefaultLayout from "./components/layouts/DefaultLayout";
import moment from 'moment';

const Home: NextPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isDetail, setIsDetail] = useState<any | null>(null);
  const [isDonate, setIsDonate] = useState<boolean>(false);

  const [isValueDonate, setIsValueDonate] = useState('');
  const [isChoose, setIsChoose] = useState<number>(0);

  const address = useAddress();
  const contractAddress = "0xC74E4380380235380f218f8783e27F5aA0A5428f";

  const { contract } = useContract(contractAddress);

  const { data: getProjects, isLoading: loadingGetProjects } = useContractRead(
    contract,
    "getCampaigns"
  );

  const handleCheckMobile = () => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    handleCheckMobile();
    window.addEventListener("resize", handleCheckMobile);
    return () => {
      window.removeEventListener("resize", handleCheckMobile);
    };
  }, []);

  if (!isMobile) {
    return <div className="">Chúng tôi không hỗ trợ màn hình này</div>;
  }

  console.log(isDetail);



  return (
    <DefaultLayout>
      <motion.main className="min-h-screen bg-[#030014]"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut", bounce: 0.5 }}
      >
        <div className="p-3 flex flex-col gap-3">
          <div className="relative m-auto">
            <Image src={`https://reflect.app/home/build/q-44e26a19.png`} width={500} height={500} alt="" />
            <h1 className="absolute left-1/2 translate-x-[-50%] -translate-y-[50%] bottom-6 uppercase text-white font-bold text-3xl tracking-wider">Ethe<span className="text-[#5642d1]">reum</span> </h1>
          </div>
          <div className="flex flex-col gap-3">
            {loadingGetProjects
              ? [1, 2, 3].map((_, index) => {
                return (
                  <div key={index} className="w-full animate-pulse bg-[#271b70] rounded-lg shadow-md p-4">
                    <div className="h-[300px] bg-[#342592] w-full rounded-lg"></div>
                    <div className="w-full mt-4 flex flex-col gap-2">
                      <span className="w-[90%] p-2 rounded-full bg-[#342592]"></span>
                      <span className="w-[90%] p-2 rounded-full bg-[#342592]"></span>
                      <span className="w-[90%] p-2 rounded-full bg-[#342592]"></span>
                    </div>
                  </div>
                )
              })
              : getProjects.map((item: any, i: number) => {
                if (i < 1) return null;
                return (
                  <Item key={i} image={item[9]} onClick={() => {
                    setIsDetail(item)
                    setIsChoose(i)
                  }} title={item[1]} description={item.description} />
                );
              })}
          </div>
        </div>
        {
          isDetail !== null && (
            <motion.div className="fixed top-0 left-0 bottom-0 overflow-y-scroll right-0 pb-16 bg-[#030014]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut", bounce: 0.5 }}
            >
              <div className="mt-[4.8rem]">
                <div className="h-[300] relative overflow-hidden rounded-lg  px-3">
                  <button
                    className=" text-black absolute top-2 right-4"
                    onClick={() => setIsDetail(null)}
                  >
                    <IonIcon name="close" className="text-3xl text-[#ffffff]" />
                  </button>
                  <Image src={isDetail[9]} width={500} height={500} alt='' className='w-full h-full border-2 border-[#342592] rounded-lg object-cover' />
                </div>
                <div className='p-3 flex  mt-3 flex-col gap-2'>
                  <div>
                    <h1 className='text-[#ffffff]  font-semibold text-2xl'>{isDetail[1]}</h1>
                    <span className="text-sm text-[#aaaaaa] ">{isDetail[0]}</span>
                    <div className="text-sm text-red-500 mt-2">
                      <span>{moment(isDetail[4].toNumber()).subtract(10, "days").calendar()}</span> - <span>{moment(isDetail[5].toNumber()).subtract(10, "days").calendar()}</span>
                    </div>
                  </div>
                  <p className=' text-[#aaaaaa] mt-2 text-sm line-clamp-3'>{isDetail.description}</p>
                  <div>
                    <span className="font-sm font-semibold">Pool: {ethers.utils.formatEther(String(isDetail[6]._hex))}/{ethers.utils.formatEther(String(isDetail[3]._hex))} ETH</span>
                  </div>
                  {
                    address ? (
                      <button className={`text-sm mt-2 duration-150 active:scale-90 py-2 font-semibold w-full rounded-lg  text-white ${isDonate ? 'bg-red-500' : 'bg-blue-700'}`}
                        onClick={() => setIsDonate(!isDonate)}
                      >
                        {isDonate ? 'Canncel' : 'Donate'}
                      </button>
                    ) : (
                      <div className='mt-4 w-full flex justify-center'>
                        <span className='p-2 rounded-lg w-full font-semibold text-[#7764f1] text-center border border-[#666464] bg-[#ffffff1e]'>
                          Vui lòng kết nối ví
                        </span>
                      </div>
                    )
                  }
                  {isDonate && (
                    <div className="mt-2 flex flex-col gap-4">
                      <input type="text" className="w-full bg-[#e0e0e0] placeholder:text-gray-500 outline-none rounded-lg py-2 px-4" placeholder="Số tiền donate" value={isValueDonate} onChange={(e) => setIsValueDonate(e.target.value)} />
                      {
                        address ? (
                          <Web3Button
                            contractAddress={contractAddress}
                            action={(contract) => {
                              if (Number(isValueDonate) < 0.01) {
                                alert("Số tiền donate phải lớn hơn 0.01ETH");
                              } else {
                                contract.call("donateToCampaign", [isChoose], { value: ethers.utils.parseUnits(isValueDonate, 18) })
                              }
                            }
                            }
                            onSuccess={() => {
                              setIsDonate(false);
                              setIsValueDonate('');
                            }}
                          >
                            <span className="text-[0.85rem]">{"Donate to project"}</span>
                          </Web3Button>
                        ) : (
                          <span className="p-2 rounded-lg text-center text-white bg-red-500">Vui lòng kết nối ví</span>
                        )
                      }
                    </div>
                  )}
                </div>
              </div>


            </motion.div>
          )
        }
      </motion.main >
    </DefaultLayout>
  );
};

export default Home;


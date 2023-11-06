'use client'

import IonIcon from "@reacticons/ionicons";
import {
    Web3Button,
    useAddress,
    useContract,
    useContractRead
} from "@thirdweb-dev/react";
import {BigNumber, ethers} from "ethers";
import {motion} from 'framer-motion';
import {NextPage} from "next";
import Image from "next/image";
import {useEffect, useState} from "react";
import Item from "./components/customs/Item";
import DefaultLayout from "./components/layouts/DefaultLayout";
import moment from 'moment';
import Detail from "./components/customs/Detail";

const Home: NextPage = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isDetail, setIsDetail] = useState<any | null>(null);
    const [isDonate, setIsDonate] = useState<boolean>(false);

    const [isValueDonate, setIsValueDonate] = useState('');
    const [isChoose, setIsChoose] = useState<number>(0);

    const address = useAddress();
    const contractAddress = "0xBC11305239835f7820d39745fB27D60276B72564";

    const {contract} = useContract(contractAddress);

    const {data: getProjects, isLoading: loadingGetProjects} = useContractRead(
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

    console.log(getProjects);


    return (
        <DefaultLayout>
            <motion.main
                className="min-h-screen bg-[#030014]"
                initial={{opacity: 0, scale: 0.9}}
                animate={{opacity: 1, scale: 1}}
                transition={{duration: 0.5, ease: "easeInOut", bounce: 0.5}}
            >
                <div className="p-3 flex flex-col gap-3">
                    <div className="relative m-auto">
                        <Image
                            src={`https://reflect.app/home/build/q-44e26a19.png`}
                            width={500}
                            height={500}
                            alt=""
                        />
                        <h1 className="absolute left-1/2 translate-x-[-50%] -translate-y-[50%] bottom-6 uppercase text-white font-bold text-3xl tracking-wider">Ethe<span className="text-[#5642d1]">reum</span>
                        </h1>
                    </div>
                    <div className="flex flex-col gap-3">
                        {loadingGetProjects
                            ? [1, 2, 3].map((_, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="w-full animate-pulse bg-[#271b70] rounded-lg shadow-md p-4"
                                    >
                                        <div className="h-[300px] bg-[#342592] w-full rounded-lg"></div>
                                        <div className="w-full mt-4 flex flex-col gap-2">
                                            <span className="w-[90%] p-2 rounded-full bg-[#342592]"></span>
                                            <span className="w-[90%] p-2 rounded-full bg-[#342592]"></span>
                                            <span className="w-[90%] p-2 rounded-full bg-[#342592]"></span>
                                        </div>
                                    </div>
                                )
                            })
                            : getProjects?.map((item: any, i: number) => {
                                return (
                                    <Item
                                        key={i}
                                        image={item[6]}
                                        onClick={() => {
                                            setIsDetail(item)
                                            setIsChoose(i)
                                        }}
                                        title={item[1]}
                                        description={item.description}
                                    />
                                );
                            })}
                    </div>
                </div>
                {
                    isDetail !== null && <Detail
                        isChoose={isChoose}
                        setIsValueDonate={setIsValueDonate}
                        isDetail={isDetail}
                        setIsDetail={setIsDetail}
                        isDonate={isDonate}
                        isValueDonate={isValueDonate}
                        setIsDonate={setIsDonate}
                    />
                }
            </motion.main>
        </DefaultLayout>
    );
};

export default Home;


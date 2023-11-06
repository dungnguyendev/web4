import React from "react";
import IonIcon from "@reacticons/ionicons";
import Image from "next/image";
import moment from "moment/moment";
import {BigNumber, ethers} from "ethers";
import {useAddress, useContract, useContractRead, Web3Button} from "@thirdweb-dev/react";
import {motion} from "framer-motion";

const Detail = (props: any) => {
    const {
        isDetail,
        setIsDetail,
        isDonate,
        isValueDonate,
        setIsDonate,
        setIsValueDonate,
        isChoose,
    } = props;

    const address = useAddress();
    const contractAddress = "0xBC11305239835f7820d39745fB27D60276B72564";
    const {contract} = useContract(contractAddress);

    const startTime = isDetail[4]
    const deadline = isDetail[5]

    const daysLeft = (deadline: any) => {
        return Math.round(moment.duration(deadline).subtract(moment.duration(Date.now())).asDays())
    }


    const {
        data: hasDonated,
        isLoading
    } = useContractRead(contract, "hasDonated", [isChoose, address])

    return (
        <motion.div
            className="fixed top-0 left-0 bottom-0 overflow-y-scroll right-0 pb-16 bg-[#030014]"
            initial={{opacity: 0, scale: 0.9}}
            animate={{opacity: 1, scale: 1}}
            transition={{duration: 0.5, ease: "easeInOut", bounce: 0.5}}
        >
            <div className="mt-[4.8rem]">
                <div className="h-[300] relative overflow-hidden rounded-lg  px-3">
                    <button
                        className=" text-black absolute top-2 right-4"
                        onClick={() => setIsDetail(null)}
                    >
                        <IonIcon
                            name="close"
                            className="text-3xl text-[#ffffff]"
                        />
                    </button>
                    <Image
                        src={isDetail[6]}
                        width={500}
                        height={500}
                        alt=""
                        className="w-full h-full border-2 border-[#342592] rounded-lg object-cover"
                    />
                </div>
                <div className="p-3 flex  mt-3 flex-col gap-2">
                    <div>
                        <span className="text-xs">
                            {hasDonated ? (
                                <span className="text-green-500">Bạn đã tham gia vào dự án này</span>) : (<span className="text-yellow-500">Bạn chưa tham gia vào dự án này</span>)}
                        </span>
                        <h1 className="text-[#ffffff]  font-semibold text-2xl">
                            {isDetail[1]}
                        </h1>
                        <span className="text-sm text-[#aaaaaa] ">{isDetail[0]}</span>
                        <div className="text-sm text-red-500 mt-2">
                             <span>
                            {moment(startTime.toNumber()).locale('vi').format('DD/MM/YYYY')}
                          </span> - <span>
                            {moment(deadline.toNumber()).locale('vi').format('DD/MM/YYYY')}
                          </span>
                        </div>
                        <div className="text-xs text-red-500 mt-2">
                            Còn {daysLeft(deadline)} ngày dự án sẽ kết thúc
                        </div>
                        <div className="text-sm"></div>
                    </div>
                    <p className=" text-[#aaaaaa] mt-2 text-sm line-clamp-3">
                        {isDetail.description}
                    </p>
                    <div>
                        <span className="font-sm font-semibold">
                          Pool: {ethers.utils.formatEther(String(isDetail[7]._hex))}/
                            {ethers.utils.formatEther(String(isDetail[3]._hex))} ETH
                        </span>
                    </div>
                    {address ? (
                        <button
                            className={`text-sm mt-2 duration-150 active:scale-90 py-2 font-semibold w-full rounded-lg  text-white ${
                                isDonate ? "bg-red-500" : "bg-blue-700"
                            }`}
                            onClick={() => setIsDonate(!isDonate)}
                        >
                            {isDonate ? "Canncel" : "Donate"}
                        </button>
                    ) : (
                        <div className="mt-4 w-full flex justify-center">
                              <span className="p-2 rounded-lg w-full font-semibold text-[#7764f1] text-center border border-[#666464] bg-[#ffffff1e]">
                                Vui lòng kết nối ví
                              </span>
                        </div>
                    )}
                    {isDonate && (
                        <div className="mt-2 flex flex-col gap-4">
                            <input
                                type="text"
                                className="w-full bg-[#e0e0e0] placeholder:text-gray-500 outline-none rounded-lg py-2 px-4"
                                placeholder="Số tiền donate"
                                value={isValueDonate}
                                onChange={(e) => setIsValueDonate(e.target.value)}
                            />
                            {address ? (
                                <Web3Button
                                    contractAddress={contractAddress}
                                    action={(contract) => {
                                        if (Number(isValueDonate) < 0.01) {
                                            alert("Số tiền donate phải lớn hơn 0.01ETH");
                                        } else {
                                            contract.call("donateToCampaign", [isChoose], {
                                                value: BigNumber.from(
                                                    ethers.utils.parseEther(isValueDonate).toString(),
                                                ),
                                            });
                                        }
                                    }}
                                    onSuccess={() => {
                                        setIsDonate(false);
                                        setIsValueDonate("");
                                    }}
                                >
                                    <span className="text-[0.85rem]">{"Donate to project"}</span>
                                </Web3Button>
                            ) : (
                                <span className="p-2 rounded-lg text-center text-white bg-red-500">
                  Vui lòng kết nối ví
                </span>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default Detail;

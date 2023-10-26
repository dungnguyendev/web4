import { ConnectWallet, useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import Header from "./components/layouts/Header";

const Home: NextPage = () => {
  const [isMobile, setIsMobile] = useState(false)

  const address = useAddress()
  const contractAddress = '0xC74E4380380235380f218f8783e27F5aA0A5428f'

  const { contract } = useContract(contractAddress);

  const { data: totalArt, isLoading: loadingTotalArts } = useContractRead(contract, 'getCampaigns')
  console.log(totalArt);

  const handleCheckMobile = () => {
    if (window.innerWidth < 768) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }

  useEffect(() => {
    handleCheckMobile()
    window.addEventListener('resize', handleCheckMobile)
    return () => {
      window.removeEventListener('resize', handleCheckMobile)
    }
  }, [])

  if (!isMobile) {
    return (
      <div className="">Chúng tôi không hỗ trợ màn hình này</div>
    )
  }

  return (
    <div className="bg-red-400">
      <Header />
    </div>
  );
};

export default Home;
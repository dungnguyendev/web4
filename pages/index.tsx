import { ConnectWallet, useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import { NextPage } from "next";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [isMobile, setIsMobile] = useState(false)

  const address = useAddress()
  const contractAddress = '0xE7a589c0e601c87391C5ffEE33d74b8Be6D6CEA6'

  const { contract } = useContract(contractAddress);

  const { data: totalArt, isLoading: loadingTotalArts } = useContractRead(contract, 'getCampaigns')

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
    <div>
      <div >
        <ConnectWallet
          dropdownPosition={{
            side: "bottom",
            align: "center",
          }}
        />
        <span className="bg-yellow-300">
          1
          {totalArt?.toString()}
        </span>
      </div>
    </div>
  );
};

export default Home;
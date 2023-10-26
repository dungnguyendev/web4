import {
  ConnectWallet,
  useAddress,
  useContract,
  useContractRead,
} from "@thirdweb-dev/react";
import { NextPage } from "next";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [isMobile, setIsMobile] = useState(false);

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

  return (
    <div>
      <div>
        <ConnectWallet
          dropdownPosition={{
            side: "bottom",
            align: "center",
          }}
        />
        <span className="bg-yellow-300">
          1
          {address ? (
            <div>
              <h1>Tất cả dự án</h1>
              <div>
                {loadingGetProjects
                  ? "Loading"
                  : getProjects.map((item: any, i: number) => {
                    if (i === 0) return null;
                    console.log(item[9]);
                      
                      return (
                        <div key={i}>
                          <img src={item[9]} alt="" />
                        </div>
                      );
                    })}
              </div>
            </div>
          ) : (
            "Vui lòng đăng nhập"
          )}
        </span>
      </div>
    </div>
  );
};

export default Home;

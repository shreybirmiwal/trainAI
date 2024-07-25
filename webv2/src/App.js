import Buy from "./Pages/Buy";
import Earn from "./Pages/Earn";
import MyData from "./Pages/MyData";
import EarnC from "./Pages/EarnC";

import { useAddress } from "@thirdweb-dev/react";
import { ConnectWallet } from "@thirdweb-dev/react";
import { useState } from "react";

export default function Home() {

  const address = useAddress();
  const [navBar, setNavBar] = useState("Earn");

  const handleNavBar = (value) => {
    setNavBar(value);
  }

  return (
    <div className="min-h-screen">
      <div className="p-5 flex flex-row">
        <ConnectWallet />
        {address ? (
          <h1 className="text-2xl font-bold m-4">Address: {address}</h1>
        ) : (
          <h1 className="text-2xl font-bold m-4">Connect Wallet Please</h1>
        )}
      </div>

      <div className="grid grid-cols-3 w-full text-center">

        <div className={`bg-${navBar === "Earn" ? "blue-500" : "gray-200"} hover:bg-gray-300 font-bold py-3`} onClick={() => handleNavBar("Earn")}>
          <h1>Earn</h1>
        </div>

        <div className={`bg-${navBar === "Buy" ? "blue-500" : "gray-200"} hover:bg-gray-300 font-bold py-3`} onClick={() => handleNavBar("Buy")}>
          <h1>Buy</h1>
        </div>
        <div className={`bg-${navBar === "My Data" ? "blue-500" : "gray-200"} hover:bg-gray-300 font-bold py-3`} onClick={() => handleNavBar("My Data")}>
          <h1>My Data</h1>
        </div>

      </div>


      {address && (
        <div className="flex flex-row justify-center mt-5">

          {navBar === "Earn" && <EarnC />}
          {navBar === "Buy" && <Buy />}
          {navBar === "My Data" && <MyData />}

        </div>
      )}

    </div>
  );
}

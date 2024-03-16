import Buy from "./Pages/Buy";
import Earn from "./Pages/Earn";
import { useAddress } from "@thirdweb-dev/react";
import { ConnectWallet } from "@thirdweb-dev/react";

export default function Home() {

  const address = useAddress();

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
      
      {address &&(
        <div className="flex flex-row">

          <div className="w-1/2">
            <Earn/>
          </div>

          <div className="w-1 bg-black"></div> {/* Add this line */}
          
          <div className="w-1/2">
            <Buy />
          </div>

        </div>
      )}
      
    </div>
  );
}

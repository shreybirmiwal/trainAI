import React, { useState } from "react";
import { useContractWrite, useContractRead } from "@thirdweb-dev/react";

function App() {
  const [returnValue, setReturnValue] = useState("");
  const { mutate: callContractFunction } = useContractWrite(
    contract,
    "contractFunction"
  );

  const handleClick = async () => {
    const result = await callContractFunction(parameter);
    setReturnValue(result);
  };

  return (
    <div>
      <button onClick={handleClick}>Call Contract Function</button>
      <p>Return Value: {returnValue}</p>
    </div>
  );
}
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import tempLogo from "./assets/logo.jpg";
import viteLogo from "/vite.svg";
import Box from "@mui/material/Box";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Box>
        <img src={tempLogo} className="logo" alt="Pick Ems logo" />
      </Box>
      <h1>MegaSquad Pick Ems</h1>
      {/* <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div> */}
      <p className="coming-soon">Coming Soon!*</p>
      <p className="for-real">* for real this time</p>
    </>
  );
}

export default App;

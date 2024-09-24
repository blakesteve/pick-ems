import React, { useEffect, useState } from "react";
import tempLogo from "./assets/MegaSquad.png";
import Box from "@mui/material/Box";
import "./App.css";

interface Game {
  id: number;
  name: string;
  genre: string;
  // Add other fields as needed
}

function App() {
  const [games, setGames] = useState<Game[]>([]);
  // State to handle loading or errors
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Define the function to fetch data
    const fetchGames = async () => {
      try {
        const response = await fetch("/games"); // Replace with your actual endpoint
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: Game[] = await response.json(); // Adjust the type as needed
        setGames(data);
        console.log(data); // Log the result to the console
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

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

      <div>
        <h1>Games</h1>
        {error ? (
          <div>Error: {error}</div>
        ) : (
          <ul>
            {games.map((game) => (
              <li key={game.id}>
                {game.name} - {game.genre}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default App;

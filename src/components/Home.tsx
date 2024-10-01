import { useEffect, useState } from "react";
import Games from "./Games";
// import Box from "@mui/material/Box";
import { Box, CircularProgress } from "@mui/material";
import "../App.css";

interface Game {
  away_team_id: string;
  home_team_id: string;
  id: number;
  name: string;
  genre: string;
  venue: {
    name: string;
  };
  // Add other fields as needed
}

function Home() {
  const [games, setGames] = useState<Game[]>([]);
  // State to handle loading or errors
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Define the function to fetch data
    const fetchGames = async () => {
      try {
        const response = await fetch("/games/week/4");
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
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh" // Full viewport height
      >
        <CircularProgress
          size={60} // Adjust size as needed
          sx={{ color: "#5a8d50" }} // Custom color
        />
      </Box>
    );
  }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  return (
    <>
      {/* <Box>
        <img src={tempLogo} className="logo" alt="Pick Ems logo" />
      </Box> */}
      <Box>
        <h1>Games</h1>
        {error ? (
          <div>Error: {error}</div>
        ) : (
          <ul>
            <Games games={games} />
          </ul>
        )}
      </Box>
    </>
  );
}

export default Home;

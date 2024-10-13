import { useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // needs to be updated every new season
  const getCurrentWeek = () => {
    // first relevant day of the season (Thursday, September 5th, 2024)
    const firstDay = new Date(2024, 8, 5);
    const currentDate = new Date();

    // Calculate the number of days difference between the current date and the first day
    let dayDifference = differenceInCalendarDays(currentDate, firstDay);

    // Since weeks start on Tuesday, we need to offset the day difference by 2 days (Thursday -> Tuesday)
    dayDifference -= 2;

    // If the offset leads to a negative number of days, week 1 is still the current week
    if (dayDifference < 0) {
      return 1;
    }

    // Calculate the current week number
    const currentWeek = Math.floor(dayDifference / 7) + 1;

    return currentWeek;
  };

  useEffect(() => {
    const currentWeek = getCurrentWeek();
    const fetchGames = async () => {
      try {
        const response = await fetch(`/games/week/${currentWeek}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: Game[] = await response.json();
        setGames(data);
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

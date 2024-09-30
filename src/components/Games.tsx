import React, { useEffect, useState } from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";

interface Venue {
  name: string;
}

interface Game {
  home_team_id: string;
  away_team_id: string;
  venue: Venue;
}

interface GamesProps {
  games: Game[];
}

const Games: React.FC<GamesProps> = ({ games }) => {
  const [logos, setLogos] = useState<
    { home: string | null; away: string | null }[]
  >([]);

  useEffect(() => {
    const loadLogos = async () => {
      const logosData = await Promise.all(
        games.map(async (game) => ({
          home: game.home_team_id ? await getTeamLogo(game.home_team_id) : null,
          away:
            game.away_team_id || game.venue.name
              ? await getTeamLogo(game.away_team_id || game.venue.name)
              : null,
        }))
      );
      setLogos(logosData);
    };

    loadLogos();
  }, [games]);

  const getTeamLogo = async (teamId: string): Promise<string> => {
    const formattedId = teamId
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join("");

    return import(`../assets/teamLogos/${formattedId}.png`).then(
      (module) => module.default
    );
  };

  return (
    <Grid container justifyContent="center" spacing={2}>
      {logos.map((logo, index) => (
        <Grid item xs={12} key={index}>
          <Card
            sx={{
              maxWidth: "70%",
              padding: 2,
              margin: "20px auto", // Center the card horizontally with margin auto
            }}
          >
            <Grid container justifyContent="center" spacing={2}>
              <Grid item xs={12} sm={6} display="flex" justifyContent="center">
                {logo.home ? (
                  <Card
                    sx={{
                      backgroundColor: "#c1cdcb",
                      width: "40%",
                      margin: "0 5px",
                    }}
                  >
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="140"
                        image={logo.home}
                        alt={games[index].home_team_id}
                        sx={{ objectFit: "contain" }}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {games[index].home_team_id}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                        >
                          More info?
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={6} display="flex" justifyContent="center">
                {logo.away ? (
                  <Card
                    sx={{
                      backgroundColor: "#c1cdcb",
                      width: "40%",
                      margin: "0 5px",
                    }}
                  >
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="140"
                        image={logo.away}
                        alt={
                          games[index].away_team_id || games[index].venue.name
                        }
                        sx={{ objectFit: "contain" }}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {games[index].away_team_id || games[index].venue.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                        >
                          More info?
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                ) : null}
              </Grid>
            </Grid>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Games;

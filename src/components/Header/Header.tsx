import { useState } from "react";
// import { Container, Group } from "@mantine/core";
import Box from "@mui/material/Box";
import MegaSquadSmall from "../../assets/MegaSquadSmall.png";
import classes from "./Header.module.css";

const links = [
  { link: "/", label: "Home" },
  { link: "/scoreboard", label: "Scoreboard" },
  { link: "/profile", label: "Profile" },
  { link: "/auth", label: "Login" },
];

export function Header() {
  const [active, setActive] = useState(links[0].link);

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
      }}
    >
      {link.label}
    </a>
  ));

  return (
    <header className={classes.header}>
      <Box className={classes.inner}>
        <img src={MegaSquadSmall} alt="Logo" />
        <Box className={classes.navigation}>{items}</Box>
      </Box>
    </header>
  );
}

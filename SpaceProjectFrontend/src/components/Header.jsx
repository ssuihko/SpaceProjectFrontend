import classes from "./Header.module.css";
import { AppShell, Group } from "@mantine/core";
import { useLocation } from "react-router-dom";
import { IconPlanet } from "@tabler/icons-react";

const links = [
  { link: "/", label: "Home " },
  { link: "/login", label: "Log In" },
  { link: "/logout", label: "Log Out" },
];

function Header() {
  const { pathname } = useLocation();

  return (
    <AppShell.Header className={classes.header}>
      <div size="md" className={classes.inner}>
        <IconPlanet className={classes.planeticon} size={50} />
        <Group className={classes.linkgroup} gap={30} visibleFrom="xs">
          {links.map((link) => {
            return (
              <a
                key={link.label}
                href={link.link}
                className={classes.link}
                data-active={pathname == link.link || undefined}
              >
                {link.label}
              </a>
            );
          })}
        </Group>
      </div>
    </AppShell.Header>
  );
}

export default Header;

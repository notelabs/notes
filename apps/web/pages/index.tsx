import { Hero, Nav } from "ui";

export default function Web() {
  const links = [
    { name: "Dashboard", href: "/" },
    { name: "Projects", href: "/" },
    { name: "Team", href: "/" }
  ]

  return (
    <div>
      <Nav
        links={links}
      />
      <Hero
        heading="Take notes on the future of notetaking."
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      />
    </div>
  );
}

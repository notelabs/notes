import Head from "next/head";
import { Hero, MarketingNav } from "ui";

export default function Web() {
  const links = [
    { name: "Dashboard", href: "/" },
    { name: "Notes", href: "/" },
    { name: "Team", href: "/" }
  ]

  return (
    <>
      <Head>
        <title>Take notes on the future of notetaking - Notelabs</title>
      </Head>
      <div>
        <MarketingNav
          links={links}
        />
        <Hero
          heading="Take notes on the future of notetaking."
          description="Notelabs makes it easy to to write down your thoughts. Choose your devices, and let Notelabs seamlessly adept to them, letting you get back to your writing."
          mainLink="/app"
        />
      </div>
    </>
  );
}

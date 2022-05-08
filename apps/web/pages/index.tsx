import splitbee from "@splitbee/web";
import Head from "next/head";
import { useEffect } from "react";
import { Hero, MarketingNav } from "ui";
import { appUrl } from "../lib/constants";

export default function Web() {
  const links = [
    { name: "Dashboard", href: "/" },
    { name: "Notes", href: "/" },
    { name: "Team", href: "/" }
  ]

  useEffect(() => {
    splitbee.init({
      scriptUrl: "/bee.js",
      apiUrl: "/_hive",
    })
  }, [])

  return (
    <>
      <Head>
        <title>Take notes on the future of notetaking - Notelabs</title>
        <meta name="description" content="Notelabs makes it easy to to write down your thoughts. Choose your devices, and let Notelabs seamlessly adept to them, letting you get back to your writing." />
        <meta name="keywords" content="Notelabs, notes, thoughts, notetaking" />
        <meta name="twitter:site" content="@trynotelabs" />
        <meta name="twitter:title" content="Take notes on the future of notetaking - Notelabs" />
        <meta name="twitter:description" content="Notelabs makes it easy to to write down your thoughts. Choose your devices, and let Notelabs seamlessly adept to them, letting you get back to your writing." />
        <meta name="twitter:image" content="https://notelabs.me/social.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="og:title" content="Take notes on the future of notetaking - Notelabs" />
        <meta property="og:type" content="website" />
        <meta name="og:description" content="Notelabs makes it easy to to write down your thoughts. Choose your devices, and let Notelabs seamlessly adept to them, letting you get back to your writing." />
        <meta name="og:image" content="https://notelabs.me/social.png" />
      </Head>
      <div>
        <MarketingNav
          links={links}
          appUrl={appUrl}
        />
        <Hero
          heading="Take notes on the future of notetaking."
          description="Notelabs makes it easy to to write down your thoughts. Choose your devices, and let Notelabs seamlessly adept to them, letting you get back to your writing."
          mainLink={appUrl}
        />
      </div>
    </>
  );
}

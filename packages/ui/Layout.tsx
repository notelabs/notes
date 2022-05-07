import { ReactNode } from "react";
import { Sidebar, LinkItemProps } from ".";
import Head from "next/head"
import { FiHome, FiTrendingUp, FiCompass, FiStar, FiSettings } from "react-icons/fi";

type LayoutProps = {
    children: ReactNode
    title?: string
    links?: LinkItemProps[]
    selectedName?: string
}

const DefaultLinkItems: LinkItemProps[] = [
    { name: 'Home', icon: FiHome, href: '/' },
    { name: 'Trending', icon: FiTrendingUp, href: '/' },
    { name: 'Explore', icon: FiCompass, href: '/' },
    { name: 'Favourites', icon: FiStar, href: '/' },
    { name: 'Settings', icon: FiSettings, href: '/' },
];

export function Layout ({ children, title, selectedName }: LayoutProps) {
    title ??= "Notelabs"

    return (
        <>
            <Head>
                <title>{title === "Notelabs" ? title : `${title} - Notelabs`}</title>
            </Head>
            <Sidebar title={title} links={DefaultLinkItems} selectedName={selectedName}>
                {children}
            </Sidebar>
        </>
    )
}
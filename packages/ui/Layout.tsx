import { ReactNode } from "react";
import { Sidebar, LinkItemProps } from ".";
import Head from "next/head"
import { FiHome, FiTrendingUp, FiCompass, FiStar, FiSettings } from "react-icons/fi";

type LayoutProps = {
    children: ReactNode
    title?: string
    links?: LinkItemProps[]
}

const DefaultLinkItems: LinkItemProps[] = [
    { name: 'Home', icon: FiHome, href: '/app' },
    { name: 'Trending', icon: FiTrendingUp, href: '/app' },
    { name: 'Explore', icon: FiCompass, href: '/app' },
    { name: 'Favourites', icon: FiStar, href: '/app' },
    { name: 'Settings', icon: FiSettings, href: '/app' },
];

export function Layout ({ children, title }: LayoutProps) {
    title ??= "Notelabs"

    return (
        <>
            <Head>
                <title>{title === "Notelabs" ? title : `${title} - Notelabs`}</title>
            </Head>
            <Sidebar title={title} links={DefaultLinkItems}>
                {children}
            </Sidebar>
        </>
    )
}
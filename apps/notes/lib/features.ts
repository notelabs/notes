import { HiBeaker, HiLightningBolt, HiKey, HiDeviceMobile, HiDocumentDownload, HiCollection } from "react-icons/hi"

export type FeatureList = {
    icon: typeof HiBeaker
    text: string
}

export const list: FeatureList[] = [
    {
        icon: HiBeaker,
        text: "Beta program"
    },
    {
        icon: HiLightningBolt,
        text: "Fast UI"
    },
    {
        icon: HiKey,
        text: "Secure data"
    },
    {
        icon: HiDeviceMobile,
        text: "Mobile website"
    },
    {
        icon: HiDocumentDownload,
        text: "Own your data"
    },
    {
        icon: HiCollection,
        text: "Draggable"
    }
]
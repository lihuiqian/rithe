import { ReactNode, useEffect } from "react";
import { useRibbonContext } from "./RibbonContext";

export interface RibbonTabProps {
    label: string,
    index: number,
    children?: ReactNode | ReactNode[],
}

export const RibbonTab = (props: RibbonTabProps) => {
    const { label, index, children } = props

    const { registerTab, unregisterTab } = useRibbonContext()
    useEffect(() => {
        registerTab(label, index, children)
        return () => unregisterTab(index)
    }, [children, index, label, registerTab, unregisterTab])
    return null
}
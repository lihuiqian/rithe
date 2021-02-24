import { ReactNode, useEffect } from "react";
import { useRibbonContext } from "./RibbonContext";

export interface RibbonTitleProps {
    children?: ReactNode | ReactNode[],
}

export const RibbonTitle = (props: RibbonTitleProps) => {
    const { children } = props

    const { registerTitle, unregisterTitle } = useRibbonContext()
    useEffect(() => {
        registerTitle(children)
        return () => unregisterTitle()
    }, [children, registerTitle, unregisterTitle])
    return null
}
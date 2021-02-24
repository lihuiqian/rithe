import { ReactNode, useEffect } from "react";
import { useRibbonContext } from "./RibbonContext";

export interface RibbonControlProps {
    children?: ReactNode | ReactNode[],
}

export const RibbonControl = (props: RibbonControlProps) => {
    const { children } = props

    const { registerControl, unregisterControl } = useRibbonContext()
    useEffect(() => {
        registerControl(children)
        return () => unregisterControl()
    }, [children, registerControl, unregisterControl])
    return null
}
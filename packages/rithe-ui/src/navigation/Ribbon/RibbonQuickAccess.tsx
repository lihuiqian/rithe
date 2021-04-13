import { ReactNode, useEffect } from "react";
import { useRibbonContext } from "./RibbonContext";

export interface RibbonQuickAccessProps {
    children?: ReactNode | ReactNode[],
}

export const RibbonQuickAccess = (props: RibbonQuickAccessProps) => {
    const { children } = props

    const { registerQuickAccess: registerAction, unregisterQuickAccess: unregisterAction } = useRibbonContext()
    useEffect(() => {
        registerAction(children)
        return () => unregisterAction()
    }, [children, registerAction, unregisterAction])
    return null
}
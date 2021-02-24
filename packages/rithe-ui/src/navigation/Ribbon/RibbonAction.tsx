import { ReactNode, useEffect } from "react";
import { useRibbonContext } from "./RibbonContext";

export interface RibbonActionProps {
    children?: ReactNode | ReactNode[],
}

export const RibbonAction = (props: RibbonActionProps) => {
    const { children } = props

    const { registerAction, unregisterAction } = useRibbonContext()
    useEffect(() => {
        registerAction(children)
        return () => unregisterAction()
    }, [children, registerAction, unregisterAction])
    return null
}
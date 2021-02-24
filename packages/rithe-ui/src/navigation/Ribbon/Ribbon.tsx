import React, { CSSProperties, ReactNode } from "react"
import { RibbonInternal } from "./internal/RibbonInternal"
import { RibbonContextProvider } from "./RibbonContext"

export interface RibbonProps {
    className?: string,
    style?: CSSProperties,
    children: ReactNode | ReactNode[],
}

export const Ribbon = (props: RibbonProps) => {
    const {
        className,
        style,
        children,
    } = props
    return <RibbonContextProvider>
        {children}
        <RibbonInternal className={className} style={style} />
    </RibbonContextProvider>
}

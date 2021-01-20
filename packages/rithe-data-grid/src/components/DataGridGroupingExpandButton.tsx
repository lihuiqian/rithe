import React, { ReactNode } from "react";

export interface DataGridGroupingExpandButtonProps {
    children?: ReactNode | ReactNode[]
}

export const DataGridGroupingExpandButton = (props: DataGridGroupingExpandButtonProps) => {
    const { children } = props
    return <div>{children}</div>
}
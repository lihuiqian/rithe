import React, { ReactNode } from "react";

export interface DataGridTreeExpandButtonProps {
    children?: ReactNode | ReactNode[]
}

export const DataGridTreeExpandButton = (props: DataGridTreeExpandButtonProps) => {
    const { children } = props
    return <div>{children}</div>
}
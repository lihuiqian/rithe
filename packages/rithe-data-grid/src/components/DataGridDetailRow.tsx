import React, { ReactNode } from "react";

export interface DataGridDetailRowProps {
    children?: ReactNode | ReactNode[]
}

export const DataGridDetailRow = (props: DataGridDetailRowProps) => {
    const { children } = props
    return <div>{children}</div>
}
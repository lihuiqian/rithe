import React, { ReactNode } from "react";

export interface DataGridTreeExpandAllProps {
    children?: ReactNode | ReactNode[]
}

export const DataGridTreeExpandAll = (props: DataGridTreeExpandAllProps) => {
    const { children } = props
    return <div>{children}</div>
}
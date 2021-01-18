import React, { ReactNode } from "react";

export interface DataGridToolbarProps {
    children?: ReactNode | ReactNode[]
}

export const DataGridToolbar = (props: DataGridToolbarProps) => {
    const { children } = props
    return <div>{children}</div>
}
import React, { ReactNode } from "react";

export interface DataGridContainerProps {
    children?: ReactNode | ReactNode[]
}

export const DataGridContainer = (props: DataGridContainerProps) => {
    const { children } = props
    return <div>{children}</div>
}
import React, { ReactNode } from "react";

export interface DataGridColumnResizingHandleProps {
    children?: ReactNode | ReactNode[]
}

export const DataGridColumnResizingHandle = (props: DataGridColumnResizingHandleProps) => {
    const { children } = props
    return <div>{children}</div>
}
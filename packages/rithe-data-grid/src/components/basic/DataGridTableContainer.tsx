import React, { ReactNode } from "react";

export interface DataGridTableContainerProps {
    children?: ReactNode | ReactNode[],
}

export const DataGridTableContainer = (props: DataGridTableContainerProps) => {
    const { children } = props
    return <div>{children}</div>
}
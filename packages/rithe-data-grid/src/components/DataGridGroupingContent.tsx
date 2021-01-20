import React, { ReactNode } from "react";

export interface DataGridGroupingContentProps {
    children?: ReactNode | ReactNode[]
}

export const DataGridGroupingContent = (props: DataGridGroupingContentProps) => {
    const { children } = props
    return <div>{children}</div>
}
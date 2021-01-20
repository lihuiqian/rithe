import React, { ReactNode } from "react";

export interface DataGridDetailContentProps {
    children?: ReactNode | ReactNode[]
}

export const DataGridDetailContent = (props: DataGridDetailContentProps) => {
    const { children } = props
    return <div>{children}</div>
}
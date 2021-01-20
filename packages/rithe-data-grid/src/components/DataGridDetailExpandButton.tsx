import React, { ReactNode } from "react";

export interface DataGridDetailExpandButtonProps {
    children?: ReactNode | ReactNode[]
}

export const DataGridDetailExpandButton = (props: DataGridDetailExpandButtonProps) => {
    const { children } = props
    return <div>{children}</div>
}
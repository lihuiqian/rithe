import React, { ReactNode } from "react";

export interface DataGridColumnVisibilityToolbarButtonProps {
    children?: ReactNode | ReactNode[]
}

export const DataGridColumnVisibilityToolbarButton = (props: DataGridColumnVisibilityToolbarButtonProps) => {
    const { children } = props
    return <div>{children}</div>
}
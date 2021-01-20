import React, { ReactNode } from "react";

export interface DataGridColumnVisibilityMenuItemProps {
    children?: ReactNode | ReactNode[]
}

export const DataGridColumnVisibilityMenuItem = (props: DataGridColumnVisibilityMenuItemProps) => {
    const { children } = props
    return <div>{children}</div>
}
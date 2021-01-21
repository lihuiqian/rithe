import React, { ReactNode } from "react";

export interface DataGridFilteringMenuItemProps {
    children?: ReactNode | ReactNode[]
}

export const DataGridFilteringMenuItem = (props: DataGridFilteringMenuItemProps) => {
    const { children } = props
    return <div>{children}</div>
}
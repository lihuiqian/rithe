import React, { ReactNode } from "react";

export interface DataGridPopoverProps {
    children?: ReactNode | ReactNode[]
}

export const DataGridPopover = (props: DataGridPopoverProps) => {
    const { children } = props
    return <div>{children}</div>
}
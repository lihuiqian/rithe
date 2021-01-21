import React, { ReactNode } from "react";

export interface DataGridPopoverProps {
    open: boolean,
    anchorEl: HTMLElement | null,
    onClose: () => void,
    children?: ReactNode | ReactNode[]
}

export const DataGridPopover = (props: DataGridPopoverProps) => {
    const { children } = props
    return <div>{children}</div>
}
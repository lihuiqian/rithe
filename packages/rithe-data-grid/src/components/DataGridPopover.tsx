import React, { ReactNode, useEffect } from "react";

export interface DataGridPopoverProps {
    open: boolean,
    anchorEl: HTMLElement | null,
    onClose: () => void,
    children?: ReactNode | ReactNode[]
}

export const DataGridPopover = (props: DataGridPopoverProps) => {
    const { open, onClose, children } = props

    useEffect(() => {
        const onClick = () => { if (open) onClose() }
        window.addEventListener('click', onClick)
        return () => window.removeEventListener('click', onClick)
    }, [onClose, open])

    return <div>{open && children}</div>
}
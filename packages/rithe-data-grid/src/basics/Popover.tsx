import React, { ReactNode, useEffect } from "react";

export interface PopoverProps {
    open: boolean,
    anchorEl: HTMLElement | null,
    onClose: () => void,
    children?: ReactNode | ReactNode[]
}

export const Popover = (props: PopoverProps) => {
    const { open, onClose, children } = props

    useEffect(() => {
        const onClick = () => { if (open) onClose() }
        window.addEventListener('click', onClick)
        return () => window.removeEventListener('click', onClick)
    }, [onClose, open])

    return <div style={{ position: 'absolute' }}>{open && children}</div>
}
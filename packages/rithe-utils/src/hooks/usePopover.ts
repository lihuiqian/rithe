import { MouseEvent, useCallback, useState } from "react";

function usePopover() {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

    const onOpen = useCallback((e: MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget)
    }, [])

    const onClose = useCallback(() => {
        setAnchorEl(null)
    }, [])

    return [!!anchorEl, anchorEl, onOpen, onClose] as [open: boolean, anchorEl: HTMLElement | null, onOpen: (e: MouseEvent<HTMLElement>) => void, onClose: () => void]
}

export default usePopover
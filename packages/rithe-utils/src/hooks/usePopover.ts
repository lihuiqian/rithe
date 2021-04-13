import { RefObject, SyntheticEvent, useCallback, useState } from "react";

function usePopover(ref?: RefObject<HTMLElement>) {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

    const onOpen = useCallback((e: SyntheticEvent<HTMLElement>) => {
        setAnchorEl(ref && ref.current ? ref.current : e.currentTarget)
    }, [ref])

    const onClose = useCallback(() => {
        setAnchorEl(null)
    }, [])

    const onSwitch = useCallback((e: SyntheticEvent<HTMLElement>) => {
        setAnchorEl(anchorEl => {
            return anchorEl ? null : (ref && ref.current ? ref.current : e.currentTarget)
        })
    }, [ref])

    return {
        open: !!anchorEl,
        anchorEl,
        onOpen,
        onClose,
        onSwitch,
    }
}

export default usePopover
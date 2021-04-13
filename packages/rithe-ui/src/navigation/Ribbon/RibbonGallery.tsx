import { Button, makeStyles, Popper } from "@material-ui/core";
import { usePopover } from "@rithe/utils";
import React, { ReactNode, useRef } from "react";
import { useMediaQuery } from "./hooks/useMediaQuery";
import { MediaQuery } from "./types/MediaQuerySize";
import { GALLERY_MARGIN_BOTTOM, GALLERY_MARGIN_TOP, ONE_LINE_BUTTON_DROPDOWN_WIDTH } from "./utils/constants";

export interface RibbonGalleryProps {
    lengthes: number | MediaQuery<number>[],
    shortcuts?: ReactNode | ReactNode[],
    children?: (onClose: () => void) => ReactNode | ReactNode[],
}

export const RibbonGallery = (props: RibbonGalleryProps) => {
    const {
        lengthes,
        shortcuts,
        children,
    } = props

    const length = useMediaQuery(lengthes, 96)
    const ref = useRef<HTMLDivElement>(null)
    const { open, anchorEl, onOpen, onClose, onSwitch } = usePopover(ref)

    const styles = useStyles()
    return <div
        className={styles.root}
        style={{ width: length }}
    >
        <div ref={ref}></div>
        <div className={styles.shortcut}>
            {shortcuts}
        </div>
        <Button
            onClick={onSwitch}
            tabIndex={-1}
            className={styles.button}
        >
            ∨
        </Button>
        <Popper
            open={open}
            anchorEl={anchorEl}
            placement="bottom-start"
        >
            {open && children && children(onClose)}
        </Popper>
    </div>
}

const useStyles = makeStyles(theme => ({
    root: {
        width: 200,
        marginTop: GALLERY_MARGIN_TOP,
        marginBottom: GALLERY_MARGIN_BOTTOM,
        position: 'relative',
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'stretch',
        boxSizing: 'border-box',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: theme.palette.action.active,
    },
    shortcut: {
        flex: '1 1 auto',
    },
    button: {
        flex: `0 0 ${ONE_LINE_BUTTON_DROPDOWN_WIDTH}px`,
        padding: 0,
    }
}))
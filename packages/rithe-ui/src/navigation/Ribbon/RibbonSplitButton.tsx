import { Button, makeStyles, Popover } from "@material-ui/core";
import { usePopover } from "@rithe/utils";
import clsx from 'clsx';
import React, { ReactNode, useCallback, useState } from "react";
import { useLargeButtonLines } from "./hooks/useLargeButtonLines";
import { useMediaQuery } from "./hooks/useMediaQuery";
import { MediaQuery } from "./types/MediaQuerySize";
import { Size } from "./types/Size";
import { GROUP_FONT_SIZE, ONE_LINE_BUTTON_DROPDOWN_WIDTH, ONE_LINE_BUTTON_ICON_SIZE, ONE_LINE_ITEM_HEIGHT, ONE_LINE_ITEM_MAX_WIDTH, ONE_LINE_ITEM_TEXT_PADDING, THREE_LINE_BUTTON_ICON_SIZE, THREE_LINE_BUTTON_TEXT_HEIGHT, THREE_LINE_BUTTON_TEXT_PADDING, THREE_LINE_ITEM_HEIGHT, THREE_LINE_ITEM_MIN_WIDTH } from "./utils/constants";

export interface RibbonSplitButtonProps {
    icon: ReactNode,
    largeIcon?: ReactNode,
    text: string,
    sizes: Size | MediaQuery<Size>[],
    disabled?: boolean,
    selected?: boolean,
    onClick?: () => void,
    children?: (onClose: () => void) => ReactNode | ReactNode[],
}

export const RibbonSplitButton = (props: RibbonSplitButtonProps) => {
    const {
        icon,
        largeIcon,
        text,
        sizes,
        disabled,
        selected,
        onClick,
        children,
    } = props

    const size = useMediaQuery(sizes, 'middle')

    const [hover1, setHover1] = useState(false)
    const onEnter1 = useCallback(() => setHover1(true), [])
    const onLeave1 = useCallback(() => setHover1(false), [])
    const [hover2, setHover2] = useState(false)
    const onEnter2 = useCallback(() => setHover2(true), [])
    const onLeave2 = useCallback(() => setHover2(false), [])

    const [linesRef, lines] = useLargeButtonLines(text, false)
    const { open, anchorEl, onOpen, onClose } = usePopover()
    const styles = useStyles()
    return <>
        <div
            ref={linesRef as any}
            title={text}
            className={clsx(
                styles.root,
                size === 'small' && styles.small,
                size === 'middle' && styles.middle,
                size === 'large' && styles.large,
            )}>
            <Button
                disabled={disabled}
                onClick={onClick}
                onMouseEnter={onEnter1}
                onMouseLeave={onLeave1}
                className={clsx(
                    styles.first,
                    hover1 && styles.hover,
                    selected && styles.selected,
                )}
            >
                <div className={clsx(
                    size === 'small' && styles.firstSmall,
                    size === 'middle' && styles.firstMiddle,
                    size === 'large' && styles.firstLarge,
                )}>
                    <span><div>{size === 'large' && largeIcon ? largeIcon : icon}</div></span>
                    {size === 'middle' && <span>{text}</span>}
                </div>
                <div className={clsx(
                    styles.border,
                    selected && styles.borderSelected,
                    hover2 && !selected && styles.borderAnotherHover,
                )} />
            </Button>
            <Button
                disabled={disabled}
                onClick={onOpen}
                onMouseEnter={onEnter2}
                onMouseLeave={onLeave2}
                className={clsx(
                    styles.second,
                    hover2 && styles.hover,
                    selected && styles.selected,
                )}
            >
                <div className={clsx(
                    size === 'small' && styles.secondSmall,
                    size === 'middle' && styles.secondMiddle,
                    size === 'large' && styles.secondLarge,
                )}>
                    {size !== 'large' && <span>∨</span>}
                    {size === 'large' && <span><div>{lines[0]}</div><div>{lines[1]}∨</div></span>}
                </div>
                <div className={clsx(
                    styles.border,
                    selected && styles.borderSelected,
                    hover1 && !selected && styles.borderAnotherHover,
                )} />
            </Button>
            {!selected && open && <div className={styles.active} />}
        </div>
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
            {open && children && children(onClose)}
        </Popover>
    </>
}

const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        display: 'flex',
    },
    small: {
        height: ONE_LINE_ITEM_HEIGHT,
    },
    middle: {
        height: ONE_LINE_ITEM_HEIGHT,
    },
    large: {
        height: THREE_LINE_ITEM_HEIGHT,
        minWidth: THREE_LINE_ITEM_MIN_WIDTH,
        display: 'flex',
        flexDirection: 'column',
    },
    hover: {
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
        },
    },
    selected: {
        backgroundColor: theme.palette.action.selected,
        '&:hover': {
            backgroundColor: theme.palette.action.selected,
        },
    },
    first: {
        position: 'relative',
        padding: 0,
        fontSize: GROUP_FONT_SIZE,
        height: '100%',
    },
    firstSmall: {
        height: ONE_LINE_ITEM_HEIGHT,
        '&>span:nth-child(1)': {
            display: 'inline-block',
        },
        '&>span:nth-child(1)>div': {
            width: ONE_LINE_BUTTON_ICON_SIZE,
            height: ONE_LINE_BUTTON_ICON_SIZE,
        },
    },
    firstMiddle: {
        height: ONE_LINE_ITEM_HEIGHT,
        '&>span:nth-child(1)': {
            display: 'inline-block',
        },
        '&>span:nth-child(1)>div': {
            width: ONE_LINE_BUTTON_ICON_SIZE,
            height: ONE_LINE_BUTTON_ICON_SIZE,
        },
        '&>span:nth-child(2)': {
            display: 'inline-block',
            lineHeight: `${ONE_LINE_ITEM_HEIGHT}px`,
            maxWidth: ONE_LINE_ITEM_MAX_WIDTH - ONE_LINE_BUTTON_ICON_SIZE,
            verticalAlign: 'top',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            paddingLeft: ONE_LINE_ITEM_TEXT_PADDING,
            paddingRight: ONE_LINE_ITEM_TEXT_PADDING,
        },
    },
    firstLarge: {
        height: THREE_LINE_ITEM_HEIGHT - THREE_LINE_BUTTON_TEXT_HEIGHT,
        '&>span:nth-child(1)': {
            display: 'flex',
            width: '100%',
            height: THREE_LINE_ITEM_HEIGHT - THREE_LINE_BUTTON_TEXT_HEIGHT,
            alignItems: 'center',
            justifyContent: 'center',
        },
        '&>span:nth-child(1)>div': {
            width: THREE_LINE_BUTTON_ICON_SIZE,
            height: THREE_LINE_BUTTON_ICON_SIZE,
        },
    },
    second: {
        position: 'relative',
        padding: 0,
        fontSize: GROUP_FONT_SIZE,
        height: '100%',
    },
    secondSmall: {
        height: ONE_LINE_ITEM_HEIGHT,
        width: ONE_LINE_BUTTON_DROPDOWN_WIDTH,
        '&>span:nth-child(1)': {
            display: 'inline-block',
            lineHeight: `${ONE_LINE_ITEM_HEIGHT}px`,
            verticalAlign: 'top',
        },
    },
    secondMiddle: {
        height: ONE_LINE_ITEM_HEIGHT,
        width: ONE_LINE_BUTTON_DROPDOWN_WIDTH,
        '&>span:nth-child(1)': {
            display: 'inline-block',
            lineHeight: `${ONE_LINE_ITEM_HEIGHT}px`,
            maxWidth: ONE_LINE_ITEM_MAX_WIDTH - ONE_LINE_BUTTON_ICON_SIZE,
            verticalAlign: 'top',
        },
    },
    secondLarge: {
        height: THREE_LINE_BUTTON_TEXT_HEIGHT,
        '&>span': {
            display: 'block',
            width: '100%',
            boxSizing: 'border-box',
            height: THREE_LINE_BUTTON_TEXT_HEIGHT,
            lineHeight: '1rem',
            overflow: 'hidden',
            paddingLeft: THREE_LINE_BUTTON_TEXT_PADDING,
            paddingRight: THREE_LINE_BUTTON_TEXT_PADDING,
        },
    },
    active: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        backgroundColor: theme.palette.action.active,
    },
    border: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'transparent',
        transition: `border ${theme.transitions.duration.short}ms ${theme.transitions.easing.easeInOut}`,
    },
    borderSelected: {
        '&:hover': {
            borderColor: theme.palette.action.hover,
        },
    },
    borderAnotherHover: {
        borderColor: theme.palette.action.hover,
    },
}))
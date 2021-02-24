import { Button, makeStyles } from "@material-ui/core";
import clsx from 'clsx';
import React, { ReactNode } from "react";
import { useButtonSize } from "./hooks/useButtonSize";
import { useLargeButtonLines } from "./hooks/useLargeButtonLines";
import { MediaQuery } from "./types/MediaQuerySize";
import { Size } from "./types/Size";
import { GROUP_FONT_SIZE, ONE_LINE_BUTTON_ICON_SIZE, ONE_LINE_BUTTON_TEXT_PADDING, ONE_LINE_ITEM_HEIGHT, ONE_LINE_ITEM_MAX_WIDTH, THREE_LINE_BUTTON_ICON_SIZE, THREE_LINE_BUTTON_TEXT_HEIGHT, THREE_LINE_BUTTON_TEXT_PADDING, THREE_LINE_ITEM_HEIGHT, THREE_LINE_ITEM_MIN_WIDTH } from "./utils/constants";

export interface RibbonToggleButtonProps {
    icon: ReactNode,
    largeIcon?: ReactNode,
    text: string,
    sizes: Size | MediaQuery<Size>[],
    disabled?: boolean,
    selected?: boolean,
    onClick?: () => void,
}

export const RibbonToggleButton = (props: RibbonToggleButtonProps) => {
    const {
        icon,
        largeIcon,
        text,
        sizes,
        disabled,
        selected,
        onClick,
    } = props

    const size = useButtonSize(sizes)
    const [linesRef, lines] = useLargeButtonLines(text, false)
    const styles = useStyles()
    return <Button
        ref={linesRef as any}
        title={text}
        disabled={disabled}
        onClick={onClick}
        className={clsx(
            styles.root,
            selected && styles.selected,
        )}
    >
        <div className={clsx(
            size === 'small' && styles.small,
            size === 'middle' && styles.middle,
            size === 'large' && styles.large,
        )}>
            <span><div>{size === 'large' && largeIcon ? largeIcon : icon}</div></span>
            {size === 'middle' && <span>{text}</span>}
            {size === 'large' && <span><div>{lines[0]}</div><div>{lines[1]}</div></span>}
        </div>
    </Button>
}

const useStyles = makeStyles(theme => ({
    root: {
        display: 'block',
        position: 'relative',
        padding: 0,
        fontSize: GROUP_FONT_SIZE,
    },
    selected: {
        backgroundColor: theme.palette.action.selected,
    },
    small: {
        height: ONE_LINE_ITEM_HEIGHT,
        '&>span:nth-child(1)': {
            display: 'inline-block',
        },
        '&>span:nth-child(1)>div': {
            width: ONE_LINE_BUTTON_ICON_SIZE,
            height: ONE_LINE_BUTTON_ICON_SIZE,
        },
    },
    middle: {
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
            paddingLeft: ONE_LINE_BUTTON_TEXT_PADDING,
            paddingRight: ONE_LINE_BUTTON_TEXT_PADDING,
        },
    },
    large: {
        height: THREE_LINE_ITEM_HEIGHT,
        minWidth: THREE_LINE_ITEM_MIN_WIDTH,
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
        '&>span:nth-child(2)': {
            display: 'block',
            width: '100%',
            boxSizing: 'border-box',
            height: THREE_LINE_BUTTON_TEXT_HEIGHT,
            lineHeight: '1rem',
            overflow: 'hidden',
            paddingLeft: THREE_LINE_BUTTON_TEXT_PADDING,
            paddingRight: THREE_LINE_BUTTON_TEXT_PADDING,
        },
    }
}))
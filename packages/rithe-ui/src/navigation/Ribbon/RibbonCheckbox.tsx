import { Checkbox, makeStyles } from "@material-ui/core";
import clsx from 'clsx';
import React from "react";
import { GROUP_FONT_SIZE, ONE_LINE_BUTTON_ICON_SIZE, ONE_LINE_ITEM_HEIGHT, ONE_LINE_ITEM_MAX_WIDTH, ONE_LINE_ITEM_TEXT_PADDING } from "./utils/constants";

export interface RibbonCheckBoxProps {
    text: string,
    checked?: boolean,
    disabled?: boolean,
    onClick?: () => void,
}

export const RibbonCheckBox = (props: RibbonCheckBoxProps) => {
    const {
        text,
        checked,
        disabled,
        onClick,
    } = props

    const styles = useStyles()
    return <div
        onClick={disabled ? undefined : onClick}
        className={clsx(
            styles.root,
            disabled && styles.disabled,
        )}
    >
        <Checkbox
            disabled={disabled}
            checked={!!checked}
            color="primary"
            disableRipple
            className={styles.checkbox}
        />
        <span className={styles.text}>{text}</span>
    </div>
}

const useStyles = makeStyles(theme => ({
    root: {
        display: 'block',
        position: 'relative',
        fontSize: GROUP_FONT_SIZE,
        height: ONE_LINE_ITEM_HEIGHT,
    },
    disabled: {
        color: theme.palette.text.disabled,
    },
    checkbox: {
        padding: 0,
        borderRadius: 0,
        '&:hover': {
            backgroundColor: 'transparent',
        }
    },
    text: {
        display: 'inline-block',
        lineHeight: `${ONE_LINE_ITEM_HEIGHT}px`,
        maxWidth: ONE_LINE_ITEM_MAX_WIDTH - ONE_LINE_BUTTON_ICON_SIZE,
        verticalAlign: 'top',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        paddingLeft: ONE_LINE_ITEM_TEXT_PADDING,
        paddingRight: ONE_LINE_ITEM_TEXT_PADDING,
        cursor: 'pointer',
        userSelect: 'none',
    }
}))
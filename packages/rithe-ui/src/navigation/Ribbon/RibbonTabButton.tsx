import { Button, makeStyles } from "@material-ui/core"
import clsx from 'clsx'
import React, { ReactNode } from "react"
import { TAB_BUTTON_PADDING, TAB_FONT_SIZE, TAB_ICON_SIZE } from "./utils/constants"

export interface RibbonTabButtonProps {
    icon?: ReactNode,
    text?: string,
    tooltip?: string,
    disabled?: boolean,
    selected?: boolean,
    onClick?: () => void,
}

export const RibbonTabButton = (props: RibbonTabButtonProps) => {
    const {
        icon,
        text,
        tooltip,
        disabled,
        selected,
        onClick,
    } = props

    const styles = useStyles()
    return <Button
        disabled={disabled}
        title={tooltip}
        onClick={onClick}
        className={clsx(
            styles.root,
            selected && styles.selected,
        )}
    >
        {icon && <span className={styles.icon}>{icon}</span>}
        {icon && text && <span className={styles.space} />}
        {text && <span className={styles.text}>{text}</span>}
    </Button>
}

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
        position: 'relative',
        padding: TAB_BUTTON_PADDING,
        color: theme.palette.primary.contrastText,
    },
    selected: {
        backgroundColor: theme.palette.action.selected,
    },
    icon: {
        width: TAB_ICON_SIZE,
        height: TAB_ICON_SIZE,
    },
    space: {
        marginRight: theme.spacing(0.5),
    },
    text: {
        fontSize: TAB_FONT_SIZE,
        fontWeight: 100,
    },
}))
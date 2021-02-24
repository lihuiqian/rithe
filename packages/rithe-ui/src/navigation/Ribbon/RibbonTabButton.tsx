import { Button, makeStyles } from "@material-ui/core"
import React, { ReactNode } from "react"
import { TAB_BUTTON_PADDING, TAB_ICON_SIZE } from "./utils/constants"

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
        className={styles.root}
    >
        {icon && <span className={styles.icon}>{icon}</span>}
        {icon && text && <span className={styles.space} />}
        {text && <span>{text}</span>}
        {selected && <div className={styles.selected} />}
    </Button>
}

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
        position: 'relative',
        padding: TAB_BUTTON_PADDING,
    },
    icon: {
        width: TAB_ICON_SIZE,
        height: TAB_ICON_SIZE,
    },
    space: {
        marginRight: theme.spacing(0.5),
    },
    selected: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        backgroundColor: theme.palette.action.selected,
    },
}))
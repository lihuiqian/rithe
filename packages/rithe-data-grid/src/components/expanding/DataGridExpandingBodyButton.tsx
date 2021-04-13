import { Button, makeStyles } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import clsx from 'clsx';
import React from "react";

export interface DataGridExpandingBodyButtonProps {
    level: number,
    expanded: boolean,
    toggle: () => void,
}

export const DataGridExpandingBodyButton = (props: DataGridExpandingBodyButtonProps) => {
    const { level, expanded, toggle } = props

    const styles = useStyles()
    return <Button
        onClick={e => {
            toggle()
            e.stopPropagation()
        }}
        className={styles.root}
        style={{ paddingLeft: 20 * level }}
    >
        <ExpandMore
            className={clsx(styles.icon, expanded ? styles.expanded : styles.collapsed)}
        />
    </Button>
}

const useStyles = makeStyles(theme => ({
    root: {
        padding: 0,
        minWidth: 0,
    },
    icon: {
        transition: `transform ${theme.transitions.duration.short}ms ${theme.transitions.easing.easeInOut}`
    },
    expanded: {
        transform: 'rotate(0)',
    },
    collapsed: {
        transform: 'rotate(-90deg)',
    },
}))
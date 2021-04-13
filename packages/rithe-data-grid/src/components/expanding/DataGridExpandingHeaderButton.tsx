import { Button, ButtonGroup, makeStyles } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import clsx from 'clsx';
import React from "react";

export interface DataGridExpandingHeaderButtonProps {
    expandeds: boolean[],
    switchLevelExpand: (level: number) => void,
}

export const DataGridExpandingHeaderButton = (props: DataGridExpandingHeaderButtonProps) => {
    const { expandeds, switchLevelExpand } = props
    const styles = useStyles()
    return <ButtonGroup>
        {expandeds.map((expanded, level) => {
            return <Button
                key={level}
                onClick={() => switchLevelExpand(level)}
                className={clsx(styles.button, expanded && styles.expanded)}
            >
                {level}
            </Button>
        })}
    </ButtonGroup>
}

const useStyles = makeStyles({
    root: {
        display: 'flex',
    },
    button: {
        padding: 0,
        minWidth: 0,
        width: 24,
        height: 24,
    },
    expanded: {
        backgroundColor: grey[400],
        '&:hover': {
            backgroundColor: grey[500]
        }
    },
})
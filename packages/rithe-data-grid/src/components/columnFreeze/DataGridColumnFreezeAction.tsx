import { Button, ButtonGroup, ListItem, ListItemIcon, makeStyles } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import clsx from 'clsx';
import React, { useCallback } from "react";
import { Freeze } from "../../assets/Freeze";
import { FreezePosition } from "../../types/FreezePosition";

export interface DataGridColumnFreezeActionProps {
    field: string,
    freezePosition?: FreezePosition,
    setFreezePosition: (field: string, freeze?: FreezePosition) => void,
}

export const DataGridColumnFreezeAction = (props: DataGridColumnFreezeActionProps) => {
    const { field, freezePosition, setFreezePosition } = props
    const onFreezeStartSwitch = useCallback(() => {
        setFreezePosition(field, freezePosition === 'start' ? undefined : 'start')
    }, [field, freezePosition, setFreezePosition])
    const onFreezeEndSwitch = useCallback(() => {
        setFreezePosition(field, freezePosition === 'end' ? undefined : 'end')
    }, [field, freezePosition, setFreezePosition])

    const styles = useStyles()
    return <ListItem>
        <ListItemIcon>
            <Freeze />
        </ListItemIcon>
        <div className={styles.listItemContent}>
            <ButtonGroup>
                <Button onClick={onFreezeStartSwitch} className={clsx(styles.button, freezePosition === 'start' && styles.activeButton)}>
                    <KeyboardArrowLeft />
                </Button>
                <Button onClick={onFreezeEndSwitch} className={clsx(styles.button, freezePosition === 'end' && styles.activeButton)}>
                    <KeyboardArrowRight />
                </Button>
            </ButtonGroup>
        </div>
    </ListItem>
}

const useStyles = makeStyles({
    listItemContent: {
        flex: '1 1 auto',
    },
    button: {
        padding: 0,
        minWidth: 0,
    },
    activeButton: {
        backgroundColor: grey[400],
        '&:hover': {
            backgroundColor: grey[500]
        }
    },
})

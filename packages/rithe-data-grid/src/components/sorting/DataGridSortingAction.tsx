import { ListItemIcon, ListItemText, makeStyles, MenuItem } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import React from "react";
import { AtoZ } from "../../assets/AtoZ";
import { ZtoA } from "../../assets/ZtoA";
import { Direction } from "../../types/Direction";

export interface DataGridSortingActionProps {
    direction?: Direction,
    switchAsc: () => void,
    switchDesc: () => void,
    onClose: () => void,
}

export const DataGridSortingAction = (props: DataGridSortingActionProps) => {
    const {
        direction,
        switchAsc,
        switchDesc,
        onClose,
    } = props

    const styles = useStyles()
    return <>
        <MenuItem onClick={() => {
            switchAsc()
            onClose()
        }}>
            <ListItemIcon>
                <AtoZ className={direction === 'asc' ? styles.active : undefined} />
            </ListItemIcon>
            <ListItemText>
                Asc
            </ListItemText>
        </MenuItem>
        <MenuItem onClick={() => {
            switchDesc()
            onClose()
        }}>
            <ListItemIcon >
                <ZtoA className={direction === 'desc' ? styles.active : undefined} />
            </ListItemIcon>
            <ListItemText>
                Desc
            </ListItemText>
        </MenuItem>
    </>
}

const useStyles = makeStyles({
    active: {
        backgroundColor: grey[400],
    },
})
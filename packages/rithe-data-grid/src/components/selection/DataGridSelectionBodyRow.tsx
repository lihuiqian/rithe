import { makeStyles } from "@material-ui/core";
import { Records } from "@rithe/utils";
import clsx from 'clsx';
import React from "react";
import { DataGridBodyRow, DataGridBodyRowProps } from "../basic/DataGridBodyRow";

export interface DataGridSelectionBodyRowProps extends DataGridBodyRowProps {
    highlighted?: boolean,
    select?: () => void,
}

export const DataGridSelectionBodyRow = (props: DataGridSelectionBodyRowProps) => {
    const { highlighted, select, className, onClick } = props
    const inheritProps: any = Records.delete(props as any, 'highlighted', 'select', 'className', 'onClick')

    const styles = useStyles()
    return <DataGridBodyRow
        onClick={e => {
            select && select()
            onClick && onClick(e)
        }}
        className={clsx(highlighted && styles.highlighted, className)}
        {...inheritProps}
    />
}

const useStyles = makeStyles(theme => ({
    highlighted: {
        backgroundColor: theme.palette.action.selected,
    },
}))
import { makeStyles, TableCell } from "@material-ui/core";
import React, { ReactNode } from "react";
import { Align } from "../../types/Align";
import { FreezePosition } from "../../types/FreezePosition";
import { TableColumn } from "../../types/TableColumn";
import { TableRow } from "../../types/TableRow";

export interface DataGridFooterCellProps {
    align: Align,
    width: number,
    colSpan: number,
    rowSpan: number,
    freezePosition?: FreezePosition,
    freezeOffset?: number,
    tableColumns: TableColumn[],
    tableRows: TableRow[],
    children?: ReactNode | ReactNode[],
}

export const DataGridFooterCell = (props: DataGridFooterCellProps) => {
    const {
        align,
        width,
        colSpan,
        rowSpan,
        freezePosition,
        freezeOffset,
        children,
    } = props

    const styles = useStyles()
    return <TableCell
        colSpan={colSpan}
        rowSpan={rowSpan}
        style={{
            width,
            position: freezePosition ? 'sticky' : 'static',
            left: freezePosition === 'start' ? freezeOffset : undefined,
            right: freezePosition === 'end' ? freezeOffset : undefined,
            zIndex: freezePosition ? 1 : 0,
        }}
        className={styles.root}
    >
        <div
            style={{
                width,
                justifyContent: align === 'center' ? 'center' : `flex-${align}`,
            }}
            className={styles.layout}
        >
            {children}
        </div>
    </TableCell>
}

const useStyles = makeStyles(theme => ({
    root: {
        padding: 0,
        boxSizing: 'border-box',
    },
    layout: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        padding: `0 ${theme.spacing(1)}px`,
        boxSizing: 'border-box',
        overflow: 'hidden',
    }
}))
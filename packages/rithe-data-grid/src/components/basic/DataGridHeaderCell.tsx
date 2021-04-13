/* eslint-disable react/prop-types */
import { makeStyles, TableCell } from "@material-ui/core";
import React, { MouseEvent, ReactNode } from "react";
import { Align } from "../../types/Align";
import { FreezePosition } from "../../types/FreezePosition";
import { TableColumn } from "../../types/TableColumn";
import { TableRow } from "../../types/TableRow";
import { COLUMN_ORDERING_PAYLOAD_TYPE, COLUMN_RESIZING_PAYLOAD_TYPE } from "../../utils/constants";

export interface DataGridHeaderCellProps {
    align: Align,
    width: number,
    colSpan: number,
    rowSpan: number,
    freezePosition?: FreezePosition,
    freezeOffset?: number,
    tableColumns: TableColumn[],
    tableRows: TableRow[],
    resizable?: boolean,
    onClick?: (e: MouseEvent<HTMLTableCellElement>) => void,
    children?: ReactNode | ReactNode[],
}

export const DataGridHeaderCell = (props: DataGridHeaderCellProps) => {
    const {
        align,
        width,
        colSpan,
        rowSpan,
        freezePosition,
        freezeOffset,
        tableColumns,
        tableRows,
        resizable,
        onClick,
        children,
    } = props

    const reorderData = {
        'data-draggable': COLUMN_ORDERING_PAYLOAD_TYPE,
        'data-fields': JSON.stringify(tableColumns.map(({ field }) => field)),
        'data-rowids': JSON.stringify(tableRows.map(({ rowId }) => rowId)),
    }

    const resizeData = {
        'data-draggable': COLUMN_RESIZING_PAYLOAD_TYPE,
        'data-fields': JSON.stringify(tableColumns.map(({ field }) => field)),
        'data-rowids': JSON.stringify(tableRows.map(({ rowId }) => rowId)),
    }

    const styles = useStyles()
    return <TableCell
        colSpan={colSpan}
        rowSpan={rowSpan}
        onClick={onClick}
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
            {...reorderData}
            style={{
                width,
                justifyContent: align === 'center' ? 'center' : `flex-${align}`,
            }}
            className={styles.layout}
        >
            {children}
            {resizable && <div
                {...resizeData}
                className={styles.handleArea}
            >
                <div className={styles.handle} />
            </div>}
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
    },
    handleArea: {
        position: 'absolute',
        height: '100%',
        width: 8,
        top: 0,
        right: 0,
        cursor: 'e-resize',
    },
    handle: {
        position: 'absolute',
        height: '60%',
        width: 1,
        top: '20%',
        right: 0,
        backgroundColor: theme.palette.divider,
    },
}))
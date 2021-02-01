import React, { useCallback } from "react";
import { useDataGridTheme } from "../DataGridTheme";
import { RowId } from "../types/RowId";

export interface DataGridDetailExpandButtonProps {
    rowId: RowId,
    expanded: boolean,
    onExpandedChange: (rowId: RowId, expanded: boolean) => void,
}

export const DataGridDetailExpandButton = (props: DataGridDetailExpandButtonProps) => {
    const { rowId, expanded, onExpandedChange } = props
    const onClick = useCallback(() => {
        onExpandedChange(rowId, !expanded)
    }, [expanded, onExpandedChange, rowId])

    const { iconButtonComponent: IconButton } = useDataGridTheme()
    return <IconButton onClick={onClick}>{expanded ? 'E' : 'C'}</IconButton>
}
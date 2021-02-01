import React, { useCallback } from "react";
import { useDataGridTheme } from "../DataGridTheme";

export interface TableExpandButtonProps {
    expandKey: any,
    expanded: boolean,
    onExpandedChange: (expandKey: any, expanded: boolean) => void,
}

export const TableExpandButton = (props: TableExpandButtonProps) => {
    const { expandKey, expanded, onExpandedChange } = props
    const onClick = useCallback(() => {
        onExpandedChange(expandKey, !expanded)
    }, [expandKey, expanded, onExpandedChange])

    const { iconButtonComponent: IconButton } = useDataGridTheme()
    return <IconButton onClick={onClick}>{expanded ? 'E' : 'C'}</IconButton> // TODO asset
}
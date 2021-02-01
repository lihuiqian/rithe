import React, { useCallback } from "react";
import { useDataGridTheme } from "../DataGridTheme";

export interface DataGridGroupingExpandButtonProps {
    group: any[],
    expanded: boolean,
    onExpandedChange: (group: any[], expanded: boolean) => void,
}

export const DataGridGroupingExpandButton = (props: DataGridGroupingExpandButtonProps) => {
    const { group, expanded, onExpandedChange } = props
    const onClick = useCallback(() => {
        onExpandedChange(group, !expanded)
    }, [expanded, group, onExpandedChange])

    const { iconButtonComponent: IconButton } = useDataGridTheme()
    return <IconButton onClick={onClick}>{expanded ? 'E' : 'C'}</IconButton>
}
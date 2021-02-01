import React from "react";
import { useDataGridTheme } from "../DataGridTheme";

export interface DataGridColumnVisibilityToolbarButtonProps {
    onClick: () => void,
}

export const DataGridColumnVisibilityToolbarButton = (props: DataGridColumnVisibilityToolbarButtonProps) => {
    const { onClick } = props
    const { iconButtonComponent: IconButton } = useDataGridTheme()
    return <IconButton onClick={onClick}>V</IconButton>
}
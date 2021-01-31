import React, { useCallback } from "react";
import { useDataGridTheme } from "../DataGridTheme";

export interface DataGridColumnVisibilityMenuItemProps {
    field: string,
    title: string,
    disabled: boolean,
    visibility: boolean,
    onColumnVisibilityChange: (field: string, visibility: boolean) => void,
}

export const DataGridColumnVisibilityMenuItem = (props: DataGridColumnVisibilityMenuItemProps) => {
    const { field, title, disabled, visibility, onColumnVisibilityChange } = props

    const onClick = useCallback(() => {
        !disabled && onColumnVisibilityChange(field, !visibility)
    }, [disabled, field, onColumnVisibilityChange, visibility])

    const { menuItemComponent: MenuItem,
        checkboxComponent: Checkbox,
        typographyComponent: Typography,
    } = useDataGridTheme()
    return <MenuItem onClick={onClick}>
        <Checkbox checked={visibility} disabled={disabled}>
            {title}
        </Checkbox>
        <Typography>title</Typography>
    </MenuItem>
}
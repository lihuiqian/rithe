import { Checkbox, IconButton, ListItemIcon, ListItemText, MenuItem, MenuList, Popover, Typography } from "@material-ui/core";
import { ViewColumn } from "@material-ui/icons";
import { usePopover } from "@rithe/utils";
import React from "react";
import { Column } from "../../types/Column";

export interface DataGridColumnVisibilityToolbarButtonProps {
    columns: Column[],
    hiddenFields: string[],
    disabledFields: string[],
    switchColumnVisibility: (field: string) => void,
}

export const DataGridColumnVisibilityToolbarButton = (props: DataGridColumnVisibilityToolbarButtonProps) => {
    const {
        columns,
        hiddenFields,
        disabledFields,
        switchColumnVisibility,
    } = props

    const { open, anchorEl, onOpen, onClose } = usePopover()
    return <>
        <IconButton
            onClick={onOpen}
        >
            <ViewColumn />
        </IconButton>
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={onClose}
        >
            <MenuList>
                {columns.map(({ field, title }) => {
                    const disabled = disabledFields.indexOf(field) >= 0
                    const checked = hiddenFields.indexOf(field) < 0
                    return <MenuItem
                        key={field}
                        disabled={disabled}
                        onClick={() => switchColumnVisibility(field)}
                    >
                        <ListItemIcon>
                            <Checkbox checked={checked} />
                        </ListItemIcon>
                        <ListItemText>
                            <Typography variant="body1">
                                {title}
                            </Typography>
                        </ListItemText>
                    </MenuItem>
                })}
            </MenuList>
        </Popover>
    </>
}
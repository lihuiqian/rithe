import React, { ComponentType } from "react";
import { PopoverProps } from "../basics/Popover";
import { DataGridColumnVisibilityMenuProps } from "../components/DataGridColumnVisibilityMenu";
import { DataGridColumnVisibilityMenuItemProps } from "../components/DataGridColumnVisibilityMenuItem";
import { DataGridColumnVisibilityToolbarButtonProps } from "../components/DataGridColumnVisibilityToolbarButton";

export interface ColumnVisibilityProps {
    hiddenFields?: string[],
    onHiddenFieldsChange?: (hiddenFields: string[]) => void,
    defaultHiddenFields?: string[],
    disableUserControl?: boolean,
    options?: {
        field: string,
        disableUserControl?: string,
    }
    popoverComponent?: ComponentType<PopoverProps>,
    toolbarButtonComponent?: ComponentType<DataGridColumnVisibilityToolbarButtonProps>,
    menuComponent?: ComponentType<DataGridColumnVisibilityMenuProps>,
    menuItemComponent?: ComponentType<DataGridColumnVisibilityMenuItemProps>,
}

export const ColumnVisibility = (props: ColumnVisibilityProps) => {

    return <></>
}
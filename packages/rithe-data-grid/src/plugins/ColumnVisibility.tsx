import React, { ComponentType } from "react";
import { DataGridColumnVisibilityMenuProps } from "../components/DataGridColumnVisibilityMenu";
import { DataGridColumnVisibilityMenuItemProps } from "../components/DataGridColumnVisibilityMenuItem";
import { DataGridColumnVisibilityToolbarButtonProps } from "../components/DataGridColumnVisibilityToolbarButton";
import { DataGridPopoverProps } from "../components/DataGridPopover";

export interface ColumnVisibilityProps {
    hiddenFields?: string[],
    onHiddenFieldsChange?: (hiddenFields: string[]) => void,
    defaultHiddenFields?: string[],
    disableUserControl?: boolean,
    options?: {
        field: string,
        disableUserControl?: string,
    }
    popoverComponent?: ComponentType<DataGridPopoverProps>,
    toolbarButtonComponent?: ComponentType<DataGridColumnVisibilityToolbarButtonProps>,
    menuComponent?: ComponentType<DataGridColumnVisibilityMenuProps>,
    menuItemComponent?: ComponentType<DataGridColumnVisibilityMenuItemProps>,
}

export const ColumnVisibility = (props: ColumnVisibilityProps) => {

    return <></>
}
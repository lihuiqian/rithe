import React, { ComponentType } from "react";
import { DataGridSortingMenuItemProps } from "../components/DataGridSortingMenuItem";
import { DataGridTitleProps } from "../components/DataGridTitle";
import { Direction } from "../types/Direction";

export interface SortingProps {
    sortings?: { field: string, direction: Direction }[],
    onSortingsChange?: (sortings: { field: string, direction: Direction }[]) => void,
    defaultSortings?: { field: string, direction: Direction }[],
    disableUserControl?: boolean,
    options?: {
        field: string,
        disableUserControl?: string,
    }
    titleComponent?: ComponentType<DataGridTitleProps>,
    menuItemComponent?: ComponentType<DataGridSortingMenuItemProps>,
}

export const Sorting = (props: SortingProps) => {

    return <></>
}
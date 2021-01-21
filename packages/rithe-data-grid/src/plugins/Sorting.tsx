import React, { ComponentType } from "react";
import { DataGridSearchInputProps } from "../components/DataGridSearchInput";
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
    inputComponent?: ComponentType<DataGridSearchInputProps>,
}

export const Sorting = (props: SortingProps) => {

    return <></>
}
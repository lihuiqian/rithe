import React, { ComponentType } from "react";
import { DataGridColumnResizingHandleProps } from "../components/DataGridColumnResizingHandle";

export interface ColumnResizingProps {
    columnWidths?: { field: string, width: number }[],
    onColumnWidthsChange?: (columnWidths: { field: string, width: number }[]) => void,
    defaultColumnWidths?: { field: string, width: number }[],
    minWidth?: number,
    maxWidth?: number,
    disableUserControl?: boolean,
    options?: {
        field: string,
        disableUserControl?: string,
        minWidth?: number,
        maxWidth?: number,
    }
    handleComponent?: ComponentType<DataGridColumnResizingHandleProps>,
}

export const ColumnResizing = (props: ColumnResizingProps) => {

    return <></>
}
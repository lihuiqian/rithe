import React, { ComponentType } from "react";
import { DataGridColumnFreezeCellProps } from "../components/DataGridColumnFreezeCell";
import { Freeze } from "../types/Freeze";

export interface ColumnFreezeProps {
    freezeColumns?: { field: string, freeze: Freeze }[],
    onFreezeColumnsChange?: (freezeColumns: { field: string, freeze: Freeze }[]) => void,
    defaultFreezeColumns?: { field: string, freeze: Freeze }[],
    disableUserControl?: boolean,
    options?: {
        field: string,
        disableUserControl?: string,
    }
    cellComponent?: ComponentType<DataGridColumnFreezeCellProps>,
}

export const ColumnFreeze = (props: ColumnFreezeProps) => {

    return <></>
}
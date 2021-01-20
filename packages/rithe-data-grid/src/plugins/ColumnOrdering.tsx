import React, { ComponentType } from "react";
import { DataGridColumnOrderingDragLabelProps } from "../components/DataGridColumnOrderingDragLabel";

export interface ColumnOrderingProps {
    fieldsOrder?: string[],
    onFieldsOrderChange?: (fieldsOrder: string[]) => void,
    defaultFieldsOrder?: string[],
    disableUserControl?: boolean,
    options?: {
        field: string,
        disableUserControl?: string,
    }
    dragLabelComponent?: ComponentType<DataGridColumnOrderingDragLabelProps>,
}

export const ColumnOrdering = (props: ColumnOrderingProps) => {

    return <></>
}
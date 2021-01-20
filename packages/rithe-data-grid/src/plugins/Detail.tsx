import React, { ComponentType } from "react";
import { DataGridDetailCellProps } from "../components/DataGridDetailCell";
import { DataGridDetailContentProps } from "../components/DataGridDetailContent";
import { DataGridDetailExpandButtonProps } from "../components/DataGridDetailExpandButton";
import { DataGridDetailRowProps } from "../components/DataGridDetailRow";
import { Row } from "../types/Row";
import { RowId } from "../types/RowId";

export interface DetailProps {
    expandedRowIds?: RowId[],
    onExpandedRowIdsChange?: (expandedRowIds: RowId[]) => void,
    defaultExpandedRowIds?: RowId[],
    getChildRows: (row: Row | null, allRows: Row[]) => Row[] | null,
    showExpandAll?: boolean,
    rowComponent?: ComponentType<DataGridDetailRowProps>,
    cellComponent?: ComponentType<DataGridDetailCellProps>,
    contentComponent?: ComponentType<DataGridDetailContentProps>,
    expandButtonComponent?: ComponentType<DataGridDetailExpandButtonProps>,
}

export const Detail = (props: DetailProps) => {

    return <></>
}
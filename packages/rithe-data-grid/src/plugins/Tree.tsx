import React, { ComponentType } from "react";
import { DataGridTreeCellProps } from "../components/DataGridTreeCell";
import { DataGridTreeExpandAllProps } from "../components/DataGridTreeExpandAll";
import { DataGridTreeExpandButtonProps } from "../components/DataGridTreeExpandButton";
import { DataGridTreeHeaderCellProps } from "../components/DataGridTreeHeaderCell";
import { DataGridTreeIndentProps } from "../components/DataGridTreeIndent";
import { Row } from "../types/Row";
import { RowId } from "../types/RowId";

export interface TreeProps {
    expandedRowIds?: RowId[],
    onExpandedRowIdsChange?: (expandedRowIds: RowId[]) => void,
    defaultExpandedRowIds?: RowId[],
    getChildRows: (row: Row | null, allRows: Row[]) => Row[] | null,
    showExpandAll?: boolean,
    headerCellComponent?: ComponentType<DataGridTreeHeaderCellProps>,
    cellComponent?: ComponentType<DataGridTreeCellProps>,
    indentComponent?: ComponentType<DataGridTreeIndentProps>,
    expandAllComponent?: ComponentType<DataGridTreeExpandAllProps>,
    expandButtonComponent?: ComponentType<DataGridTreeExpandButtonProps>,
}

export const Tree = (props: TreeProps) => {

    return <></>
}
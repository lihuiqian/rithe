import React, { ComponentType } from "react";
import { DataGridSelectionCellProps } from "../components/DataGridSelectionCell";
import { DataGridSelectionCheckboxProps } from "../components/DataGridSelectionCheckbox";
import { DataGridSelectionHeaderCellProps } from "../components/DataGridSelectionHeaderCell";
import { DataGridSelectionRowProps } from "../components/DataGridSelectionRow";
import { RowId } from "../types/RowId";

export interface SelectionProps {
    selectedRowIds?: RowId[],
    onSelectedRowIdsChange?: (selectedRowIds: RowId[]) => void,
    defaultSelectedRowIds?: RowId[],
    showSelectAll?: boolean,
    highlightSelectedRow?: boolean,
    selectByRowClick?: boolean,
    hideSelectionColumn?: boolean,
    disableUserControl?: boolean,
    rowComponent?: ComponentType<DataGridSelectionRowProps>,
    headerCellComponent?: ComponentType<DataGridSelectionHeaderCellProps>,
    cellComponent?: ComponentType<DataGridSelectionCellProps>,
    checkboxComponent?: ComponentType<DataGridSelectionCheckboxProps>,
}

export const Selection = (props: SelectionProps) => {

    return <></>
}
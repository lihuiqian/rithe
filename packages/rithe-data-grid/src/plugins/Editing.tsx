import React from "react";
import { Column } from "../types/Column";
import { HistoryStack } from "../types/HistoryStack";
import { Row } from "../types/Row";

export interface EditingProps {
    historyStack?: HistoryStack,
    onHistoryStackChange?: (historyStack: HistoryStack) => void,
    defaultHistoryStack?: HistoryStack,
    maxHistoryCount?: number,
    disableUndoRedo?: boolean,

    creatingRows?: Row[],
    onCreatingRowsChange?: (creatingRows: Row[]) => void,
    defaultCreatingRows?: Row[],
    onCreatingRowCommit?: (row: Row) => void,
    maxCreatingCount?: number,
    disableCreating?: boolean,

    modifyingRows?: Row[],
    onModifyingRowsChange?: (modifyingRows: Row[]) => void,
    defaultModifyingRows?: Row[],
    onModifyingRowCommit?: (row: Row) => void,
    maxModifyingCount?: number,
    disableModifying?: boolean,
    inlineEditing?: boolean,
    onCellValueChange?: (newValue: any, row: Row, column: Column) => void,

    onDeletingRowCommit?: (row: Row) => void,
}

export const Editing = (props: EditingProps) => {

    return <></>
}
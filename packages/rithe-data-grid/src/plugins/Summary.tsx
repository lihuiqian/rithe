import React, { ComponentType } from "react";
import { DataGridSummaryCellProps } from "../components/DataGridSummaryCell";
import { DataGridSummaryContentProps } from "../components/DataGridSummaryContent";
import { DataGridSummaryRowProps } from "../components/DataGridSummaryRow";
import { Row } from "../types/Row";
import { SummaryFunction } from "../types/SummaryFunction";

export interface SummaryProps {
    summaryOptions?: { field: string, summaryFunction: SummaryFunction | string, summarizer?: (valueRows: { value: any, row: Row }[]) => any }[],
    rowComponent?: ComponentType<DataGridSummaryRowProps>,
    cellComponent?: ComponentType<DataGridSummaryCellProps>,
    contentComponent?: ComponentType<DataGridSummaryContentProps>,
}

export const Summary = (props: SummaryProps) => {

    return <></>
}
import { Plugin } from "@rithe/plugin";
import { useMeasure } from "@rithe/utils";
import React, { ReactNode } from "react";
import { useDataGridTheme } from "../DataGridTheme";
import StatePipe from "../StatePipe";
import ColumnWidthAdjustment from "./ColumnWidthAdjustment";

interface TableLayoutProps {
    children: ReactNode | ReactNode[],
}

const TableLayout = ({ children }: TableLayoutProps) => {
    const { tableComponent: Table } = useDataGridTheme()

    const [ref, rect] = useMeasure<HTMLDivElement>()

    return <Plugin>
        <StatePipe name="tableWidth" value={rect?.width} />
        <ColumnWidthAdjustment />
        <div ref={ref}>
            <Table>
                {children}
            </Table>
        </div>
    </Plugin>
}

export type { TableLayoutProps };
export default TableLayout    
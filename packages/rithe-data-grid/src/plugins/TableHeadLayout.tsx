import { Plugin } from "@rithe/plugin";
import { iter } from "@rithe/utils";
import React from "react";
import { useDataGridTheme } from "../DataGridTheme";
import Category from "../types/Category";
import useStateSlice from "../useStateSlice";

interface TableHeadLayoutProps {
    categories?: Category[],
}

const TableHeadLayout = ({ categories }: TableHeadLayoutProps) => {
    const { tableHeadComponent: TableHead,
        tableHeadRowComponent: TableHeadRow,
        tableHeadCellComponent: TableHeadCell } = useDataGridTheme()

    const { dataTypes, displayColumns } = useStateSlice('dataTypes', 'displayColumns')
    const dataTypeMap = iter(dataTypes ?? []).asMap(dataType => [dataType.name, dataType]).value

    return <Plugin>
        <TableHead>
            <TableHeadRow>
                {displayColumns && displayColumns.map(column => {
                    const dataType = dataTypeMap.get(column.dataTypeName)
                    const Title = dataType?.titleComponent ?? 'span'
                    return <TableHeadCell key={column.field} style={{ width: column.width }}>
                        <Title title={column.title} dataType={dataType!} column={column} />
                    </TableHeadCell>
                })}
            </TableHeadRow>
        </TableHead>
    </Plugin>
}

export type { TableHeadLayoutProps as TableLayoutProps };
export default TableHeadLayout    
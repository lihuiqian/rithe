import { Plugin } from "@rithe/plugin";
import React, { ComponentType } from "react";
import { DataGridMenu, DataGridMenuProps } from "../components/DataGridMenu";
import { DataGridTableHeader, DataGridTableHeaderProps } from "../components/DataGridTableHeader";
import { DataGridTableHeaderCell, DataGridTableHeaderCellProps } from "../components/DataGridTableHeaderCell";
import { DataGridTableHeaderCellContent, DataGridTableHeaderCellContentProps } from "../components/DataGridTableHeaderCellContent";
import { DataGridTableHeaderRow, DataGridTableHeaderRowProps } from "../components/DataGridTableHeaderRow";
import { DataGridTitle, DataGridTitleProps } from "../components/DataGridTitle";
import { Render } from "../Render";
import { Template } from "../Template";
import { isHeaderCell, isHeaderContent, isHeaderRow } from "../utils/helpers";

export interface TableHeaderLayoutProps {
    headerComponent?: ComponentType<DataGridTableHeaderProps>,
    rowComponent?: ComponentType<DataGridTableHeaderRowProps>,
    cellComponent?: ComponentType<DataGridTableHeaderCellProps>,
    contentComponent?: ComponentType<DataGridTableHeaderCellContentProps>,
    titleComponent?: ComponentType<DataGridTitleProps>,
    menuComponent?: ComponentType<DataGridMenuProps>,
}

export const TableHeaderLayout = (props: TableHeaderLayoutProps) => {
    const {
        headerComponent: HeaderComponent = DataGridTableHeader,
        rowComponent: RowComponent = DataGridTableHeaderRow,
        cellComponent: CellComponent = DataGridTableHeaderCell,
        contentComponent: ContentComponent = DataGridTableHeaderCellContent,
        titleComponent: TitleComponent = DataGridTitle,
        menuComponent: MenuComponent = DataGridMenu,
    } = props

    return <Plugin>
        <Template name="tableHeader" stateNames={['tableHeaderRows']}>
            {(_, tableHeaderRows) =>
                <HeaderComponent>
                    {tableHeaderRows && tableHeaderRows.map(tableRow =>
                        <Render key={tableRow.key} name="row" props={{ tableRow }} />
                    )}
                </HeaderComponent>
            }
        </Template>
        <Template name="row" stateNames={['tableColumns']} predicate={({ tableRow }) => isHeaderRow(tableRow)}>
            {({ tableRow }, tableColumns) =>
                <RowComponent tableRow={tableRow}>
                    {tableColumns && tableColumns.map(tableColumn =>
                        <Render key={tableColumn.key} name="cell" props={{ tableColumn, tableRow }} />
                    )}
                </RowComponent>
            }
        </Template>
        <Template name="cell" predicate={({ tableColumn, tableRow }) => isHeaderCell(tableColumn, tableRow)}>
            {({ tableColumn, tableRow, colSpan, rowSpan }) =>
                <CellComponent
                    width={tableColumn.width ?? 120}
                    freeze={tableColumn.freeze}
                    freezePosition={0}
                    tableColumn={tableColumn}
                    tableRow={tableRow}
                    colSpan={colSpan}
                    rowSpan={rowSpan}
                >
                    <Render name="cellContent" props={{ tableColumn, tableRow }} />
                </CellComponent>
            }
        </Template>
        <Template name="cellContent" predicate={({ tableColumn, tableRow }) => isHeaderContent(tableColumn, tableRow)}>
            {({ tableColumn, tableRow }) => {
                const align = tableColumn.dataType?.align ?? 'start'
                const title = tableColumn.column?.title ?? ''

                return <ContentComponent tableColumn={tableColumn} tableRow={tableRow} align={align}>
                    <Render name="title" props={{ title, tableColumn, tableRow }} />
                    <Render name="menu" props={{ tableColumn }} />
                </ContentComponent>
            }}
        </Template>
        <Template name="title">
            {({ title }) =>
                <TitleComponent>
                    {title}
                </TitleComponent>
            }
        </Template>
        <Template name="menu" stateNames={['filters', 'sortings']}>
            {({ tableColumn }, filters, sortings) => {
                const field = tableColumn.column?.field
                const filter = filters && field ? filters.filter(filter => filter.field === field)[0]?.filter : undefined
                const sorting = sortings && field ? sortings.filter(sorting => sorting.field === field)[0]?.direction : undefined
                return <MenuComponent tableColumn={tableColumn} filter={filter} sorting={sorting}>
                    <Render name="menuItems" props={{ tableColumn }} />
                </MenuComponent>
            }}
        </Template>
        <Template name="menuItems">
            {() => <>A</>}
        </Template>
    </Plugin>
}
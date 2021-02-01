import { Plugin } from "@rithe/plugin";
import { Arrays } from "@rithe/utils";
import React, { ComponentType, useCallback } from "react";
import { DataGridBanding, DataGridBandingProps } from "../components/DataGridBanding";
import { DataGridBandingContent, DataGridBandingContentProps } from "../components/DataGridBandingContent";
import { DataGridMenu, DataGridMenuProps } from "../components/DataGridMenu";
import { DataGridBandingCell, DataGridBandingCellProps } from "../components/DataGridTableBandingCell";
import { DataGridTableHeaderContent, DataGridTableHeaderContentProps } from "../components/DataGridTableHeaderContent";
import { DataGridTitle, DataGridTitleProps } from "../components/DataGridTitle";
import { DataGridTableHeader, DataGridTableHeaderProps } from "../components/TableHeader";
import { DataGridTableHeaderCell, DataGridTableHeaderCellProps } from "../components/TableHeaderCell";
import { DataGridTableHeaderRow, DataGridTableHeaderRowProps } from "../components/TableHeaderRow";
import { Render } from "../Render";
import { Template } from "../Template";
import { Align } from "../types/Align";
import { Direction } from "../types/Direction";
import { FilterExpression } from "../types/FilterExpression";
import { FilterPredicate } from "../types/FilterPredicate";
import { TableColumn } from "../types/TableColumn";
import { TableRow } from "../types/TableRow";
import { HeaderCellProps, HeaderContentProps, HeaderRowProps, MenuProps, TitleProps } from "../types/TemplateBaseProps";
import { BAND_TYPE } from "../utils/constants";
import { isBandingCell, isBandingContent, isHeaderCell, isHeaderContent, isHeaderRow } from "../utils/helpers";

export interface TableHeaderLayoutProps {
    align?: Align | 'data',
    headerComponent?: ComponentType<DataGridTableHeaderProps>,
    rowComponent?: ComponentType<DataGridTableHeaderRowProps>,
    cellComponent?: ComponentType<DataGridTableHeaderCellProps>,
    contentComponent?: ComponentType<DataGridTableHeaderContentProps>,
    titleComponent?: ComponentType<DataGridTitleProps>,
    menuComponent?: ComponentType<DataGridMenuProps>,
    bandingCellComponent?: ComponentType<DataGridBandingCellProps>,
    bandingContentComponent?: ComponentType<DataGridBandingContentProps>,
    bandingComponent?: ComponentType<DataGridBandingProps>,
}

export const TableHeaderLayout = (props: TableHeaderLayoutProps) => {
    const {
        align = 'data',
        headerComponent: HeaderComponent = DataGridTableHeader,
        rowComponent: RowComponent = DataGridTableHeaderRow,
        cellComponent: CellComponent = DataGridTableHeaderCell,
        contentComponent: ContentComponent = DataGridTableHeaderContent,
        titleComponent: TitleComponent = DataGridTitle,
        menuComponent: MenuComponent = DataGridMenu,
        bandingCellComponent: BandingCellComponent = DataGridBandingCell,
        bandingContentComponent: BandingContentComponent = DataGridBandingContent,
        bandingComponent: BandingComponent = DataGridBanding,
    } = props

    const tableHeaderTemplate = useCallback((_: undefined, tableHeaderRows?: TableRow[]) => {
        let top = 0
        return <HeaderComponent>
            {tableHeaderRows && tableHeaderRows.map((tableRow, index) => {
                const { type: rowType, height, hidden } = tableRow
                top += height
                return hidden ? null : <Render key={tableRow.key} name="headerRow" props={{
                    index,
                    top: top - height,
                    height,
                    rowType,
                }} />
            })}
        </HeaderComponent>
    }, [HeaderComponent])

    const headerRowTemplate = useCallback((props: HeaderRowProps, tableColumns?: TableColumn[], tableHeaderRows?: TableRow[]) => {
        const { index: rowIndex, rowType } = props
        const rowCount = tableHeaderRows ? tableHeaderRows.length : 0
        const leftRecord: Record<number, number> = {}, rightRecord: Record<number, number> = {}
        let left = 0, right = 0
        tableColumns && tableColumns.forEach((tc, index) => {
            if (tc.freeze === 'start') {
                leftRecord[index] = left
                left += tc.width
            }
        })
        tableColumns && Arrays.reverse(tableColumns).forEach((tc, index) => {
            if (tc.freeze === 'end') {
                rightRecord[tableColumns.length - index - 1] = right
                right += tc.width
            }
        })
        return <RowComponent {...props}>
            {tableColumns && tableColumns.map((tableColumn, colIndex) => {
                const { type: colType, column, dataType, width, freeze } = tableColumn
                const freezePosition = freeze === 'start' ? leftRecord[colIndex] : freeze === 'end' ? rightRecord[colIndex] : 0
                if (!column) {
                    return rowIndex > 0 ? null : <Render
                        key={tableColumn.key}
                        name="headerCell"
                        props={{
                            title: '',
                            width,
                            colSpan: 1,
                            rowSpan: rowCount,
                            freeze,
                            freezePosition,
                            colType,
                            rowType,
                        }} />
                } else {
                    const categoryCount = column.categories?.length ?? 0
                    const category = getCategory(tableColumns, colIndex, rowIndex)
                    if (category === undefined) {
                        return rowIndex > categoryCount ? null : <Render
                            key={tableColumn.key}
                            name="headerCell"
                            props={{
                                title: column.title,
                                width,
                                colSpan: 1,
                                rowSpan: rowCount - categoryCount,
                                freeze,
                                freezePosition,
                                colType,
                                rowType,
                                columns: [column],
                                dataTypes: [dataType!],
                            }}
                        />
                    } else {
                        if (!category.merge) {
                            return <Render key={tableColumn.key} name="headerCell" props={{
                                title: category.value,
                                width,
                                colSpan: 1,
                                rowSpan: 1,
                                freeze,
                                freezePosition,
                                colType: BAND_TYPE,
                                rowType,
                                columns: [column],
                                dataTypes: [dataType!],
                            }} />
                        } else {
                            const prevCategory = getCategory(tableColumns, colIndex - 1, rowIndex)
                            if (prevCategory && prevCategory.merge && prevCategory.freeze === freeze && prevCategory.value === category.value) {
                                return null
                            } else {
                                let mergeCount = 1
                                for (let i = colIndex + 1; i < tableColumns.length; i++) {
                                    const nextCategory = getCategory(tableColumns, i, rowIndex)
                                    if (nextCategory && nextCategory.merge && nextCategory.value === category.value) mergeCount++
                                    else break
                                }
                                return <Render key={tableColumn.key} name="headerCell" props={{
                                    title: category.value,
                                    width: tableColumns.slice(colIndex, colIndex + mergeCount).map(tc => tc.width).reduce((a, b) => a + b, 0),
                                    colSpan: mergeCount,
                                    rowSpan: 1,
                                    freeze,
                                    freezePosition,
                                    colType,
                                    rowType,
                                    columns: tableColumns.slice(colIndex, colIndex + mergeCount).map(tc => tc.column!),
                                    dataTypes: tableColumns.slice(colIndex, colIndex + mergeCount).map(tc => tc.dataType!),
                                }} />
                            }
                        }
                    }
                }
            })}
        </RowComponent>
    }, [RowComponent])

    const headerCellTemplate = useCallback((props: HeaderCellProps) => {
        const { title, colType, rowType, columns, dataTypes } = props
        const cellAlign = align === 'data' ? (dataTypes![0].align ?? 'start') : align
        return <CellComponent  {...props}>
            <Render name="headerContent" props={{
                title,
                align: cellAlign,
                colType,
                rowType,
                columns,
                dataTypes,
            }} />
        </CellComponent>
    }, [CellComponent, align])

    const headerContentTemplate = useCallback((props: HeaderContentProps) => {
        const { title, colType, rowType, columns, dataTypes } = props
        const column = columns![0]
        const dataType = dataTypes![0]

        return <ContentComponent {...props}>
            <Render name="title" props={{
                title,
                colType,
                rowType,
            }} />
            {column && <Render name="menu" props={{
                column,
                dataType,
                colType,
                rowType,
            }} />}
        </ContentComponent>
    }, [ContentComponent])

    const titleTemplate = useCallback((props: TitleProps) => {
        const { title } = props
        return <TitleComponent>{title}</TitleComponent>
    }, [TitleComponent])

    const menuTemplate = useCallback((
        props: MenuProps,
        filters?: { field: string, filter: FilterExpression | FilterPredicate }[],
        sortings?: { field: string, direction: Direction }[],
    ) => {
        const { colType, rowType, column, dataType } = props
        const field = column?.field
        const filter = filters ? filters.find(filter => filter.field === field)?.filter : undefined
        const sorting = sortings ? sortings.find(sorting => sorting.field === field)?.direction : undefined
        return <MenuComponent
            column={column}
            dataType={dataType}
            colType={colType}
            rowType={rowType}
            filter={filter}
            sorting={sorting}
        >
            <Render name="menuItems" props={{
                column,
                dataType,
                colType,
                rowType,
            }} />
        </MenuComponent>
    }, [MenuComponent])

    const bandingCellTemplate = useCallback((props: HeaderCellProps) => {
        const { title, colType, rowType, columns, dataTypes } = props
        const cellAlign = align === 'data' ? 'start' : align
        return <BandingCellComponent  {...props}>
            <Render name="headerContent" props={{
                title,
                align: cellAlign,
                colType,
                rowType,
                columns,
                dataTypes,
            }} />
        </BandingCellComponent>
    }, [BandingCellComponent, align])

    const bandingContentTemplate = useCallback((props: HeaderContentProps) => {
        const { title, colType, rowType } = props

        return <BandingContentComponent {...props}>
            <Render name="title" props={{
                title,
                colType,
                rowType,
            }} />
        </BandingContentComponent>
    }, [BandingContentComponent])

    const bandingTemplate = useCallback((props: TitleProps) => {
        const { title } = props
        return <BandingComponent>{title}</BandingComponent>
    }, [BandingComponent])

    return <Plugin>
        <Template name="tableHeader" stateNames={['tableHeaderRows']}>
            {tableHeaderTemplate}
        </Template>
        <Template name="headerRow" stateNames={['tableColumns', 'tableHeaderRows']} predicate={({ rowType }) => isHeaderRow(rowType)}>
            {headerRowTemplate}
        </Template>
        <Template name="headerCell" predicate={({ colType, rowType }) => isHeaderCell(colType, rowType)}>
            {headerCellTemplate}
        </Template>
        <Template name="headerContent" predicate={({ colType, rowType }) => isHeaderContent(colType, rowType)}>
            {headerContentTemplate}
        </Template>
        <Template name="title">
            {titleTemplate}
        </Template>
        <Template name="menu" stateNames={['filters', 'sortings']}>
            {menuTemplate}
        </Template>
        <Template name="headerCell" predicate={({ colType, rowType }) => isBandingCell(colType, rowType)}>
            {bandingCellTemplate}
        </Template>
        <Template name="headerContent" predicate={({ colType, rowType }) => isBandingContent(colType, rowType)}>
            {bandingContentTemplate}
        </Template>
        <Template name="title">
            {bandingTemplate}
        </Template>
    </Plugin>
}

function getCategory(tableColumns: TableColumn[], colIndex: number, rowIndex: number) {
    const tableColumn = tableColumns[colIndex]
    const categories = tableColumn?.column?.categories
    const category = categories ? categories[rowIndex] : undefined
    const freeze = tableColumn.freeze
    return category === undefined ? undefined
        : typeof category === 'string' ? { value: category, freeze, merge: true } : { ...category, freeze }
}
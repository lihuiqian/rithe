import { Plugin } from "@rithe/plugin"
import { arrx } from "@rithe/utils"
import React, { ComponentType, ReactElement, useCallback } from "react"
import { DataGridBodyCell, DataGridBodyCellProps } from "../components/basic/DataGridBodyCell"
import { DataGridCategory, DataGridCategoryProps } from "../components/basic/DataGridCategory"
import { DataGridEditor, DataGridEditorProps } from "../components/basic/DataGridEditor"
import { DataGridFilter, DataGridFilterProps } from "../components/basic/DataGridFilter"
import { DataGridFormatter, DataGridFormatterProps } from "../components/basic/DataGridFormatter"
import { DataGridHeaderCell, DataGridHeaderCellProps } from "../components/basic/DataGridHeaderCell"
import { DataGridInlineEditor, DataGridInlineEditorProps } from "../components/basic/DataGridInlineEditor"
import { DataGridMenu, DataGridMenuProps } from "../components/basic/DataGridMenu"
import { DataGridTitle, DataGridTitleProps } from "../components/basic/DataGridTitle"
import { Render } from "../Render"
import { Template } from "../Template"
import { CellProps, ColumnFilterProps, DataProps } from "../TemplateBaseProps"
import { Align } from "../types/Align"
import { Direction } from "../types/Direction"
import { FilterExpression } from "../types/FilterExpression"
import { FilterPredicate } from "../types/FilterPredicate"
import { TableRow } from "../types/TableRow"
import { buildGetCellValue } from "../utils/buildGetCellValue"
import { DATA_TYPE } from "../utils/constants"
import { isCategoryCell, isDataCell, isTitleCell } from "../utils/helpers"

export interface DataTypeProviderProps {
    name: string,
    align?: Align,
    titleAlign?: Align,
    categoryAlign?: Align,
    TitleCell?: ComponentType<DataGridHeaderCellProps>,
    Title?: ComponentType<DataGridTitleProps>,
    MenuButton?: ComponentType<DataGridMenuProps>,
    CategoryCell?: ComponentType<DataGridHeaderCellProps>,
    Category?: ComponentType<DataGridCategoryProps>,
    DataCell?: ComponentType<DataGridBodyCellProps>,
    Formatter?: ComponentType<DataGridFormatterProps>,
    Editor?: ComponentType<DataGridEditorProps>,
    InlineEditor?: ComponentType<DataGridInlineEditorProps>,
    Filter?: ComponentType<DataGridFilterProps>,
}

export const DataTypeProvider = (props: DataTypeProviderProps) => {
    const {
        name,
        align = 'start',
        titleAlign = 'center',
        categoryAlign = 'center',
        TitleCell = DataGridHeaderCell,
        Title = DataGridTitle,
        MenuButton = DataGridMenu,
        CategoryCell = DataGridHeaderCell,
        Category = DataGridCategory,
        DataCell = DataGridBodyCell,
        Formatter = DataGridFormatter,
        Editor = DataGridEditor,
        InlineEditor = DataGridInlineEditor,
        Filter = DataGridFilter,
    } = props

    // Template Title Cell
    const isCurrentTitleCell = useCallback((props: CellProps) => isTitleCell(props) && props.tableColumns[0].column?.dataTypeName === name, [name])
    const titleCellTemplate = useCallback((props: CellProps, filters: Record<string, FilterExpression | FilterPredicate> = {}, sortings: { field: string, direction: Direction }[] = []) => {
        const { tableColumns: [tableColumn] } = props
        const title = tableColumn.column?.title ?? ''
        const field = tableColumn.field
        const expression = filters[field]
        const direction = sortings.find(sorting => sorting.field === field)?.direction
        const sortIndex = sortings.length <= 1 ? undefined : sortings.findIndex(sorting => sorting.field === field)
        return <TitleCell align={titleAlign} {...props}>
            <Title
                title={title}
                tableColumn={props.tableColumns[0]}
            />
            <MenuButton
                tableColumn={tableColumn}
                expression={expression}
                direction={direction}
                sortIndex={sortIndex}
            >
                {onClose => arrx(...(tableColumn.actions?.map(action => {
                    return <Render key={action} name="columnAction" props={{
                        actionName: action,
                        tableColumn,
                        onClose,
                    }} />
                }) ?? []),
                    <Render key="filter" name="columnFilter" props={{
                        display: false,
                        tableColumn,
                        setFilter: () => {/**/ },
                        onClose,
                    }} />
                )}
            </MenuButton>
        </TitleCell>
    }, [MenuButton, Title, TitleCell, titleAlign])

    // Template Category Cell
    const isCurrentCategoryCell = useCallback((props: CellProps) => isCategoryCell(props) && props.tableColumns[0].column?.dataTypeName === name, [name])
    const categoryCellTemplate = useCallback((props: CellProps, tableRows: TableRow[] = []) => {
        const index = tableRows.indexOf(props.tableRows[0])
        const categorySetting = props.tableColumns[0].column?.categories![index]
        const category = categorySetting ? categorySetting.value : ''
        return <CategoryCell align={categoryAlign} {...props}>
            <Category
                category={category}
                tableColumns={props.tableColumns}
            />
        </CategoryCell>
    }, [Category, CategoryCell, categoryAlign])

    // Template Data Cell
    const isCurrentDataCell = useCallback((props: CellProps) => isDataCell(props) && props.tableColumns[0].column?.dataTypeName === name, [name])
    const dataCellTemplate = useCallback((props: CellProps) => {
        const { tableColumns: [tableColumn], tableRows: [tableRow] } = props
        const column = tableColumn.column!, row = tableRow.row!
        const getCellValue = buildGetCellValue([column])
        const value = getCellValue(row, column.field)
        const setValue = emptySetValue
        return <DataCell align={align} {...props}>
            <Render name="data" props={{
                type: 'formatter',
                value,
                setValue,
                tableColumn,
                tableRow,
            }} />
        </DataCell>
    }, [DataCell, align])

    // Template Data
    const isCurrentData = useCallback((props: DataProps) => props.tableColumn.column?.dataTypeName === name, [name])
    const dataTemplate = useCallback((props: DataProps) => {
        const { type: displayType } = props
        if (displayType === 'inlineEditor') {
            return <InlineEditor {...props} />
        } else if (displayType === 'editor') {
            return <Editor {...props} />
        } else {
            return <Formatter {...props} />
        }
    }, [Editor, Formatter, InlineEditor])

    // Template Filter
    const isCurrentFilter = useCallback((props: ColumnFilterProps) => props.tableColumn.column?.dataTypeName === name, [name])
    const filterTemplate = useCallback((props: ColumnFilterProps, tableBodyRows: TableRow[] = []) => {
        const { tableColumn: { field, column }, filter, setFilter } = props
        const getCellValue = buildGetCellValue([column!])
        function recursion(tableRow: TableRow): any[] {
            const childValues = tableRow.childRows ? tableRow.childRows.flatMap(recursion) : undefined
            if (tableRow.type === DATA_TYPE) {
                const value = getCellValue(tableRow.row!, field)
                return childValues ? [value, ...childValues] : [value]
            } else {
                return childValues ?? []
            }
        }
        if (props.display) {
            const values = tableBodyRows.flatMap(recursion)
            return <Filter
                values={values}
                filter={filter}
                setFilter={setFilter}
            />
        } else {
            return null as unknown as ReactElement
        }
    }, [Filter])

    return <Plugin>
        {/* Title */}
        <Template name="cell" predicate={isCurrentTitleCell} stateNames={['filters', 'sortings']}>
            {titleCellTemplate}
        </Template>
        {/* Category */}
        <Template name="cell" predicate={isCurrentCategoryCell} stateNames={['tableHeaderRows']}>
            {categoryCellTemplate}
        </Template>
        {/* Data */}
        <Template name="cell" predicate={isCurrentDataCell}>
            {dataCellTemplate}
        </Template>
        <Template name="data" predicate={isCurrentData}>
            {dataTemplate}
        </Template>
        <Template name="columnFilter" predicate={isCurrentFilter} stateNames={['tableBodyRows']}>
            {filterTemplate}
        </Template>
    </Plugin >
}

function emptySetValue() {/**/ }
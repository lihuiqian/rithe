import { Plugin } from "@rithe/plugin";
import { Arrays, useMixed } from "@rithe/utils";
import React, { ComponentType, useCallback, useRef } from "react";
import { DataGridSearchInput, DataGridSearchInputProps } from "../components/searching/DataGridSearchInput";
import { useShallowColumnSettings } from "../hooks/useShallowColumnSettings";
import { Render } from "../Render";
import { State } from "../State";
import { Template } from "../Template";
import { Column } from "../types/Column";
import { RowId } from "../types/RowId";
import { SearchOperator } from "../types/SearchOperator";
import { TableRow } from "../types/TableRow";
import { buildGetCellValue } from "../utils/buildGetCellValue";
import { DATA_TYPE, GROUPING_TYPE } from "../utils/constants";
import { updateTableRow } from "../utils/updateTableRow";

interface ColumnSetting {
    disableSearch?: boolean,
    ignoreCase?: boolean,
    valueToString?: (value: any) => string,
    predicate?: (value: any, searchKey: string, ignoreCase?: boolean) => boolean,
}

export interface SearchingProps {
    value?: string,
    onValueChange?: (value: string) => void,
    defaultValue?: string,
    operator?: SearchOperator,
    onOperatorChange?: (operator: SearchOperator) => void,
    defaultOperator?: SearchOperator,
    disableUserControl?: boolean,
    ignoreCase?: boolean,
    columnSettings?: Record<string, ColumnSetting>,
    Input?: ComponentType<DataGridSearchInputProps>,
}

export const Searching = (props: SearchingProps) => {
    const {
        disableUserControl = false,
        ignoreCase = false,
        Input = DataGridSearchInput,
    } = props
    const [value, setValue] = useMixed(props.value, props.onValueChange, props.defaultValue, '')
    const [operator, setOperator] = useMixed(props.operator, props.onOperatorChange, props.defaultOperator, 'AND')
    const columnSettings = useShallowColumnSettings(props.columnSettings ?? {})

    // State tableBodyRows
    const tableBodyRowsCacheRef = useRef<Record<RowId, TableRow>>({})
    const tableBodyRowsComputed = useCallback((tableBodyRows: TableRow[] = [], columns: Column[] = []) => {
        if (value.trim() === '') return tableBodyRows

        const searchingColumns = columns.filter(({ field }) => !columnSettings[field]?.disableSearch)
        const getCellValue = buildGetCellValue(searchingColumns)
        const keyWords = Arrays.distinct(value.split(' ').map(keyWord => keyWord.trim()).filter(keyWord => keyWord))

        function filter(tableRow: TableRow): TableRow | undefined {
            const matches: Record<string, boolean> = {}
            const row = tableRow.row!
            searchingColumns.map(({ field }) => {
                const value = getCellValue(row, field)
                const fieldIgnoreCase = columnSettings[field]?.ignoreCase ?? ignoreCase
                const valueToString = columnSettings[field]?.valueToString ?? defaultValueToString
                const predicate = columnSettings[field]?.predicate ?? generateDefaultPredicate(valueToString)
                keyWords.forEach(keyWord => {
                    matches[keyWord] ||= predicate(value, keyWord, fieldIgnoreCase)
                })
            })
            const match = operator === 'AND'
                ? keyWords.map(keyWord => matches[keyWord]).reduce((a, b) => a && b, true)
                : keyWords.map(keyWord => matches[keyWord]).reduce((a, b) => a || b, false)
            return match ? tableRow : undefined
        }

        function recursion(tableRow: TableRow): TableRow | undefined {
            let childRows = tableRow.childRows
            childRows && (childRows = childRows.map(recursion).filter(v => v) as TableRow[])
            childRows?.length === 0 && (childRows = undefined)
            const updatedTableRow = updateTableRow(tableRow, {
                childRows,
            }, tableBodyRowsCacheRef.current)
            if (tableRow.type === DATA_TYPE) {
                return childRows && childRows[0].type === DATA_TYPE ? updatedTableRow : filter(updatedTableRow)
            } else if (tableRow.type === GROUPING_TYPE) {
                return childRows ? updatedTableRow : undefined
            } else {
                return updatedTableRow
            }
        }

        return tableBodyRows.map(recursion).filter(v => !!v) as TableRow[]
    }, [columnSettings, ignoreCase, operator, value])

    // Template toolbarItem
    const showToolbarItem = useCallback(() => !disableUserControl, [disableUserControl])
    const toolbarItemTemplate = useCallback(() => {
        return <>
            <Render />
            <Input
                value={value}
                setValue={setValue}
                operator={operator}
                setOperator={setOperator}
            />
        </>
    }, [Input, operator, setOperator, setValue, value])

    return <Plugin>
        <State name="tableBodyRows" computed={tableBodyRowsComputed} depNames={['columns']} />
        <Template name="toolbarItem" predicate={showToolbarItem}>
            {toolbarItemTemplate}
        </Template>
    </Plugin>
}

function defaultValueToString(value: any, ignoreCase?: boolean): string {
    if (value === null || value === undefined) return ''
    const stringValue = value.toString()
    return ignoreCase ? stringValue.toLocaleLowerCase() : stringValue
}

function generateDefaultPredicate(valueToString: (value: any, ignoreCase?: boolean) => string) {
    return function defaultPredicate(value: any, keyWord: string, ignoreCase?: boolean) {
        const stringValue = valueToString(value)
        return ignoreCase ? stringValue.toLocaleLowerCase().includes(keyWord.toLocaleLowerCase()) : stringValue.includes(keyWord)
    }
}

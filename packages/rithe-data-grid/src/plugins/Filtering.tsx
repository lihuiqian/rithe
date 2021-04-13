import { Plugin } from "@rithe/plugin";
import { Records, useMixed } from "@rithe/utils";
import React, { useCallback, useRef } from "react";
import { useShallowColumnSettings } from "../hooks/useShallowColumnSettings";
import { Render } from "../Render";
import { State } from "../State";
import { Template } from "../Template";
import { ColumnFilterProps } from "../TemplateBaseProps";
import { Column } from "../types/Column";
import { FilterExpression } from "../types/FilterExpression";
import { FilterPredicate } from "../types/FilterPredicate";
import { RowId } from "../types/RowId";
import { TableRow } from "../types/TableRow";
import { buildGetCellValue } from "../utils/buildGetCellValue";
import { DATA_TYPE, GROUPING_TYPE } from "../utils/constants";
import { updateTableRow } from "../utils/updateTableRow";

interface ColumnSetting {
    disableUserControl?: boolean
    predicate?: (value: any, filter: FilterExpression | FilterPredicate) => boolean,
}

export interface FilteringProps {
    filters?: Record<string, FilterExpression | FilterPredicate>,
    onFiltersChange?: (filters: Record<string, FilterExpression | FilterPredicate>) => void,
    defaultFilters?: Record<string, FilterExpression | FilterPredicate>,
    disableUserControl?: boolean,
    columnSettings?: Record<string, ColumnSetting>,
}

export const Filtering = (props: FilteringProps) => {
    const {
        disableUserControl = false,
    } = props
    const [filters, setFilters] = useMixed(props.filters, props.onFiltersChange, props.defaultFilters, {})
    const columnSettings = useShallowColumnSettings(props.columnSettings ?? {})

    // State tableBodyRows
    const tableBodyRowsCacheRef = useRef<Record<RowId, TableRow>>({})
    const tableBodyRowsComputed = useCallback((tableBodyRows: TableRow[] = [], columns: Column[] = []) => {
        if (Records.size(filters) === 0) return tableBodyRows
        const getCellValue = buildGetCellValue(columns)
        const getColumnPredicate = (field: string) => columnSettings[field]?.predicate ?? predicate

        function filter(tableRow: TableRow): TableRow | undefined {
            let match = true
            const row = tableRow.row!
            Records.forEach(filters, (filter, field) => {
                const value = getCellValue(row, field)
                const predicate = getColumnPredicate(field)
                match &&= predicate(value, filter)
            })
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

        return tableBodyRows.map(recursion).filter(v => v) as TableRow[]
    }, [columnSettings, filters])

    // Template columnAction
    const isColumnFilter = useCallback((props: ColumnFilterProps) => !disableUserControl && !columnSettings[props.tableColumn.field]?.disableUserControl && props.tableColumn.type === DATA_TYPE, [columnSettings, disableUserControl])
    const columnFilterTemplate = useCallback((props: ColumnFilterProps) => {
        const { tableColumn: { field } } = props
        const filter = filters[field]
        const setFilter = (filter?: FilterPredicate | FilterExpression) => {
            setFilters(filter ? { ...filters, [field]: filter } : Records.delete(filters, field))
        }
        return <Render override="columnFilter" props={{
            display: true,
            filter,
            setFilter,
        }} />
    }, [filters, setFilters])

    return <Plugin>
        <State name="filters" value={filters} />
        <State name="tableBodyRows" computed={tableBodyRowsComputed} depNames={['columns']} />
        <Template name="columnFilter" predicate={isColumnFilter}>
            {columnFilterTemplate}
        </Template>
    </Plugin>
}

function predicate(value: any, filter: FilterExpression | FilterPredicate) {
    if (filter instanceof Array) {
        return predicateExpression(value, filter as FilterExpression)
    } else {
        return predicatePredicate(value, filter as FilterPredicate)
    }
}

function predicateExpression(value: any, expression: FilterExpression) {
    const [predicate1, operator, predicate2] = expression
    if (operator === 'AND') {
        return predicatePredicate(value, predicate1) && predicatePredicate(value, predicate2)
    } else if (operator === 'OR') {
        return predicatePredicate(value, predicate1) || predicatePredicate(value, predicate2)
    } else if (operator === 'XOR') {
        return predicatePredicate(value, predicate1) !== predicatePredicate(value, predicate2)
    } else if (operator === 'NAND') {
        return !predicatePredicate(value, predicate1) || !predicatePredicate(value, predicate2)
    } else if (operator === 'NOR') {
        return !predicatePredicate(value, predicate1) && !predicatePredicate(value, predicate2)
    } else if (operator === 'XNOR') {
        return predicatePredicate(value, predicate1) === predicatePredicate(value, predicate2)
    } else {
        throw new Error(`Unknown operator ${operator}`)
    }
}

function predicatePredicate(value: any, predicate: FilterPredicate) {
    const { predicator, argument } = predicate
    if (argument === undefined || (argument instanceof Array && argument.length === 0)) return true
    if (predicator === 'IsEmpty') {
        return value === undefined
    } else if (predicator === 'IsNotEmpty') {
        return value !== undefined
    } else if (predicator === 'In') {
        return argument.indexOf(value) >= 0
    } else if (predicator === 'NotIn') {
        return argument.indexOf(value) < 0
    } else if (predicator === 'Equals') {
        return value === argument // TODO comparator
    } else if (predicator === 'NotEquals') {
        return value !== argument
    } else if (predicator === 'GreaterThan') {
        return value > argument
    } else if (predicator === 'GreaterThanOrEquals') {
        return value >= argument
    } else if (predicator === 'LessThan') {
        return value < argument
    } else if (predicator === 'LessThanOrEquals') {
        return value <= argument
    } else if (predicator === 'Contains') {
        return String(value ?? '').indexOf(String(argument)) >= 0
    } else if (predicator === 'NotContains') {
        return String(value ?? '').indexOf(String(argument)) < 0
    } else if (predicator === 'StartsWith') {
        return String(value ?? '').startsWith(String(argument))
    } else if (predicator === 'NotStartsWith') {
        return !String(value ?? '').startsWith(String(argument))
    } else if (predicator === 'EndsWith') {
        return String(value ?? '').endsWith(String(argument))
    } else if (predicator === 'NotEndsWith') {
        return !String(value ?? '').endsWith(String(argument))
    } else {
        throw new Error(`Unknown predicator ${predicator}`)
    }
}
import { Comparator, Comparators } from "@rithe/utils"
import React, { createContext, ForwardRefExoticComponent, HTMLAttributes, ReactNode, TableHTMLAttributes, TdHTMLAttributes, ThHTMLAttributes, useCallback, useContext, useMemo } from "react"
import Align from "./types/Align"
import { DataTypeInfer } from "./types/DataType"
import FilterPredicate from "./types/FilterPredicate"
import FilterPredicator from "./types/FilterPredicator"
import Formatter from "./types/Formatter"

interface DataGridTheme {
    tableComponent: ForwardRefExoticComponent<TableHTMLAttributes<HTMLTableElement>> | 'table',
    tableHeadComponent: ForwardRefExoticComponent<HTMLAttributes<HTMLTableSectionElement>> | 'thead',
    tableHeadRowComponent: ForwardRefExoticComponent<HTMLAttributes<HTMLTableRowElement>> | 'tr',
    tableHeadCellComponent: ForwardRefExoticComponent<ThHTMLAttributes<HTMLTableHeaderCellElement>> | 'th',
    tableBodyComponent: ForwardRefExoticComponent<HTMLAttributes<HTMLTableSectionElement>> | 'tbody',
    tableBodyRowComponent: ForwardRefExoticComponent<HTMLAttributes<HTMLTableRowElement>> | 'tr',
    tableBodyCellComponent: ForwardRefExoticComponent<TdHTMLAttributes<HTMLTableDataCellElement>> | 'td',
    tableFootComponent: ForwardRefExoticComponent<HTMLAttributes<HTMLTableSectionElement>> | 'tfoot',
    tableFootRowComponent: ForwardRefExoticComponent<HTMLAttributes<HTMLTableRowElement>> | 'tr',
    tableFootCellComponent: ForwardRefExoticComponent<TdHTMLAttributes<HTMLTableDataCellElement>> | 'td',
    typographyComponent: ForwardRefExoticComponent<HTMLAttributes<HTMLSpanElement>> | 'span',
    align: <T extends keyof DataTypeInfer>(type: T) => Align,
    formatter: <T extends keyof DataTypeInfer>(type: T) => Formatter<T>,
    comparator: <T extends keyof DataTypeInfer>(type: T) => Comparator<DataTypeInfer[T]>,
    predicates: <T extends keyof DataTypeInfer>(type: T) => Partial<{ [predicator in FilterPredicator]: FilterPredicate }>,
}

const ThemeContext = createContext<DataGridTheme>(undefined as any)

const useDataGridTheme = () => useContext(ThemeContext)

const DataGridThemeProvider = ({ children }: { children: ReactNode | ReactNode[] }) => {
    const align = useCallback(<T extends keyof DataTypeInfer>(type: T) => {
        if (type === 'code') {
            return 'center'
        } else if (type === 'number' || type === 'bigint') {
            return 'end'
        } else {
            return 'start'
        }
    }, [])

    const formatter = useCallback(<T extends keyof DataTypeInfer>(type: T) => {
        return (value: DataTypeInfer[T] | undefined) => {
            if (value === undefined) return ''
            return String(value)
        }
    }, [])

    const comparator = useCallback(<T extends keyof DataTypeInfer>(type: T) => {
        return Comparators.NATUAL_ORDER
    }, [])

    const predicates = useCallback(<T extends keyof DataTypeInfer>(type: T) => {
        return {}
    }, [])

    const theme = useMemo<DataGridTheme>(() => ({
        tableComponent: 'table',
        tableHeadComponent: 'thead',
        tableHeadRowComponent: 'tr',
        tableHeadCellComponent: 'th',
        tableBodyComponent: 'tbody',
        tableBodyRowComponent: 'tr',
        tableBodyCellComponent: 'td',
        tableFootComponent: 'tfoot',
        tableFootRowComponent: 'tr',
        tableFootCellComponent: 'td',
        typographyComponent: 'span',
        align,
        formatter,
        comparator,
        predicates,
    }), [align, comparator, formatter, predicates])

    return <ThemeContext.Provider value={theme}>
        {children}
    </ThemeContext.Provider>
}

export { useDataGridTheme, DataGridThemeProvider }


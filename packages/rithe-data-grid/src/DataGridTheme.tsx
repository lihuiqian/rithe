import React, { ComponentType, createContext, HTMLAttributes, ReactNode, TableHTMLAttributes, TdHTMLAttributes, ThHTMLAttributes, useContext } from "react"

export interface DataGridTheme {
    containerComponent: ComponentType<HTMLAttributes<HTMLDivElement>> | 'div',
    tableComponent: ComponentType<TableHTMLAttributes<HTMLTableElement>> | 'table',
    tableHeadComponent: ComponentType<HTMLAttributes<HTMLTableSectionElement>> | 'thead',
    tableHeadRowComponent: ComponentType<HTMLAttributes<HTMLTableRowElement>> | 'tr',
    tableHeadCellComponent: ComponentType<ThHTMLAttributes<HTMLTableHeaderCellElement>> | 'th',
    tableBodyComponent: ComponentType<HTMLAttributes<HTMLTableSectionElement>> | 'tbody',
    tableBodyRowComponent: ComponentType<HTMLAttributes<HTMLTableRowElement>> | 'tr',
    tableBodyCellComponent: ComponentType<TdHTMLAttributes<HTMLTableDataCellElement>> | 'td',
    tableFootComponent: ComponentType<HTMLAttributes<HTMLTableSectionElement>> | 'tfoot',
    tableFootRowComponent: ComponentType<HTMLAttributes<HTMLTableRowElement>> | 'tr',
    tableFootCellComponent: ComponentType<TdHTMLAttributes<HTMLTableDataCellElement>> | 'td',
    typographyComponent: ComponentType<HTMLAttributes<HTMLSpanElement>> | 'span',
}

const defaultTheme: DataGridTheme = {
    containerComponent: 'div',
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
}

const ThemeContext = createContext<DataGridTheme>(defaultTheme)

export const useDataGridTheme = () => useContext(ThemeContext)

export const DataGridThemeProvider = ({ value, children }: { value: DataGridTheme, children: ReactNode | ReactNode[] }) => {
    return <ThemeContext.Provider value={value}>
        {children}
    </ThemeContext.Provider>
}


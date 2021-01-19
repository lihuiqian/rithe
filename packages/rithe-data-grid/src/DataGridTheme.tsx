import React, { createContext, ForwardRefExoticComponent, HTMLAttributes, ReactNode, TableHTMLAttributes, TdHTMLAttributes, ThHTMLAttributes, useContext } from "react"

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
}

const defaultTheme: DataGridTheme = {
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

const useDataGridTheme = () => useContext(ThemeContext)

const DataGridThemeProvider = ({ value, children }: { value: DataGridTheme, children: ReactNode | ReactNode[] }) => {
    return <ThemeContext.Provider value={value}>
        {children}
    </ThemeContext.Provider>
}

export { useDataGridTheme, DataGridThemeProvider }

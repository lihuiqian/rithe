import React, { createContext, ForwardRefExoticComponent, HTMLAttributes, ReactNode, TableHTMLAttributes, TdHTMLAttributes, ThHTMLAttributes, useContext, useMemo } from "react"

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
}

const ThemeContext = createContext<DataGridTheme>(undefined as any)

const useDataGridTheme = () => useContext(ThemeContext)

const DataGridThemeProvider = ({ children }: { children: ReactNode | ReactNode[] }) => {
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
    }), [])

    return <ThemeContext.Provider value={theme}>
        <th></th>
        <td></td>
        {children}
        <thead></thead>
    </ThemeContext.Provider>
}

export { useDataGridTheme, DataGridThemeProvider }


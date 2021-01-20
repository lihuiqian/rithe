import React, { createContext, ReactNode, useContext } from "react"

export interface DataGridMessages {
    noData: string,
    noColumns: string,
    noGrouping: string,
    count: string,
    sum: string,
    max: string,
    min: string,
    avg: string,
}

const defaultMessages: DataGridMessages = {
    noData: 'No Data',
    noColumns: 'No Columns',
    noGrouping: 'No Grouping Column',
    count: 'Count',
    sum: 'Sum',
    max: 'Max',
    min: 'Min',
    avg: 'Avg',

}

const MessagesContext = createContext<DataGridMessages>(defaultMessages)

export const useDataGridMessages = () => useContext(MessagesContext)

export const DataGridMessagesProvider = ({ value, children }: { value: DataGridMessages, children: ReactNode | ReactNode[] }) => {
    return <MessagesContext.Provider value={value}>
        {children}
    </MessagesContext.Provider>
}

import { PluginHost } from "@rithe/plugin"
import React, { ReactNode, useMemo } from 'react'
import useDataType from "./hooks/useDataType"
import DataTypeProvider from "./plugins/DataTypeProvider"

const DataGrid = ({ children }: { children: ReactNode | ReactNode[] }) => {
    const dataTypes = useDataTypes()

    return <PluginHost>
        <DataTypeProvider dataTypes={dataTypes} />
        {children}
    </PluginHost>
}

const useDataTypes = () => {
    const unknownDataType = useDataType('unknown', 'unknown')
    const stringDataType = useDataType('string', 'string')
    const numberDataType = useDataType('number', 'number')
    const bigintDataType = useDataType('bigint', 'bigint')
    const booleanDataType = useDataType('boolean', 'boolean')
    const dateDataType = useDataType('date', 'date')
    const timeDataType = useDataType('time', 'time')
    const datetimeDataType = useDataType('datetime', 'datetime')
    const codeDataType = useDataType('code', 'code')
    const arrayDataType = useDataType('array', 'array')
    const objectDataType = useDataType('object', 'object')
    return useMemo(() => [
        unknownDataType,
        stringDataType,
        numberDataType,
        bigintDataType,
        booleanDataType,
        dateDataType,
        timeDataType,
        datetimeDataType,
        codeDataType,
        arrayDataType,
        objectDataType,
    ], [arrayDataType, bigintDataType, booleanDataType, codeDataType, dateDataType, datetimeDataType, numberDataType, objectDataType, stringDataType, timeDataType, unknownDataType])
}

export default DataGrid


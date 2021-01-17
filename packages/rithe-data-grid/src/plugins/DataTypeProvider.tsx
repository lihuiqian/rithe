import { Plugin } from "@rithe/plugin";
import { iter } from "@rithe/utils";
import React, { useCallback } from "react";
import { StatePipe } from "../State";
import DataType from "../types/DataType";

interface DataTypeProviderProps {
    dataTypes: DataType<any>[],
}

const DataTypeProvider = ({ dataTypes }: DataTypeProviderProps) => {
    const computedDataTypes = useComputedDataTypes(dataTypes)

    return <Plugin>
        <StatePipe name="dataTypes" computed={computedDataTypes} />
    </Plugin>
}

const useComputedDataTypes = (dataTypes: DataType<any>[]) => {
    return useCallback((prevDataTypes?: DataType<any>[]) => {
        if (!prevDataTypes) return dataTypes
        return iter(prevDataTypes ?? [])
            .asMap(dt => [dt.name, dt])
            .concat(iter(dataTypes)
                .asMap(dt => [dt.name, dt])
                .value)
            .asArray(([, dataType]) => dataType)
            .value
    }, [dataTypes])
}

export { DataTypeProviderProps, DataTypeProvider };


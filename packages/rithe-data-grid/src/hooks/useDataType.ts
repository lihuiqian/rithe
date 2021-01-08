import { useMemo } from "react";
import DataGridFormatter from "../components/DataGridFormatter";
import DataGridTitle from "../components/DataGridTitle";
import { useDataGridTheme } from "../DataGridTheme";
import DataType, { DataTypeInfer } from "../types/DataType";

function useDataType<T extends keyof DataTypeInfer>(type: T, name: string, overrides?: Partial<Omit<DataType<T>, 'type' | 'name'>>) {
    const { align, formatter, comparator, predicates } = useDataGridTheme()


    return useMemo(() => ({
        type,
        name,
        align: align(type),
        formatter: formatter(type),
        comparator: comparator(type),
        predicates: predicates(type),
        titleComponent: DataGridTitle,
        filterComponents: undefined as any, // TODO
        formatterComponent: DataGridFormatter,
        editorComponent: undefined as any, // TODO
        ...overrides,
    }), [align, comparator, formatter, name, overrides, predicates, type])
}

export default useDataType
import { Comparators, useShallow } from "@rithe/utils";
import { useCallback, useMemo } from "react";
import { DataGridFormatter } from "../components/DataGridFormatter";
import { DataGridTitle } from "../components/DataGridTitle";
import DataType, { DataTypeInfer } from "../types/DataType";

function useDataType<T extends keyof DataTypeInfer>(type: T, name: string, overrides?: Partial<Omit<DataType<T>, 'type' | 'name'>>): DataType<T> {
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

    const shallowOverrides = useShallow(overrides ?? {})
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
        ...shallowOverrides,
    }), [align, comparator, formatter, name, shallowOverrides, predicates, type])
}

export default useDataType
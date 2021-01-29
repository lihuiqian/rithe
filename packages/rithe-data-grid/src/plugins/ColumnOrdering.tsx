import { Plugin } from "@rithe/plugin";
import { Arrays, Comparators, Draggable, Droppable, useMixed } from "@rithe/utils";
import React, { ComponentType, useCallback, useRef } from "react";
import { DataGridColumnOrderingDragLabel, DataGridColumnOrderingDragLabelProps } from "../components/DataGridColumnOrderingDragLabel";
import { Render } from "../Render";
import { State } from "../State";
import { Template } from "../Template";
import { TableColumn } from "../types/TableColumn";
import { isBandingContent, isHeaderContent } from "../utils/helpers";


export interface ColumnOrderingProps {
    fieldsOrder?: string[],
    onFieldsOrderChange?: (fieldsOrder: string[]) => void,
    defaultFieldsOrder?: string[],
    disableUserControl?: boolean,
    options?: {
        field: string,
        disableUserControl?: string,
    }
    dragLabelComponent?: ComponentType<DataGridColumnOrderingDragLabelProps>,
}

export const ColumnOrdering = (props: ColumnOrderingProps) => {
    const {
        disableUserControl,
        options,
        dragLabelComponent: DragLabelComponent = DataGridColumnOrderingDragLabel,
    } = props
    console.log('ColumnOrdering')
    const [fieldsOrder, setFieldsOrder] = useMixed(props.fieldsOrder, props.onFieldsOrderChange, props.defaultFieldsOrder)

    const tableColumnsComputed = useTableColumnsComputed(fieldsOrder)

    const ref = useRef(0)
    return <Plugin>
        <State name="tableColumns" computed={tableColumnsComputed} />
        <Template name="table">
            {() => {
                return <Droppable
                    onOver={(coordinate) => { console.log('over', coordinate) }}
                    onLeave={() => {/** */ }}
                    onDrop={() => {
                        setFieldsOrder(ref.current % 2 === 1 ? ['b', 'a'] : ['a', 'b'])
                        ref.current++
                    }}
                >
                    <div>
                        <Render />
                    </div>
                </Droppable>
            }}
        </Template>
        <Template name="cellContent" predicate={(({ tableColumn, tableRow }) => isHeaderContent(tableColumn, tableRow) || isBandingContent(tableColumn, tableRow))}>
            {() => {
                return <Draggable
                    payload={null}
                    onMove={(coordinate) => { console.log('move', coordinate) }}
                >
                    <div>
                        <Render />
                    </div>
                </Draggable>
            }}
        </Template>
    </Plugin>
}

const useTableColumnsComputed = (fieldsOrder?: string[]) => {
    return useCallback((tableColumns?: TableColumn[]) => {
        if (!tableColumns
            || tableColumns.length === 0
            || !fieldsOrder
            || fieldsOrder.length === 0) return tableColumns

        const allFields = tableColumns.map(tc => tc.column?.field).filter(f => f !== undefined)
        if (Arrays.intersection(allFields, fieldsOrder).length === 0) return tableColumns

        return Arrays.sort(tableColumns, Comparators.compare(tc => fieldsOrder.indexOf(tc.column?.field ?? ''), Comparators.natualOrder()))
    }, [fieldsOrder])
}
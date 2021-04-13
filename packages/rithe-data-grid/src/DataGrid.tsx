import MomentUtils from "@date-io/moment"
import { MuiPickersUtilsProvider } from "@material-ui/pickers"
import { PluginHost } from "@rithe/plugin"
import { Arrays, DragDropProvider } from "@rithe/utils"
import React, { ComponentType, ReactNode, useCallback, useRef } from 'react'
import { DataGridContainer, DataGridContainerProps } from "./components/basic/DataGridContainer"
import { Render } from "./Render"
import { State } from "./State"
import { Template } from "./Template"
import { TableColumn } from "./types/TableColumn"
import { updateTableColumn } from "./utils/updateTableColumn"

export interface DataGridProps {
    Container?: ComponentType<DataGridContainerProps>,
    children?: ReactNode | ReactNode[]
}

export const DataGrid = (props: DataGridProps) => {
    const {
        // eslint-disable-next-line react/prop-types
        Container = DataGridContainer,
        // eslint-disable-next-line react/prop-types
        children,
    } = props

    // Template rootTemplate
    const rootTemplate = useCallback(() => {
        return <Container>
            <Render name="toolbar" />
            <Render name="table" />
            <Render name="pagination" />
        </Container>
    }, [Container])

    // State tableColumns, set freezeOffset
    const tableColumnsCacheRef = useRef<Record<string, TableColumn>>({})
    const tableColumnsOffsetComputed = useCallback((tableColumns: TableColumn[] = []) => {
        let offsetStart = 0, offsetEnd = 0
        const count = tableColumns.length
        const offsets = Arrays.repeat(undefined, count) as (number | undefined)[]
        for (let i = 0; i < count; i++) {
            if (tableColumns[i].freezePosition === 'start') {
                offsets[i] = offsetStart
                offsetStart += tableColumns[i].width
            }
        }
        for (let i = count - 1; i >= 0; i--) {
            if (tableColumns[i].freezePosition === 'end') {
                offsets[i] = offsetEnd
                offsetEnd += tableColumns[i].width
            }
        }
        return tableColumns.map((tableColumn, index) => {
            if (tableColumn.freezePosition) {
                return updateTableColumn(tableColumn, {
                    freezeOffset: offsets[index],
                }, tableColumnsCacheRef.current)
            } else {
                return tableColumn
            }
        })
    }, [])

    return <DragDropProvider>
        <MuiPickersUtilsProvider utils={MomentUtils} locale={'en-US'}>
            <PluginHost>
                <Template name="root">
                    {rootTemplate}
                </Template>
                {children}
                <State name="tableColumns" computed={tableColumnsOffsetComputed} />
                <Render name="root" />
            </PluginHost>
        </MuiPickersUtilsProvider>
    </DragDropProvider>
}
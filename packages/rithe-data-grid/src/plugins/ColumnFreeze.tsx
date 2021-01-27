import { Plugin, Render } from "@rithe/plugin";
import { Arrays, Records, useMixed } from "@rithe/utils";
import React, { ComponentType, useCallback } from "react";
import { DataGridColumnFreezeControl, DataGridColumnFreezeControlProps } from "../components/DataGridColumnFreezeControl";
import { DataGridColumnFreezeIcon, DataGridColumnFreezeIconProps } from "../components/DataGridColumnFreezeIcon";
import { DataGridMenuItem, DataGridMenuItemProps } from "../components/DataGridMenuItem";
import { State } from "../State";
import { Template } from "../Template";
import { Freeze } from "../types/Freeze";
import { TableColumn } from "../types/TableColumn";

export interface ColumnFreezeProps {
    freezeColumns?: { field: string, freeze: Freeze }[],
    onFreezeColumnsChange?: (freezeColumns: { field: string, freeze: Freeze }[]) => void,
    defaultFreezeColumns?: { field: string, freeze: Freeze }[],
    disableUserControl?: boolean,
    options?: {
        field: string,
        disableUserControl?: boolean,
    }[],
    menuItemComponent?: ComponentType<DataGridMenuItemProps>,
    iconComponent?: ComponentType<DataGridColumnFreezeIconProps>,
    controlComponent?: ComponentType<DataGridColumnFreezeControlProps>,
}

export const ColumnFreeze = (props: ColumnFreezeProps) => {
    const {
        disableUserControl,
        options,
        menuItemComponent: MenuItemComponent = DataGridMenuItem,
        iconComponent: IconComponent = DataGridColumnFreezeIcon,
        controlComponent: ControlComponent = DataGridColumnFreezeControl,
    } = props
    const [freezeColumns, setFreezeColumns] = useMixed(props.freezeColumns, props.onFreezeColumnsChange, props.defaultFreezeColumns)
    const setFreeze = useCallback((field: string, freeze?: Freeze) => {
        const freezeRecord = Records.from((freezeColumns ?? []).map(fc => [fc.field, fc.freeze]))
        if (!freeze && freezeRecord[field]) {
            setFreezeColumns((freezeColumns!).filter(fc => fc.field !== field))
        } else if (freeze && freezeRecord[field] && freezeRecord[field] !== freeze) {
            setFreezeColumns((freezeColumns!).map(fc => fc.field === field ? { ...fc, freeze } : fc))
        } else if (freeze && !freezeRecord[field]) {
            setFreezeColumns(freezeColumns ? [...freezeColumns, { field, freeze }] : [{ field, freeze }])
        }
    }, [freezeColumns, setFreezeColumns])

    const tableColumnsComputed = useTableColumnsComputed(freezeColumns)

    return <Plugin>
        <State name="tableColumns" computed={tableColumnsComputed} />
        <Template name="menuItems">
            {({ tableColumn }) => {
                const field = tableColumn.column?.field
                if (disableUserControl || field === undefined) return <Render />

                const optionRecord = Records.from((options ?? []).map(o => [o.field, o.disableUserControl]))
                if (optionRecord[field]) return <Render />

                const freezeRecord = Records.from((freezeColumns ?? []).map(fc => [fc.field, fc.freeze]))
                const freeze = freezeRecord[field]

                return <>
                    <Render />
                    <MenuItemComponent icon={<IconComponent freeze={freeze} />}>
                        <ControlComponent field={field} freeze={freeze} setFreeze={setFreeze} />
                    </MenuItemComponent>
                </>
            }}
        </Template>
    </Plugin>
}

const useTableColumnsComputed = (freezeColumns?: { field: string, freeze: Freeze }[]) => {
    return useCallback((tableColumns?: TableColumn[]) => {
        if (!tableColumns
            || tableColumns.length === 0
            || !freezeColumns
            || freezeColumns.length === 0) return tableColumns

        const allFields = tableColumns.map(tc => tc.column?.field).filter(f => f !== undefined)
        const freezeFields = freezeColumns.map(fc => fc.field)
        if (Arrays.intersection(allFields, freezeFields).length === 0) return tableColumns

        const freezeRecord = Records.from(freezeColumns.map(fc => [fc.field, fc.freeze]))
        return tableColumns.map(tc => {
            const field = tc.column?.field
            if (field === undefined) return tc
            const freeze = freezeRecord[field]
            if (freeze === undefined) return tc
            return { ...tc, freeze }
        })
    }, [freezeColumns])
}
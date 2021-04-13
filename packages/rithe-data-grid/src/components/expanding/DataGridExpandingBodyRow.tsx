import { Records } from "@rithe/utils";
import React from "react";
import { DataGridBodyRow, DataGridBodyRowProps } from "../basic/DataGridBodyRow";

export interface DataGridExpandingBodyRowProps extends DataGridBodyRowProps {
    expand?: () => void,
}

export const DataGridExpandingBodyRow = (props: DataGridExpandingBodyRowProps) => {
    const { expand, onClick } = props
    const inheritProps: any = Records.delete(props as any, 'expand', 'onClick')

    return <DataGridBodyRow
        onClick={e => {
            expand && expand()
            onClick && onClick(e)
        }}
        {...inheritProps}
    />
}

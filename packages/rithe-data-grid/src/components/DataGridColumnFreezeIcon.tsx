import React from "react";
import { Freeze } from "../types/Freeze";

export interface DataGridColumnFreezeIconProps {
    freeze?: Freeze,
}

export const DataGridColumnFreezeIcon = (props: DataGridColumnFreezeIconProps) => {
    const { freeze } = props
    return <div>{freeze === 'start' ? 'S' : freeze === 'end' ? 'E' : 'F'}</div>
}
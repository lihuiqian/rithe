import React from "react";
import { Freeze } from "../types/Freeze";

export interface DataGridColumnFreezeControlProps {
    field: string,
    freeze?: Freeze,
    setFreeze: (field: string, freeze?: Freeze) => void,
}

export const DataGridColumnFreezeControl = (props: DataGridColumnFreezeControlProps) => {
    const { field, freeze, setFreeze } = props
    return <div>
        <button onClick={() => setFreeze(field, 'start')} style={{ color: freeze === 'start' ? 'red' : 'black' }}>Start</button>
        <button onClick={() => setFreeze(field)} style={{ color: !freeze ? 'red' : 'black' }}>None</button>
        <button onClick={() => setFreeze(field, 'end')} style={{ color: freeze === 'end' ? 'red' : 'black' }}>End</button>
    </div>
}
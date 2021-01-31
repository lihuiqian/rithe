import React, { CSSProperties, useCallback, useMemo } from "react";
import { Freeze } from "../types/Freeze";

export interface DataGridColumnFreezeControlProps {
    field: string,
    freeze?: Freeze,
    setFreeze: (field: string, freeze?: Freeze) => void,
}

export const DataGridColumnFreezeControl = (props: DataGridColumnFreezeControlProps) => {
    const { field, freeze, setFreeze } = props
    const onFreezeStart = useCallback(() => setFreeze(field, 'start'), [field, setFreeze])
    const onNoFreeze = useCallback(() => setFreeze(field), [field, setFreeze])
    const onFreezeEnd = useCallback(() => setFreeze(field, 'end'), [field, setFreeze])

    const styles = useStyles()
    return <div>
        <button onClick={onFreezeStart} style={freeze === 'start' ? styles.active : styles.inactive}>Start</button>
        <button onClick={onNoFreeze} style={freeze === undefined ? styles.active : styles.inactive}>None</button>
        <button onClick={onFreezeEnd} style={freeze === 'end' ? styles.active : styles.inactive}>End</button>
    </div>
}

const useStyles = () => useMemo<Record<string, CSSProperties>>(() => ({
    active: {
        color: 'red',
    },
    inactive: {
    },
}), [])
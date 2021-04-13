import { Column } from "./Column";
import { FreezePosition } from "./FreezePosition";

export interface TableColumn {
    type: symbol,
    column?: Column,
    field: string,
    width: number,
    freezePosition?: FreezePosition,
    freezeOffset?: number,
    actions?: string[],
}
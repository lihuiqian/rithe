import { Column } from "./Column";
import { DataType } from "./DataType";
import { Freeze } from "./Freeze";

export interface TableColumn {
    key: string,
    type: symbol,
    column?: Column,
    dataType?: DataType,
    width: number,
    freeze?: Freeze,
}
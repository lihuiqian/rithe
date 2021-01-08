import Column from "./Column";
import DataType, { DataTypeInfer } from "./DataType";
import Row from "./Row";
import RowId from "./RowId";

type Formatter<T extends keyof DataTypeInfer> = (value: DataTypeInfer[T] | undefined, dataType: DataType<T>, column: Column, rowId: RowId, row: Row) => string

export default Formatter
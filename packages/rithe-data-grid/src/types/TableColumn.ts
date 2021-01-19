import Column from "./Column";
import DataType from "./DataType";
import Fixed from "./Fixed";

export interface TableColumn {
    key: string,
    type: symbol,
    column?: Column,
    dataType?: DataType<any>,
    width?: number,
    fixed?: Fixed,
}
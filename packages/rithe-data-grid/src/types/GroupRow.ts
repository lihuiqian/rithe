import { Row } from "./Row";

export interface GroupRow extends Row {
    group: any[],
    expanded: boolean,
}
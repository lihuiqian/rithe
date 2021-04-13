import { FilterExpression } from "../../types/FilterExpression";
import { FilterPredicate } from "../../types/FilterPredicate";

export interface DataGridFilterProps {
    values: any[],
    filter?: FilterExpression | FilterPredicate,
    setFilter: (filter?: FilterExpression | FilterPredicate) => void,
}

export const DataGridFilter = () => {
    return null
}
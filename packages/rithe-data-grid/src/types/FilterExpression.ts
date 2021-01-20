import { FilterOperator } from "./FilterOperator"
import { FilterPredicate } from "./FilterPredicate"

export type FilterExpression = [FilterPredicate, FilterOperator, FilterPredicate]
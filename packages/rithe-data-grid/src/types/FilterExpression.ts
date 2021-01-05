import FilterOperator from "./FilterOperator"
import FilterPredicate from "./FilterPredicate"

type FilterExpression = [FilterPredicate, FilterOperator, FilterPredicate]
export default FilterExpression
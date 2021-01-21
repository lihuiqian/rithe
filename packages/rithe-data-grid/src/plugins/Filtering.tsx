import React, { ComponentType } from "react";
import { DataGridSearchInputProps } from "../components/DataGridSearchInput";
import { FilterExpression } from "../types/FilterExpression";
import { FilterPredicate } from "../types/FilterPredicate";

export interface FilteringProps {
    filters?: (FilterExpression | FilterPredicate)[],
    onFiltersChange?: (filters: (FilterExpression | FilterPredicate)[]) => void,
    defaultFilters?: (FilterExpression | FilterPredicate)[],
    disableUserControl?: boolean,
    options?: {
        field: string,
        disableUserControl?: string,
    }
    inputComponent?: ComponentType<DataGridSearchInputProps>,
}

export const Filtering = (props: FilteringProps) => {

    return <></>
}
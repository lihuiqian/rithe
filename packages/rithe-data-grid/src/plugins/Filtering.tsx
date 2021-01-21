import React, { ComponentType } from "react";
import { DataGridFilteringMenuItemProps } from "../components/DataGridFilteringMenuItem";
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
    menuItemComponent?: ComponentType<DataGridFilteringMenuItemProps>,
}

export const Filtering = (props: FilteringProps) => {

    return <></>
}
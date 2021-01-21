import React, { ComponentType } from "react";
import { DataGridSearchInputProps } from "../components/DataGridSearchInput";

export interface SearchingProps {
    value?: string[],
    onValueChange?: (value: string) => void,
    defaultValue?: string,
    disableUserControl?: boolean,
    inputComponent?: ComponentType<DataGridSearchInputProps>,
}

export const Searching = (props: SearchingProps) => {

    return <></>
}
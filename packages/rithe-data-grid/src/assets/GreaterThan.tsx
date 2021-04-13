import { SvgIcon, SvgIconProps } from "@material-ui/core";
import React from "react";

export const GreaterThan = (props: SvgIconProps) => {
    return <SvgIcon {...props}>
        <path d="M6 7v2l9 3l-9 3v2l12 -4v-2l-12 -4z" />
    </SvgIcon>
}
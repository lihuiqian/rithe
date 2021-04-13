import { SvgIcon, SvgIconProps } from "@material-ui/core";
import React from "react";

export const LessThan = (props: SvgIconProps) => {
    return <SvgIcon {...props}>
        <path d="M18 7v2l-9 3l9 3v2l-12 -4v-2l12 -4z" />
    </SvgIcon>
}
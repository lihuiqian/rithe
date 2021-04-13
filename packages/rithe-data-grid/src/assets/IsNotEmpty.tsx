import { SvgIcon, SvgIconProps } from "@material-ui/core";
import React from "react";

export const IsNotEmpty = (props: SvgIconProps) => {
    return <SvgIcon {...props}>
        <text x={1} y={14} fontSize={10}>ABC</text>
        <path d="M1 16h19v2h-19v-2z" />
    </SvgIcon>
}
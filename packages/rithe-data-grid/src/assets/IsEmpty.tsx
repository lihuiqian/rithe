import { SvgIcon, SvgIconProps } from "@material-ui/core";
import React from "react";

export const IsEmpty = (props: SvgIconProps) => {
    return <SvgIcon {...props}>
        <path d="M1 7h19v8h-19v-6h2v4h15v-4h-17v-2z" />
        <path d="M1 16h19v2h-19v-2z" />
    </SvgIcon>
}
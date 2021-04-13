import { SvgIcon, SvgIconProps } from "@material-ui/core";
import React from "react";

export const LessThanOrEquals = (props: SvgIconProps) => {
    return <SvgIcon {...props}>
        <path d="M18 5v2l-9 3l9 3v2l-12 -4v-2l12 -4zM18 17v2l-12 -4v-2l12 4z" />
    </SvgIcon>
}
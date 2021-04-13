import { SvgIcon, SvgIconProps } from "@material-ui/core";
import React from "react";

export const Progress = (props: SvgIconProps) => {
    return <SvgIcon {...props}>
        <path d="m2,8l20,0l0,8l-20,0l0,-7l13,0l0,6l6,0l0,-6l-19,0l0,-1z" />
    </SvgIcon>
}
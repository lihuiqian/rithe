import { SvgIcon, SvgIconProps } from "@material-ui/core";
import React from "react";

export const Filter = (props: SvgIconProps) => {
    return <SvgIcon {...props}>
        <path d="m6,6l0,1l4,4l0,7l4,0l0,-7l4,-4l0,-1z" />
    </SvgIcon>
}
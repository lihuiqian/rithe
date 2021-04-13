import { SvgIcon, SvgIconProps } from "@material-ui/core";
import React from "react";

export const ZtoA = (props: SvgIconProps) => {
    return <SvgIcon {...props}>
        <text x={4} y={10} fontSize={10} fontWeight="bold">Z</text>
        <text x={4} y={20} fill="blue" fontSize={10} fontWeight="bold">A</text>
        <path d="m15,4l0,14l-3,-3l-1,1l4,4l1.5,0l4,-4l-1,-1l-3,3l0,-14z" />
    </SvgIcon>
}
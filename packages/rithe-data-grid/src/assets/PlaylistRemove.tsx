import { SvgIcon, SvgIconProps } from "@material-ui/core";
import React from "react";

export const PlaylistRemove = (props: SvgIconProps) => {
    return <SvgIcon {...props}>
        <path d="M2 6v2h12v-2h-12z" />
        <path d="M2 10v2h8v-2h-8z" />
        <path d="M2 14v2h8v-2h-8z" />
        <path d="M13.41 10l-1.41 1.41l3.59 3.59l-3.59 3.59l1.41 1.41l3.59 -3.59l3.59 3.59l1.41 -1.41l-3.59 -3.59l3.59 -3.59l-1.41 -1.41l-3.59 3.59l-3.59 -3.59z" />
    </SvgIcon>
}
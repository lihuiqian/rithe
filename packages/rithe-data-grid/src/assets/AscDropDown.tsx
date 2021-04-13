import { ArrowDropDown, ArrowRightAlt } from "@material-ui/icons";
import React from "react";

export const AscDropDown = () => {
    return <>
        <ArrowDropDown style={{ transform: 'translate(-15%, 15%) scale(0.6)' }} />
        <ArrowRightAlt style={{ position: 'absolute', transform: 'translate(15%, 0) rotate(-90deg) scale(0.8)' }} />
    </>
}
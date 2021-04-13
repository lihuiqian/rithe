import { ArrowRightAlt } from "@material-ui/icons";
import React from "react";
import { Filter } from "./Filter";

export const DescFilter = () => {
    return <>
        <ArrowRightAlt style={{ transform: 'translate(-20%, 0) rotate(90deg) scale(0.60)' }} />
        <Filter style={{ position: 'absolute', transform: 'translate(10%, 0) scale(0.8)' }} />
    </>
}
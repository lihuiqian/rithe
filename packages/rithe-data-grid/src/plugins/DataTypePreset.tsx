import { Plugin } from "@rithe/plugin"
import React from "react"
import { BigintTypeProvider } from "./dataTypes/BigintTypeProvider"
import { DateTimeTypeProvider } from "./dataTypes/DateTimeTypeProvider"
import { DateTypeProvider } from "./dataTypes/DateTypeProvider"
import { NumberTypeProvider } from "./dataTypes/NumberTypeProvider"
import { StringTypeProvider } from "./dataTypes/StringTypeProvider"
import { TimeTypeProvider } from "./dataTypes/TimeTypeProvider"

export const DataTypePreset = () => {
    return <Plugin>
        <StringTypeProvider name="string" />
        <NumberTypeProvider name="number" />
        <BigintTypeProvider name="bigint" />
        <DateTypeProvider name="date" />
        <TimeTypeProvider name="time" />
        <DateTimeTypeProvider name="datetime" />
    </Plugin>
}
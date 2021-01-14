import React, { ReactNode } from "react";
import { PluginIndexer } from "./internal/PluginIndexer";

export const Plugin = ({ children }: { children: ReactNode | ReactNode[] }) => {
    return <PluginIndexer>
        {children}
    </PluginIndexer>
}
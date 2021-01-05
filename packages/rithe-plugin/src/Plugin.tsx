import React, { ReactNode } from "react";
import PluginIndexer from "./internal/PluginIndexer";

const Plugin = ({ children }: { children: ReactNode | ReactNode[] }) => {
    return <PluginIndexer>
        {children}
    </PluginIndexer>
}

export default Plugin
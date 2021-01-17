import React, { ReactNode } from "react";
import { PositionIndexer } from "./internal/PositionIndexer";

export const Plugin = ({ children }: { children: ReactNode | ReactNode[] }) => {
    return <PositionIndexer>
        {children}
    </PositionIndexer>
}
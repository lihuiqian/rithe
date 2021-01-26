import React, { createContext, ReactNode, useContext, useRef } from "react";

export interface DragDropCoordinate {
    clientX: number,
    clientY: number,
    pageX: number,
    pageY: number,
    screenX: number,
    screenY: number,
}

export type DragDropType = 'drag' | 'move' | 'drop'

export type DragDropNext = (type: DragDropType, coordinate: DragDropCoordinate, payload: any) => void

export class DragDropObserver {

    private _payload: any | null
    private _subscribers: DragDropNext[]

    constructor() {
        this._payload = null
        this._subscribers = []
    }

    start(coordinate: DragDropCoordinate, payload: any) {
        this._payload = payload
        this._publish('drag', coordinate)
    }

    move(coordinate: DragDropCoordinate) {
        this._publish('move', coordinate)
    }

    end(coordinate: DragDropCoordinate) {
        this._publish('drop', coordinate)
    }

    private _publish(type: DragDropType, coordinate: DragDropCoordinate) {
        const payload = this._payload
        this._subscribers.forEach(next => {
            next(type, coordinate, payload)
        })
    }

    subscribe(next: DragDropNext) {
        this._subscribers.push(next)
    }

    unsubscribe(next: DragDropNext) {
        const index = this._subscribers.findIndex(subscriber => subscriber === next)
        index >= 0 && this._subscribers.splice(index, 1)
    }
}

export const DragDropContext = createContext<DragDropObserver>(new DragDropObserver())

export const useDragDropObserver = () => useContext(DragDropContext)

export const DragDropProvider = ({ children }: { children: ReactNode | ReactNode[] }) => {
    const ref = useRef(new DragDropObserver())
    return <DragDropContext.Provider value={ref.current}>
        {children}
    </DragDropContext.Provider>
}
import React, { createContext, ReactNode, useContext, useRef } from "react";

export interface DragDropEvent {
    clientX: number,
    clientY: number,
    pageX: number,
    pageY: number,
    screenX: number,
    screenY: number,
    deltaX: number,
    deltaY: number,
    altKey: boolean,
    ctrlKey: boolean,
    metaKey: boolean,
    shiftKey: boolean,
    target: EventTarget | null,
    sourceTarget: EventTarget | null,
    sourceRect: DOMRect,
}

export type DragDropType = 'drag' | 'move' | 'drop'

export type DragDropNext = (type: DragDropType, event: DragDropEvent, payload: any) => void

export class DragDropObserver {

    private _payload: any | null
    private _subscribers: DragDropNext[]

    constructor() {
        this._payload = null
        this._subscribers = []
    }

    start(event: DragDropEvent, payload: any) {
        this._payload = payload
        this._publish('drag', event)
    }

    move(event: DragDropEvent) {
        this._publish('move', event)
    }

    end(event: DragDropEvent) {
        this._publish('drop', event)
    }

    private _publish(type: DragDropType, event: DragDropEvent) {
        const payload = this._payload
        this._subscribers.forEach(next => {
            next(type, event, payload)
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
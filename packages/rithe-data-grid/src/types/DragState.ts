import { EventTypes, FullGestureState, StateKey } from "react-use-gesture/dist/types";

export type DragState = Omit<FullGestureState<StateKey<'drag'>>, 'event'> & { event: EventTypes['drag'] } & { rect?: DOMRect, initialRect: DOMRect }

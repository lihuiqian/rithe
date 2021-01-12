import { EventTypes, FullGestureState, StateKey } from "react-use-gesture/dist/types";

type DragState = Omit<FullGestureState<StateKey<'drag'>>, 'event'> & { event: EventTypes['drag'] } & { rect?: DOMRect, initialRect: DOMRect }
export default DragState
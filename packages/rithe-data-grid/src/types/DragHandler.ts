import { EventTypes, FullGestureState, StateKey } from "react-use-gesture/dist/types";

type DragHandler = (state: Omit<FullGestureState<StateKey<'drag'>>, 'event'> & { event: EventTypes['drag'] } & { initialRect: DOMRect }) => void
export default DragHandler
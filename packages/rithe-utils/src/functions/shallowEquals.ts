import Objects from "../base/Objects"
import Arrays from "../collect/Arrays"

function shallowEquals(a: unknown, b: unknown) {
    if (Object.is(a, b)) return true
    if (a instanceof Array && b instanceof Array) {
        return Arrays.shallowEquals(a, b)
    } else if (a instanceof Object && b instanceof Object) {
        return Objects.shallowEquals(a, b)
    }
    return false
}

export default shallowEquals
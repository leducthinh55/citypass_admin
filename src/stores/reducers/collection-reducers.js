import { COMMON } from "src/constants";
const initState = {
    collections: [[]]
}
const authReducer = (state = initState, action) => {
    switch (action.type) {
        case COMMON.CREATE_COLLECTION:
            return {
                ...state,
            }
        default:
            return state
    }
}
export default authReducer
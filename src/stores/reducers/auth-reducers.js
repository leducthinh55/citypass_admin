import { COMMON } from "src/constants";
const initState = {
    authError: null
}
const authReducer = (state = initState, action) => {
    switch (action.type) {
        case COMMON.LOGIN_ERROR:
            console.log("login fail");
            return {
                ...state,
                authError: 'Login Failed'
            }
        case COMMON.LOGIN_SUCCESS:
            console.log("login success");
            return {
                ...state,
                authError: null
            }
        case COMMON.LOGOUT_SUCCESS:
            console.log("logout success");
            return state
        default:
            return state
    }
}
export default authReducer
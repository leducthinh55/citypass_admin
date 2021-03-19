import { COMMON } from 'src/constants'
export const createCollection = (collection) => {
    return (dispatch) =>
        dispatch({ type: COMMON.CREATE_COLLECTION, collection })
}
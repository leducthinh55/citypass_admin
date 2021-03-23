import { COMMON } from 'src/constants'
export const signIn = (credentials) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then((res) => {
            const currentUser = firebase.auth().currentUser;
            currentUser.getIdTokenResult().then(idTokenResult => {
                console.log(idTokenResult);
                currentUser.admin = idTokenResult.claims.admin;
                if (!currentUser.admin) {
                    console.log('is not admin');
                    firebase.auth().signOut()
                }
            });
            dispatch({ type: COMMON.LOGIN_SUCCESS });
        }).catch((err) => {
            dispatch({ type: COMMON.LOGIN_ERROR });
        })
    }
}

export const signOut = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        firebase.auth().signOut()
            .then(
                () => dispatch({ type: COMMON.LOGOUT_SUCCESS })
            )
            .catch(
                () => dispatch({ type: COMMON.LOGOUT_ERROR })
            )
    }
}
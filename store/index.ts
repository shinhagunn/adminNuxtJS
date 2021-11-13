import auth from "types"
export const state = () => ({
    user: null,
    pass: null,
    authenticated: true
})

export const mutations = {
    setUser(state: auth, user: string) {
        state.user = user;
    },
    setPass(state: auth, pass: string) {
        state.pass = pass;
    },
    isLogin(state: auth) {
        state.authenticated = true;
    },
    getStatusLogin(state: auth) {
        return state.authenticated;
    }
}
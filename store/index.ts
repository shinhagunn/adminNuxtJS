import auth from 'types/index'

export const state = () => ({
    user: null,
    pass: null,
    authenticated: false
  })
  
export const mutations = {
    setUser(state: auth, name: string){
        state.user = name; 
    },

    setPass(state: auth, pass: string){
        state.pass = pass; 
    },
    isLogin(state: auth) {
        state.authenticated = !state.authenticated;
    }
}
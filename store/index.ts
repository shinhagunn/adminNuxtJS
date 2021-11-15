import auth, { UserState } from '@/types/index'
import { UserRole } from '@/types/index'

export const state = () => ({
    id: null,
    uid: null,
    fullname: null,
    lastname: null,
    email: null,
    state: null,
    role: null
  })
  
export const mutations = {
    setId(state: auth, id: number){
        state.id = id; 
    },

    setUid(state: auth, uid: string){
        state.uid = uid; 
    },

    setFullname(state: auth, fullname: string){
        state.fullname = fullname; 
    },

    setLastname(state: auth, fullname: string){
        state.fullname = fullname; 
    },

    setEmail(state: auth, email: string){
        state.email = email; 
    },

    setState(state: auth, x: UserState){
        state.state = x; 
    },

    setRole(state: auth, role: UserRole){
        state.role = role; 
    }
}
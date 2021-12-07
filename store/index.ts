import { User, UserState, UserRole } from '@/types/index'

export const state = () => ({
    id: null,
    uid: null,
    first_name: null,
    last_name: null,
    email: null,
    state: null,
    role: null,
    bio: null,
    created_at: null,
    updated_at: null,
    getLogged: false,
    isReload: true
})
  
export const mutations = {
    setId(state: User, id: number){
        state.id = id; 
    },

    setUid(state: User, uid: string){
        state.uid = uid; 
    },

    setFirstname(state: User, first_name: string){
        state.first_name = first_name; 
    },

    setLastname(state: User, last_name: string){
        state.last_name = last_name; 
    },

    setEmail(state: User, email: string){
        state.email = email; 
    },

    setState(state: User, x: UserState){
        state.state = x; 
    },

    setRole(state: User, role: UserRole){
        state.role = role; 
    },
    
    setBio(state: User, bio: string){
        state.bio = bio; 
    },

    setCreatedAt(state: User, created_at: string){
        state.created_at = created_at; 
    },

    setUpdatedAt(state: User, updated_at: string){
        state.updated_at = updated_at; 
    },

    setLogged(state: any, value: Boolean){
        state.getLogged = value; 
    },

    setReload(state: any, value: Boolean){
        state.isReload = value; 
    },
}
import { Context } from "@nuxt/types";

export default async function ({ store, $axios } : Context) {
    try {
        const { data } = await $axios.get('http://localhost:3000/api/v2/resource/users/me');
        store.commit('setId', data.id);
        store.commit('setUid', data.uid);
        store.commit('setFirstname', data.first_name);
        store.commit('setLastname', data.last_name);
        store.commit('setState', data.state);
        store.commit('setEmail', data.email);
        store.commit('setRole', data.role);
        store.commit('setBio', data.bio);
        store.commit('setCreatedAt', data.created_at);
        store.commit('setUpdatedAt', data.updated_at);
    }
    catch (error){
        return error;
    }
    
}


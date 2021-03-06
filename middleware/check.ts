import { Context } from "@nuxt/types";
import ApiClient from "@/library/ApiClient";
import ZNotification from "@/library/z-notification"

export default async function ({ store, $axios } : Context) {
    try {
        if(!store.state.getLogged && store.state.isReload) {
            const { data } = await new ApiClient($axios).get('resource/users/me');
            
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
            store.commit('setLogged', true);
            store.commit('setReload', false);
            
            if (store.state.role !== 'admin') {
                await  new ApiClient($axios).delete('identity/session');
                store.commit('setId', null);
                store.commit('setUid', null);
                store.commit('setFirstname', null);
                store.commit('setLastname', null);
                store.commit('setState', null);
                store.commit('setEmail', null);
                store.commit('setRole', null);
                store.commit('setBio', null);
                store.commit('setCreatedAt', null);
                store.commit('setUpdatedAt', null);
                store.commit('setLogged', false);
                store.commit('setReload', true);

                ZNotification.error({
                    title: "Error",
                    description: "User must be admin"
                })
            } else {
                ZNotification.success({
                    title: "Success",
                    description: "Login successfully"
                })
            }
        } else {
            store.commit('setReload', true);
        }
    }
    catch (error){
        store.commit('setId', null);
        store.commit('setUid', null);
        store.commit('setFirstname', null);
        store.commit('setLastname', null);
        store.commit('setState', null);
        store.commit('setEmail', null);
        store.commit('setRole', null);
        store.commit('setBio', null);
        store.commit('setCreatedAt', null);
        store.commit('setUpdatedAt', null);
        store.commit('setLogged', false);
        store.commit('setReload', true);
        return error;
    }
    
}


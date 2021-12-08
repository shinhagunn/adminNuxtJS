import { Context } from "@nuxt/types";

export default function ({ store, redirect}: Context) {
  if(store.state.role === null) {
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

    return redirect('/login');
  } 
}


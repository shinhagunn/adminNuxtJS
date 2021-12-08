import { Context } from "@nuxt/types";
import ApiClient from "@/library/ApiClient";
import ZNotification from "@/library/z-notification"

export default async function ({ store, redirect, $axios }: Context) {
  if(store.state.role !== 'admin') {
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
    return redirect('/dashboard/login');
  }
}


import { Context } from "@nuxt/types";

export default function ({ store, redirect }: Context) {
  if(store.state.role === 'admin') {
      return redirect('/dashboard');
  }
}


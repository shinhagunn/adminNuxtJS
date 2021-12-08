import { Context } from "@nuxt/types";

export default function ({ redirect }: Context) {
  return redirect('/dashboard/login');
}


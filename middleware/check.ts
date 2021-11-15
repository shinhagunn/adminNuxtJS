import { Context } from "@nuxt/types";

export default async function ({ store, redirect, $axios } : Context) {
    try {
        const { data } = await $axios.get('http://localhost:3000/api/v2/resource/users/me');
        console.log('success');
        if (data.state != null) {
            return redirect('/admin')
          }
    }
    catch (error){
        console.log('error');
        console.log(error);
        return error;
    }
}


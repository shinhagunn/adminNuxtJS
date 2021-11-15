export default function ({ store, redirect }) {
  if(store.state.state == null) {
      return redirect('/');
  }
}


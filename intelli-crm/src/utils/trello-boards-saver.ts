export default function localStorageSaver(store: any): void {
  store.subscribe((mutation: any, state: any): void => {
    localStorage.setItem('columns', JSON.stringify(state.columns))
  })
}
export function uuid():string {
  return Math.random().toString(16).slice(2)
}

export function localStorageSaver(store: any): void {
  store.subscribe((mutation: any, state: any): void => {
    localStorage.setItem('columns', JSON.stringify(state.columns))
  })
}
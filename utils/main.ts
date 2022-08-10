export const viewsPlus = (id: any): void => {
    if (typeof window == 'object') {
        let get: string = window.localStorage.getItem('@contacts') as string
        let plus = JSON.parse(get)
        if (plus.hasOwnProperty(id)) {
            plus[id]++
        } else {
            plus[id] = 1
        }
        window.localStorage.setItem('@contacts', JSON.stringify(plus))
    }
}

export const viewsplus = (id: any): void => {
    if (typeof window == 'object') {
        let get: string = window.localStorage.getItem('@contacts') as string
        get = JSON.parse(get)
    }
}

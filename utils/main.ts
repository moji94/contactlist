export const viewsPlus = (id: any): void => {
    if (typeof window == 'object') {
        let get: string = window.localStorage.getItem('@contacts') as string
        let plus = JSON.parse(get)
        if (plus.hasOwnProperty(id)) {
            plus[id]++
        } else {
            plus[id] = 1
        }

        //         let sortable = [];
        // for (var vehicle in maxSpeed) {
        //     sortable.push([vehicle, maxSpeed[vehicle]]);
        // }

        // sortable.sort(function(a, b) {
        //     return a[1] - b[1];
        // });

        window.localStorage.setItem('@contacts', JSON.stringify(plus))
    }
}

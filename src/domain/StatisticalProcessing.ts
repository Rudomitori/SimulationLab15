export function processe(N:number, T:number, x0:number, f :(x:number) => [number, number]) : number[] {
    let ns: number[] = []

    for (let i = 0; i < N; i++) {
        let t = 0;
        let x = x0;
        while (t < T) {
            let [x_next, dur] = f(x);
            t += dur
            x = x_next
        }
        if (ns[x] === undefined) ns[x] = 1
        else ns[x]++
    }

    let sum = 0
    for (let x of ns) sum += x
    ns.forEach((_, i, arr) => arr[i] /= sum)

    return ns
}


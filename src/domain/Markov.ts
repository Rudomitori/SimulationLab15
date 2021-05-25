export function getNextState(x:number): [number, number] {
    let Q = [
        [-0.4, 0.3, 0.1],
        [0.4, -0.8, 0.4],
        [0.1, 0.4, -0.5]
    ]
    let t = Math.log(Math.random()) / Q[x][x]

    let a = Math.random()
    let i = -1;
    while (a > 0) {
        i++
        a -= i !== x
            ? -Q[x][i]/Q[x][x]
            : 0
    }
    return [i, t]
}
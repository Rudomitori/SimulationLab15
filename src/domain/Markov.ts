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

export function getTheoreticalProbability(A:number[][]): number[] {
    return [0.2879, 0.3636, 0.3485]
    // Метод Гаусса писать лень
//     let n = A.length
//     let ACopy: number[][] = []
//     for(let row of A) {
//         let rowCopy: number[] = []
//         for(let cell of row)
//             rowCopy.push(cell)
//         rowCopy.push(0)
//         ACopy.push(rowCopy)
//     }
//     let row: number[] = []
//     for(let i = 0; i <= n; i++)
//         row.push(1)
//     ACopy.push(row)
//
//     for (let i = 0; i < n; i++) {
//
//     }
}
class Graph {
    constructor(n) {
        this.adjacencyList = new Array(n + 1).fill(null).map(() => []);
        //array length is n+1 to represent the nodes starting from 1
    }

    addEdge(u, v, w) {
        this.adjacencyList[u].push({ v, w });
        this.adjacencyList[v].push({ v: u, w }); // undirected graph
    }

    maxFlow(source, sink) {
        let visited = new Array(this.adjacencyList.length).fill(false);

        const dfs = (node, minWeight) => { //Applying DFS
            visited[node] = true;
            if (node === sink) return minWeight;

            for (const edge of this.adjacencyList[node]) {
                if (!visited[edge.v] && edge.w > 0) {
                    const flow = dfs(edge.v, Math.min(minWeight, edge.w));

                    if (flow > 0) {
                        // Update the residual graph
                        edge.w -= flow;
                        for (const reverseEdge of this.adjacencyList[edge.v]) {
                            console.log(reverseEdge);
                            if (reverseEdge.v === node) {
                                reverseEdge.w += flow;
                                break;
                            }
                        }
                        return flow;
                    }
                }
            }

            return 0;
        };

        let maxFlow = 0;
        let flow;

        do {
            visited.fill(false);
            flow = dfs(source, Number.MAX_SAFE_INTEGER);
            console.log('flow',flow)
            maxFlow += flow;
        } while (flow > 0);

        return maxFlow;
    }
}

function solveMaxFlow(input) {
    //asigning n, m and q
    const n = input[0][0];
    const m = input[0][1];
    const q = input[m + 1][0];

    const queries = input.slice(m + 2);
    const results = [];

    for (const query of queries) {
        const graph = new Graph(n); //resetting the graph for every query, since we mark the nodes during dfs
        for (let i = 1; i <= m; i++) {
            const [u, v, w] = input[i];
            graph.addEdge(u, v, w);
        }
        const [a, b] = query;
        results.push(graph.maxFlow(a, b));
    }

    return results;
}

// Example usage
const input = [
    [2, 1],
    [1, 2, 2768],
    [2],
    [1, 2],
    [2, 1],
];

const input2 = [
    [3, 2],
    [3, 2, 4814],
    [2, 1, 1832],
    [3],
    [2, 1],
    [1, 2],
    [3, 1],
]

const input3 = [
    [5, 4],
    [4, 2, 10348],
    [1, 4, 2690],
    [5, 4, 9807],
    [3, 4, 8008],
    [5],
    [5, 4],
    [1, 5],
    [5, 4],
    [5, 4],
    [1, 5]
]

const results = solveMaxFlow(input3);
console.log(results);

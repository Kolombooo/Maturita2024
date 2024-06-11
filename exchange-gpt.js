function findShortestCurrencyPath(exchangeRates, startCurrency, targetCurrency) {
    // Build the graph from exchange rates
    const graph = new Map();

    // Populate the graph with adjacency lists
    exchangeRates.forEach(([from, to]) => {
        if (!graph.has(from)) {
            graph.set(from, []); // Initialize adjacency list for 'from' currency
        }
        if (!graph.has(to)) {
            graph.set(to, []); // Initialize adjacency list for 'to' currency
        }
        graph.get(from).push(to); // Add 'to' currency to 'from' currency's list
        graph.get(to).push(from); // Add 'from' currency to 'to' currency's list (assuming bidirectional exchange)
    });

    // BFS to find the shortest path
    const queue = [[startCurrency]]; // Initialize queue with the start currency path
    const visited = new Set([startCurrency]); // Track visited currencies

    while (queue.length > 0) {
        const path = queue.shift(); // Get the first path from the queue
        const lastNode = path[path.length - 1]; // Get the last currency in the current path

        if (lastNode === targetCurrency) {
            // If the last currency is the target, reconstruct the path
            return path.map((node, index) => {
                if (index < path.length - 1) {
                    return [node, path[index + 1]]; // Create pairs of consecutive currencies
                }
                return null;
            }).filter(pair => pair !== null); // Filter out any null values
        }

        // Explore neighbors of the last currency
        for (const neighbor of graph.get(lastNode)) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor); // Mark neighbor as visited
                queue.push([...path, neighbor]); // Add new path with the neighbor to the queue
            }
        }
    }

    return null; // No path found
}

// Example usage:
const exchangeRates = [
    ['CZK', 'EUR', 25.3],
    ['CZK', 'USD', 24.1],
    ['EUR', 'USD', 0.95],
    ['USD', 'JPY', 17.3],
    ['HRK', 'NOK', 0.25],
    ['EUR', 'NOK', 7.1]
];
const startCurrency = 'CZK';
const targetCurrency = 'NOK';

const result = findShortestCurrencyPath(exchangeRates, startCurrency, targetCurrency);
console.log(result); // Output the shortest sequence of currency exchanges

class HashMap {
    constructor(loadfactor = 0.75, capacity = 16){
        this.loadfactor = loadfactor;
        this.capacity = capacity;
        this.size = 0;
        this.buckets = new Array(this.capacity).fill(null).map(() => []);
    }

    // hash algorithm to get hashcode based on key
    hash(key) {
        let hashCode = 0;
        // convert key to a string, in case we get non-string key input
        const keyStr = String(key);

        const primeNumber = 13;
        for (let i = 0; i < keyStr.length; i++) {
            hashCode = primeNumber * hashCode + keyStr.charCodeAt(i);
        }

        return hashCode % this.capacity;
    }
}
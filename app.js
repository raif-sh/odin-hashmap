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

    set(key, value) {
        // cal the hash of the key
        const index = this.hash(key);

        // find right bucket
        const bucket = this.buckets[index];

        // check if key already exists
        const existingPair = bucket.find(pair => pair[0] === key);

        // handle collisions properly
        if (existingPair) {
            // update existing value
            existingPair[1] = value;
        } else {
            // Add new key-value pair
            bucket.push([key, value]);
            this.size++;
        }
    }

    get(key) {
        const index = this.hash(key);

        // find matching bucket
        const bucket = this.buckets[index];

        const pair = bucket.find(pair => pair[0] === key);

        return pair ? pair[1] : undefined;
    }
}

const map = new HashMap();

map.set("name", "hulu lulu");
console.log(map.get("name"));
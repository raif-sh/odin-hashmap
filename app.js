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

        // get the value of the pair matching the key
        const pair = bucket.find(pair => pair[0] === key);

        return pair ? pair[1] : undefined;
    }

    has(key) {
        // use get function to check if a key exists
        return this.get(key) !== undefined;
    }

    remove(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        // find the index of the key-value pair
        const pairIndex = bucket.findIndex(pair => pair[0] === key);

        if (pairIndex !== -1) {
            bucket.splice(pairIndex, 1);
            this.size--;
            return true;
        }
        return false;
    }

    length() {
        return this.size;
    }

    clear() {
        this.capacity = 16;
        this.buckets = new Array(this.capacity).fill(null).map(() => []);
        this.size = 0;
    }

    keys() {
        const allKeys = [];
        for (const bucket of this.buckets) {
            for (const [key, value] of bucket) {
                // push all keys to the new array
                allKeys.push(key);
            }
        }
        return allKeys;
    }

    values() {
        const allValues = [];
        for (const bucket of this.buckets) {
            for (const [key, value] of bucket) {
                // push all values to the new array
                allValues.push(value);
            }
        }
        return allValues;
    }

    entries() {
        const allEntries = [];
        for (const bucket of this.buckets) {
            for (const [key, value] of bucket) {
                allEntries.push([key, value]);
            }
        }
        return allEntries;
    }

}

const map = new HashMap();

map.set("name", "hulu lulu");
map.set("age", 325);
map.set("food", "pizza");
map.set("food", "biryani");
map.set("drink", "teh");
console.log(map.hash("ad"), map.hash("bc"));

// console.log(map.get("food"));
// console.log(map.has("name"));
// console.log(map.remove("drink"));
// console.log(map.keys());
// console.log(map.values());
// console.log(map.entries());

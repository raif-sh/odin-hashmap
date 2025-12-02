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

        // handle value to key assignment
        if (existingPair) {
            // update existing value
            existingPair[1] = value;
        } else {
            // Add new key-value pair
            bucket.push([key, value]);
            this.size++;
        }

        // check if we need to resize
        if(this.size / this.capacity > this.loadfactor) {
            this.resize();
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
        const index = this.hash(key);
        const bucket = this.buckets[index];
        return bucket.some(pair => pair[0] === key);
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

    resize() {
        // console.log("resizing with more capacity");
        // Get existing bucket and capacity
        const oldBucket = this.buckets;
        const oldCapacity = this.capacity;

        // double capacity
        this.capacity = oldCapacity * 2;

        // create new buckets array
        this.buckets = new Array(this.capacity).fill(null).map(() => []);

        // reset size
        this.size = 0;

        // re-hash and re-add all existing items
        for (let i = 0; i < oldCapacity; i++) {
            const bucket = oldBucket[i];

            for (const [key, value] of bucket) {
                // Re-add each item to new bucket
                // this will use the new capacity in the hash function
                const index = this.hash(key);
                this.buckets[index].push([key, value]);
                this.size++;
            }
        }
        // console.log("new capacity is: " + this.capacity);

    }
}

export { HashMap };

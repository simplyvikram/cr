
/**
 * A priority queue stores a list of items but each can have a numeric priority value.
 * Items with a higher priority are dequeued before items with a lower priority.
 * Implemented as a hash of arrays where the hash keys are priority values.
 */
function PriorityQueue() {
    this.store = {};	// keys are priorities, values are arrays of elements
    this.count = 0;

    // adds an item
    // priority must be an integer (higher value has higher priority)
    this.add = function(value, priority) {
        if (this.store[priority] == undefined)
            this.store[priority] = [];

        this.store[priority].push(value);
        this.count++;
    };

    // returns the oldest-added value with the highest priority
    this.Pop = function() {
        console.log("pop called");

        keys = Object.keys(this.store);
        if (keys.length > 0) {
            maxKey = Math.max.apply(Math, keys);
            this.count--;
            val =  this.store[maxKey].shift();
            if (this.store[maxKey].length == 0) {
                delete this.store[maxKey];
            }
            return val;
        } else {
            return null;
        }
    };

    this.length = function() {
        return this.count;
    }
}

PriorityQueue.prototype.get_all_priorities = function() {
    return Object.keys(this.store);
}

// iterates through all the queue elements in priority-then-FIFO order
PriorityQueue.prototype.forEach = function(callback) {

    for (var key in this.store) {
        this.store[key].forEach(function(val, indexOfVal){
            callback(key, val, indexOfVal)
        });
    }
}

PriorityQueue.prototype.changePriority = function(value, newPriority) {

    self = this;
    foundItem = false;

    this.forEach(function(key, val, indexOfVal){
        if (value === val) {
            self.store[key].splice(indexOfVal, 1);
            self.count--;
            self.add(value, newPriority);
            foundItem = true;
        }
    });
    return foundItem;

}

PriorityQueue.prototype.show = function () {

    for (var key in this.store) {
        s = "key: " + key + ", values:";
        this.store[key].forEach(function (val) {
            s += " " + val
        })
        console.log(s);
    }

}

function someFunc(key, val, indexOfVal){
    console.log("someFunc called key: " + key + ", val:" + val + " indexOfVal:" + indexOfVal);

}

p = new PriorityQueue();

p.add(100, 2);
p.add(10, 2);
p.add(1000, 2);

p.add(888, 19);

p.add(20, 1);
p.add(200, 1);

p.add(911, 4);
p.add(910, 4);
p.add(912, 4);
console.log("Num items in queue: " + p.length());
console.log("Current state of priority queue:");
p.show();


value = 944;
priority = 8;
console.log("Tryring to change priority for value: " + value + " to priority:" + priority);
console.log("Priority change status: " + p.changePriority(value, priority));
console.log("New status of priority queue");
p.show();

console.log("Now lets pop from priority queue");
numElements = p.length();
for (i = 0; i < numElements; i++){
    console.log("popping " + p.Pop());
}
p.show();



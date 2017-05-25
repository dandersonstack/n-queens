var Queue = function() {
  this.storage = {};
  this.front = 0;
};

Queue.prototype.size = function() {
  return Object.keys(this.storage).length;
}

Queue.prototype.enqueue = function (value) {
  this.storage[this.size() + this.front] = value;
}

Queue.prototype.dequeue = function () {
  var item = this.storage[this.front];
  delete this.storage[this.front];
  if(item !== undefined) {
    this.front++;
  }
  return item;
}

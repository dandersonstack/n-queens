describe('queue', function() {
  var queue;
  beforeEach(function() {
    queue = new Queue();
  });

  describe('queue shared behavior', function() {
    it('reports a size of zero for a new queue', function() {
      expect(queue.size()).to.equal(0);
    });

    it('reports a size of 2 after adding two items', function() {
      queue.enqueue('a');
      queue.enqueue('b');
      expect(queue.size()).to.equal(2);
    });

    it('does not error when removing from an empty queue', function() {
      expect(function() { queue.dequeue(); }).not.throws();
    });

    it('reports a size of 1 after adding two items and removing one', function() {
      queue.enqueue('a');
      queue.enqueue('b');
      queue.dequeue();
      expect(queue.size()).to.equal(1);
    });

    it('reports a size of 0 after removing more items than were added', function() {
      queue.enqueue('a');
      queue.dequeue();
      queue.dequeue();
      expect(queue.size()).to.equal(0);
    });

    it('allows sequentially adding and removing items', function() {
      queue.enqueue('a');
      expect(queue.dequeue()).to.equal('a');
      queue.enqueue('b');
      expect(queue.dequeue()).to.equal('b');
    });

  });

  describe('queue-specific behavior', function() {
    it('removes the least recently added of two items', function() {
      queue.enqueue('a');
      queue.enqueue('b');
      expect(queue.dequeue()).to.equal('a');
    });

    it('removes the oldest item, after newer items have already been added and removed', function() {
      queue.enqueue('a');
      queue.enqueue('b');
      queue.dequeue();
      queue.enqueue('c');
      expect(queue.dequeue()).to.equal('b');
    });
  });

});

describe('DecisionTree', function() {
  var tree;

  beforeEach(function() {
    tree = new DecisionTree(0, 0, 4, [2,1]);
  });

  describe('DecisionTree function creates DecisionTree objects', function() {
    it('should return an object with row, col, n, and cameFrom properties', function() {
      expect(tree.hasOwnProperty('row')).to.equal(true);
      expect(tree.hasOwnProperty('col')).to.equal(true);
      expect(tree.hasOwnProperty('n')).to.equal(true);
      expect(tree.hasOwnProperty('cameFrom')).to.equal(true);
    });

    it('should return an array of 1 elements when called from the top square', function() {
      let possibleMoves = tree.knightMoves;
      expect(possibleMoves.length).to.equal(1);
    });

    it('should not contain cameFrom in its possibleMoves array', function() {
      let possibleMoves = tree.knightMoves;
      expect(possibleMoves).to.eql( [ [ 1, 2 ] ]);
    });

  });

});
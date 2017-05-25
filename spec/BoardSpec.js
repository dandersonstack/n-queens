describe('Board', function() {

  var capitalize = function(word) {
    return word[0].toUpperCase() + word.slice(1);
  };


  var verifyConflictTypes = function(expectedConflicts, matrix) {
    // The Board() constructor will accept a matrix and build that into a (Backbone) Board object (as defined in Board.js)
    var board = new Board(matrix);
    _.map('row col rooks majorDiagonal minorDiagonal queens'.split(' '), function(conflictType) {
      var conflictDetected = board['hasAny' + capitalize(conflictType) + 'Conflicts']();
      var conflictExpected = _(expectedConflicts).contains(conflictType);
      var message = conflictExpected ? 'should' : 'should not';

      it(message + ' find a ' + conflictType + ' conflict', function() {
        expect(conflictDetected).to.be.equal(conflictExpected);
      });
    });
  };

  describe('Empty board', function() {
    verifyConflictTypes([''], [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]);
  });

  describe('Board with row conflicts', function() {
    verifyConflictTypes(['row', 'rooks', 'queens'], [
      [0, 0, 0, 0],
      [1, 1, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]);
  });

  describe('Board with col conflicts', function() {
    verifyConflictTypes(['col', 'rooks', 'queens'], [
      [1, 0, 0, 0],
      [0, 0, 0, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 0]
    ]);
  });

  describe('Board with major diagonal conflicts', function() {
    verifyConflictTypes(['majorDiagonal', 'queens'], [
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]);
    verifyConflictTypes(['majorDiagonal', 'queens'], [
      [0, 0, 0, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 1, 0]
    ]);
  });

  describe('Board with minor diagonal conflicts', function() {
    verifyConflictTypes(['minorDiagonal', 'queens'], [
      [0, 0, 1, 0],
      [0, 0, 0, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 0]
    ]);
    verifyConflictTypes(['minorDiagonal', 'queens'], [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 1],
      [0, 0, 1, 0]
    ]);
  });

  // describe('The findKnightMovesFromIndex retuns a list of correct possible knight moves', function() {
  //   beforeEach(function() {
  //     var board = new Board({n:4});
  //   });
  //   it('should return 3 elements when called on ', function{
  //     console.log("This last test passes!");
  //     assert(true).to.be(true);
  //   });
  // });

  describe('The findKnightMovesFromIndex retuns a list of correct possible knight moves', function() {
    var board;

    beforeEach(function() {
      board = new Board({n:4});
      boardFive = new Board({n:5});
    });

    it('should return an array of 2 elements when called from the top square', function() {
      // console.log("This last test passes!");
      let possibleMoves = board.findKnightMovesFromIndex(0,0);
      expect(possibleMoves.length).to.equal(2);
    });

    it('should return the correct elements when called from the top square', function() {
      // console.log("This last test passes!");
      let possibleMoves = board.findKnightMovesFromIndex(0,0);
      expect(possibleMoves).to.eql([[2,1],[1,2]]);
    });

    it('should return the correct elements when called from a square adjacent to the bottom-right for n = 4', function() {
      let possibleMoves = board.findKnightMovesFromIndex(3,2);
      expect(possibleMoves.length).to.equal(3);
    });

    it('should return the correct elements when called from a square adjacent to the bottom-right for n = 5', function() {
      let possibleMoves = boardFive.findKnightMovesFromIndex(3,2);
      expect(possibleMoves.length).to.equal(4);
    });

    it('should return the correct number of elements when called from a specific index', function() {
      // console.log("This last test passes!");
      let possibleMoves = boardFive.findKnightMovesFromIndex(4,3);
      expect(possibleMoves).to.eql([ [ 3, 1 ], [ 2, 4 ], [ 2, 2 ] ]);
    });

  });

});

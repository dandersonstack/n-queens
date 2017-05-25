// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var sum = _.reduce(this.attributes[rowIndex], function(memo, num){ return memo + num; }, 0);
      if(sum > 1) {
        return true;
      }
      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      let conflicts = false;
      for(let currRow = 0; currRow < this.attributes.n; currRow++) {
        conflicts = conflicts || this.hasRowConflictAt(currRow);
      }
      return conflicts;
    },

    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var sum = 0
      for(let currRow = 0; currRow < this.attributes.n; currRow++) {
        sum += this.attributes[currRow][colIndex];
      }
      if(sum > 1) {
        return true;
      } return false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      let conflicts = false;
      for(let currCol = 0; currCol < this.attributes.n; currCol++) {
        conflicts = conflicts || this.hasColConflictAt(currCol);
      }
      return conflicts;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      let sum = 0, currRow, currCol;
      //checking along the left side first
      if(majorDiagonalColumnIndexAtFirstRow < 0) {
        currRow = Math.abs(majorDiagonalColumnIndexAtFirstRow)
        currCol = 0;
      } else {
        currRow = 0;
        currCol = majorDiagonalColumnIndexAtFirstRow;
      }
      while(currRow < this.attributes.n && currCol < this.attributes.n) {
        sum += this.attributes[currRow][currCol];
        currRow++; currCol++;
      }
      if(sum > 1) {
        return true;
      } return false;
    },

    // test if any major diagonals on this board contain conflicts
    //checking every along the left, then along the top
    hasAnyMajorDiagonalConflicts: function() {
      let conflicts = false
      for(let i = this.attributes.n - 1; i >= 0; i--) {
        currStart = this._getFirstRowColumnIndexForMajorDiagonalOn(i, 0);
        conflicts = conflicts || this.hasMajorDiagonalConflictAt(currStart);
      }
      for(let i = 1; i < this.attributes.n; i++) {
        currStart = this._getFirstRowColumnIndexForMajorDiagonalOn(0,i);
        conflicts = conflicts || this.hasMajorDiagonalConflictAt(currStart);
      }
      return conflicts;
    },

    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      let sum = 0, currRow, currCol;
      if(minorDiagonalColumnIndexAtFirstRow < 4) {
        currRow = minorDiagonalColumnIndexAtFirstRow
        currCol = 0;
      } else {
        currRow = this.attributes.n - 1;
        currCol = minorDiagonalColumnIndexAtFirstRow - currRow;
      }
      while(currRow >= 0 && currCol < this.attributes.n) {
        sum += this.attributes[currRow][currCol];
        currRow--; currCol++;
      }
      if(sum > 1) {
        return true;
      } return false;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      let conflicts = false
      //first check the left most row
      let currStart;
      for(let i = 0; i < this.attributes.n; i++) {
        currStart = this._getFirstRowColumnIndexForMinorDiagonalOn(0,i);
        conflicts = conflicts || this.hasMinorDiagonalConflictAt(currStart);
      }
      //then check the bottom row
      for(let i = 1; i < this.attributes.n; i++) {
        currStart = this._getFirstRowColumnIndexForMinorDiagonalOn(this.attributes.n-1,i);
        conflicts = conflicts || this.hasMinorDiagonalConflictAt(currStart);
      }
      return conflicts;
    },

    //returns an array of All possible moves from the current position.
    //for a Board object of size n
    //findKnightMovesFromIndex(0,0) = [[1,2], [2,1]]
    findKnightMovesFromIndex(row, col) {
      const results = [];
      if(row+2 < this.attributes.n){
        if(col+1 < this.attributes.n){
          results.push([row+2,col+1]);
        }
        if(col-1 >= 0){
          results.push([row+2,col-1]);
        }

        if(row+1 < this.attributes.n){
          if(col+2 < this.attributes.n){
            results.push([row+1,col+2]);
          }
          if(col-2 >= 0){
            results.push([row+1,col-2]);
          }
        }
      }

      if(row-1 >= 0){
        if(col+2 < this.attributes.n){
          results.push([row-1,col+2]);
        }
        if(col-2 >= 0){
          results.push([row-1,col-2]);
        }

        if(row-2 >= 0){
          if(col+1 < this.attributes.n){
            results.push([row-2,col+1]);
          }
          if(col-1 >= 0){
            results.push([row-2,col-1]);
          }
        }
      }

      return results;
    }
  });

//For each move have a helper function to check if it is a legal move
//Check if conflict free
//Check if nobody is already in that move


    /*--------------------  End of Helper Functions  ---------------------*/

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
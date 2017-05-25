var DecisionTree = function(row, col, n, cameFrom=null){
  this.row = row;
  this.col = col;
  this.n = n;
  this.knightMoves = this.findKnightMovesFromIndex();
  this.cameFrom = cameFrom;
};

//returns an array of All possible moves from the current position.
//for a Board object of size n
//findKnightMovesFromIndex(0,0) = [[1,2], [2,1]]
DecisionTree.prototype.findKnightMovesFromIndex = function() {
  const results = [];
  let row = this.row;
  let col = this.col;
  let cameFrom = this.cameFrom;

  if(row+2 < this.n){
    if(col+1 < this.n){
      results.push([row+2,col+1]);
    }
    if(col-1 >= 0){
      results.push([row+2,col-1]);
    }

    if(row+1 < this.n){
      if(col+2 < this.n){
        results.push([row+1,col+2]);
      }
      if(col-2 >= 0){
        results.push([row+1,col-2]);
      }
    }
  }

  if(row-1 >= 0){
    if(col+2 < this.n){
      results.push([row-1,col+2]);
    }
    if(col-2 >= 0){
      if([row-1,col-2] !== cameFrom){
        results.push([row-1,col-2]);
      }
    }

    if(row-2 >= 0){
      if(col+1 < this.n){
        results.push([row-2,col+1]);
      }
      if(col-1 >= 0){
        results.push([row-2,col-1]);
      }
    }
  }
  return results.splice(results.indexOf(cameFrom), 1);
};

DecisionTree.prototype.isViableQueen = function(row, col) {
  //if(row)
};

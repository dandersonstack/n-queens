var DecisionTree = function(row, col, n){
  this.row = row;
  this.col = col;
  this.n = n;
  //this.knightMoves = this.findKnightMovesFromIndex();
  //this.cameFrom = cameFrom;
};

//returns an array of All possible moves from the current position.
//for a Board object of size n
//findKnightMovesFromIndex(0,0) = [[1,2], [2,1]]
DecisionTree.prototype.findKnightMoves = function() {
  const results = [];
  let row = this.row;
  let col = this.col;
  let n = this.n;
  let cameFrom = this.cameFrom;

  if(row+2 < n){
    if(col+1 < n){
      results.push([row+2,col+1]);
    }
    if(col-1 >= 0){
      results.push([row+2,col-1]);
    }

    if(row+1 < n){
      if(col+2 < n){
        results.push([row+1,col+2]);
      }
      if(col-2 >= 0){
        results.push([row+1,col-2]);
      }
    }
  }

  if(row-1 >= 0){
    if(col+2 < n){
      results.push([row-1,col+2]);
    }

    if(row-2 >= 0){
      if(col+1 < n){
        results.push([row-2,col+1]);
      }
    }
  }
  //returns all possible KnightMoves except for the one it cameFrom
  return results;
  //.splice(results.indexOf(cameFrom), 1);
};

DecisionTree.prototype.traverseForSolutions = function(currBoard, solutionsObject, queenCount) {
  if(!currBoard.hasAnyQueensConflicts()) {
    //check if the currBoard has any conflicts
    //if it has a conflict than simply return and break out of the recursion
    if(queenCount == this.n) {
      solutionsObject[0]++;
    } else {
      //(DEPTH FIRST SEARCH RECURSIVELY)
      let possibleKnightMoves = this.findKnightMoves();
      for(let i in possibleKnightMoves) {
        let currMove = possibleKnightMoves[i];
        //take the first move, and toggle the board based on that move
        currBoard.toggle(currMove[0], currMove[1]);
         //create a new node, and call traverse on that node with the updated board
        let decisionTree = new DecisionTree(currMove[0], currMove[1], this.n);
        //after you call traverse on that node (it will iterate down the tree)
        decisionTree.traverseForSolutions(currBoard, solutionsObject);
        //untoggle the node and repeat with the rest of the nodes
        currBoard.toggle(currMove[0], currMove[1]);
      }
    }
  }
};
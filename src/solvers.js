/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  let solution =  new Board({n: n});
  let boardRows = solution.rows();
  for(let i in boardRows) {
    boardRows[i][i] = 1;
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return boardRows;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  //Figure this part out later

  var solution = undefined;
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return undefined;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = [0];
  if(n == 0 || n == 1) {
    solutionCount[0] += 1;
  }
  else if (n > 3) {
    let decsionTreeRoots = [];
    let emptyBoard = new Board({n: n});
    decsionTreeRoots.push(new DecisionTree(0,0,n));
    decsionTreeRoots.push(new DecisionTree(0,1,n));
    decsionTreeRoots.push(new DecisionTree(1,0,n));
    decsionTreeRoots.push(new DecisionTree(1,1,n));
    for(let i in decsionTreeRoots) {
      debugger;
      emptyBoard.togglePiece(decsionTreeRoots[i].row, decsionTreeRoots[i].col);
      decsionTreeRoots[i].traverseForSolutions(emptyBoard, solutionCount, 1);
      emptyBoard.togglePiece(decsionTreeRoots[i].row, decsionTreeRoots[i].col);
    }
  }
  // create new pseudo class for first move to
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount[0];
};







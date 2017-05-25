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
  /**

  0. Create an empty queue, and a starting game board , and a pseduosolutionsList.
  1. Create a Set of visited pseudo boards.
  2. Set the current board to the starting game board.
  3. For every possible starting position, create a pseduo class and add it to the queue
  4. While there is a pseudo class left to Pop() from the queue, do it and set it to curr.
    5. Update the current board based on the current pseudo board.
    6. Get a list of all possible 'knight moves' based on the pseudo moves most prev move
      8. For each move have a helper function to check if it is a legal move
        -> Check if conflict free
        -> Check if nobody is already in that move
        1. If both conditions are met then create a new pseduo class with that move
          -> If that pseudo class has not yet been visited than
            #add to visited
          -> If that pseudo class is a solution,
            #then at it to the solutions array
          -> Otherwise at that psuedo class to the Queue
  9. When the queue is empty turn all of the pseudo classes into matrices and return that solution array
  */




  // var stack=new Array();
  // if(n != 2 || n != 3) {
  //   let piecesAdded = 0;
  //   let EmptyBoard = new Board({n: n});
  //   let boardRows = solution.rows();
  //   while(piecesAdded < n) {
  //     piecesAdded++;

  //   }
  // } else {
  //   var solution = undefined;
  // }
  var solution = undefined;
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return undefined;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; 

  // create new pseudo class for first move to
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

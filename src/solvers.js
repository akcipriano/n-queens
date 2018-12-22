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



window.findNRooksSolution = function (n) {
  var solution = new Board({ n: n });
  var index = 0;

  for (var i = 0; i < solution.rows().length; i++) {
    solution.togglePiece(i, index);
    index++;
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function (n) {
  if (n === 0 || n === 1) {
    return 1;
  }

  var solution = new Board({ n: n });
  var solutionCount = 0;

  var toggledPieces = [];

  var findSolutions = function (rowIndex, columnIndex) {
    if (solution.hasAnyRooksConflicts()) {
      solution.togglePiece(rowIndex, columnIndex);
      return;
    }

    toggledPieces.push('toggled');

    // a solution found (base case)...
    if (toggledPieces.length === n) {
      solutionCount++;
      return;
    }

    if (columnIndex < solution.rows().length - 1) {
      columnIndex++;
    } else {
      rowIndex++;
      columnIndex = 0;
    }

    for (var i = rowIndex; i < solution.rows().length; i++) {
      for (var j = columnIndex; j < solution.rows().length; j++) {
        solution.togglePiece(i, j);
        findSolutions(i, j);
      }
      columnIndex = 0;
    }

    solution = new Board({ n: n });
    toggledPieces = [];
  };

  for (var i = 0; i < solution.rows().length; i++) {
    for (var j = 0; j < solution.rows().length; j++) {
      solution.togglePiece(i, j);
      findSolutions(i, j);
    }
  }

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function (n) {
  var solution = new Board({ n: n });

  if (n === 0 || n === 2 || n === 3) {
    return solution.rows();
  }

  if (n === 1) {
    solution.togglePiece(0, 0);
    return solution.rows();
  }

  var x = solution.rows().length - 2;
  var y = solution.rows().length - 1;

  for (var i = 0; i < solution.rows().length; i++) {
    if (x >= 0) {
      solution.togglePiece(x, i);
      x = x - 2;
    } else {
      solution.togglePiece(y, i);
      y = y - 2;
    }
  }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function (n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

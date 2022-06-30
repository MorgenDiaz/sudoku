let puzzle = [
  [8, 9, 5, 7, 4, 2, 1, 3, 6],
  [2, 7, 1, 9, 6, 3, 4, 8, 5],
  [4, 6, 3, 5, 8, 1, 7, 9, 2],

  [9, 3, 4, 6, 1, 7, 2, 5, 8],
  [5, 1, 7, 2, 3, 8, 9, 6, 4],
  [6, 8, 2, 4, 5, 9, 3, 7, 1],

  [1, 5, 9, 8, 7, 4, 6, 2, 3],
  [7, 4, 6, 3, 2, 5, 8, 1, 9],
  [3, 2, 8, 1, 9, 6, 5, 4, 7],
];

let puzzleCopy = [
  [8, 9, 5, 7, 4, 2, 1, 3, 6],
  [2, 7, 1, 9, 6, 3, 4, 8, 5],
  [4, 6, 3, 5, 8, 1, 7, 9, 2],

  [9, 3, 4, 6, 1, 7, 2, 5, 8],
  [5, 1, 7, 2, 3, 8, 9, 6, 4],
  [6, 8, 2, 4, 5, 9, 3, 7, 1],

  [1, 5, 9, 8, 7, 4, 6, 2, 3],
  [7, 4, 6, 3, 2, 5, 8, 1, 9],
  [3, 2, 8, 1, 9, 6, 5, 4, 7],
];

let invalidPuzzle = [
  [8, 9, 5, 7, 4, 2, 1, 3, 6],
  [8, 7, 1, 9, 6, 3, 4, 8, 5],
  [4, 6, 3, 5, 8, 1, 7, 9, 2],
  [9, 3, 4, 6, 1, 7, 2, 5, 8],
  [5, 1, 7, 2, 3, 8, 9, 6, 4],
  [6, 8, 2, 4, 5, 9, 3, 7, 1],
  [1, 5, 9, 8, 7, 4, 6, 2, 3],
  [7, 4, 6, 3, 2, 5, 8, 1, 9],
  [3, 2, 8, 1, 9, 6, 5, 4, 7],
];

function getRow(puzzle, row = 0) {
  return puzzle[row];
}

function getColumn(puzzle, column = 0) {
  return puzzle.slice(0, puzzle.length).map((i) => i[column]);
}

function coordinatesExceedBounds(startRow, startCol) {
  return startRow >= puzzle[0].length || startCol >= puzzle.length;
}

function getSection(puzzle, x = 0, y = 0) {
  let startRow = y * 3;
  let endRow = startRow + 3;
  let startCol = x * 3;
  let endCol = startCol + 3;

  if (coordinatesExceedBounds(startRow, startCol)) {
    throw RangeError("Section coordinates are out of bounds.");
  }

  return puzzle
    .slice(startRow, endRow)
    .map((i) => i.slice(startCol, endCol))
    .flat();
}

function contains1to9(subsection) {
  const validSubsection = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    validSubsection.every((i) => subsection.includes(i)) &&
    subsection.length === validSubsection.length
  );
}

function validateRows(puzzle) {
  puzzle.forEach((element) => {
    if (!contains1to9(element)) {
      return false;
    }
  });

  return true;
}

function validateColumns(puzzle) {
  let columnCount = puzzle[0].length;

  for (let i = 0; i < columnCount; i++) {
    if (!contains1to9(getColumn(puzzle, i))) {
      return false;
    }
  }

  return true;
}

function validateSubsections(puzzle) {
  let sectionRows = puzzle.length / 3;
  let sectionColumns = puzzle[0].length / 3;

  for (let r = 0; r < sectionRows; r += 3) {
    for (c = 0; c < sectionColumns; c += 3) {
      let subsection = getSection(puzzle, c, r);
      if (!contains1to9(subsection)) {
        return false;
      }
    }
  }

  return true;
}

function sudokuIsValid(puzzle) {
  return (
    validateRows(puzzle) &&
    validateColumns(puzzle) &&
    validateSubsections(puzzle)
  );
}

function isSame(puzzle1, puzzle2) {
  if (
    !Array.isArray(puzzle1) ||
    !Array.isArray(puzzle2) ||
    puzzle1.length != puzzle2.length
  ) {
    return false;
  }

  for (r = 0; r < puzzle.length; r++) {
    if (puzzle1[r].length != puzzle2[r].length) {
      return false;
    }

    for (c = 0; c < puzzle1[r].length; c++) {
      let puzzle1CellAtCoords = puzzle1[r][c];
      let puzzle2CellAtCoords = puzzle2[r][c];
      if (puzzle1CellAtCoords != puzzle2CellAtCoords) {
        return false;
      }
    }
  }

  return true;
}

console.log(sudokuIsValid(puzzle));
console.log(sudokuIsValid(invalidPuzzle));

console.log(isSame(puzzle, puzzleCopy));
console.log(isSame(puzzle, puzzle));
console.log(isSame(puzzle, invalidPuzzle));

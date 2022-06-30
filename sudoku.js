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

console.log(contains1to9([1, 2, 3, 4, 5, 6, 7, 8, 9]));

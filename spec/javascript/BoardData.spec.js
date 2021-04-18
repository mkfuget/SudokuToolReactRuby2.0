import BoardData from '../../app/javascript/components/functional/BoardData'
const testData = "..43..2.9..5..9..1.7..6..43..6..2.8719...74...5..83...6.....1.5..35.869..4291.3..";

test('BoardDataConstuctor initializes empty board', () => {
    let testBoardData = new BoardData();
    expect(testBoardData.boardData[0]).toBe(-1);
    expect(testBoardData.boardBlocks[0][2]).toBe(0);

  });
  test('BoardData addEntry adds entries when there are no current entries blocking, updates blocking values', () => {
    let testBoardData = new BoardData();
    testBoardData.addEntry(0, 0);
    expect(testBoardData.boardData[0]).toBe(0);

    testBoardData.addEntry(1, 1);
    testBoardData.addEntry(14, 0);


    expect(testBoardData.boardData[0]).toBe(0);
    expect(testBoardData.boardData[14]).toBe(0);
    expect(testBoardData.boardData[1]).toBe(1);
    expect(testBoardData.boardBlocks[9][0]).toBe(2);


  });
  test('BoardData solve entry returns an iteration through the solution of the puzzle ', () => {
    let testBoardData = new BoardData();
    testBoardData.addEntry(0, 0);
    testBoardData.addEntry(10, 0);
    testBoardData.addEntry(36, 0);
    testBoardData.addEntry(8, 0);

    expect(testBoardData.boardData[0]).toBe(0);
    expect(testBoardData.boardData[10]).toBe(-1);
    expect(testBoardData.boardData[36]).toBe(-1);
    expect(testBoardData.boardData[8]).toBe(-1);


});
test('Solve Puzzle returns a set of steps to iterate through all of the possible solution steps for the puzzle', () => {
  let testBoardData = new BoardData();
  testBoardData.addData(testData)
  const output = testBoardData.solvePuzzle();
  console.log(output);

});

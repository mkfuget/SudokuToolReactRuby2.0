import BoardData from '../../app/javascript/components/functional/BoardData'
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
  test('BoardData entry prevented when a different entry ', () => {
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

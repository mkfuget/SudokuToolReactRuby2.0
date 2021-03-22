import BoardData from '../../app/javascript/components/functional/BoardData'
test('BoardDataConstuctor initializes empty board', () => {
    let testBoardData = new BoardData();
    expect(testBoardData.boardData[0].entry).toBe(-1);
    expect(testBoardData.boardData[0].blocks[2]).toBe(0);

  });
  test('BoardData addEntry adds entries when there are no current entries blocking, updates blocking values', () => {
    let testBoardData = new BoardData();
    expect(testBoardData.boardData[0].entry).toBe(-1);
    expect(testBoardData.boardData[0].blocks[2]).toBe(0);
    debugger
    testBoardData.addEntry(0, 0);
    expect(testBoardData.boardData[0].entry).toBe(0);

    testBoardData.addEntry(1, 1);
    testBoardData.addEntry(14, 0);

    console.log(testBoardData.boardData)

    expect(testBoardData.boardData[0].entry).toBe(0);
    expect(testBoardData.boardData[14].entry).toBe(0);
    expect(testBoardData.boardData[1].entry).toBe(1);
    expect(testBoardData.boardData[9].blocks[0]).toBe(2);


  });

const BOARD_WIDTH = 9;
const SQUARE_WIDTH = 3;
const BOARD_SQUARES = 81;


function Util () {}

Util.indexToRow = function(index)
{
    return Math.floor(index/9);
};

Util.indexToCol = function(index)
{
    return Math.floor(index%9);
};

Util.indexToSquare = function(index)
{
    return Math.floor(index/(SQUARE_WIDTH)%SQUARE_WIDTH)+Math.floor(index/(BOARD_WIDTH*SQUARE_WIDTH))*SQUARE_WIDTH;
};

Util.getSquareHeapIndex = function(index, number)
{
    return (BOARD_SQUARES+Util.indexToSquare(index)*BOARD_WIDTH+number);
};

Util.getColHeapIndex = function(index, number)
{
    return (2*BOARD_SQUARES+Util.indexToCol(index)*BOARD_WIDTH+number);
};

Util.getRowHeapIndex = function(index, number)
{
    return (3*BOARD_SQUARES+Util.indexToRow(index)*BOARD_WIDTH+number);
};

Util.updateBoardNumOptions = function(numOptionsArray, boardHeapIndexArray, heapArray, index, change)
{
    
}

//Fucntions for determining if a placement is allowed on the current board based on game type

Util.isPlacableClassicSudoku = function(currentIndex, currentNumber, testIndex, testNumber)
{
    var currentSquare = Util.indexToSquare(currentIndex);
    var currentCol = Util.indexToCol(currentIndex);
    var currentRow = Util.indexToRow(currentIndex);

    var testSquare = Util.indexToSquare(testIndex);
    var testCol = Util.indexToCol(testIndex);
    var testRow = Util.indexToRow(testIndex);

    if(currentCol==testCol && currentNumber == testNumber)
    {
        return false;
    }
    if(currentRow==testRow && currentNumber == testNumber)
    {
        return false;
    }
    if(currentSquare==testSquare && currentNumber == testNumber)
    {
        return false;
    }
    return true;

};

Util.isPlaceableCrossSudoku = function(currentIndex, currentNumber, testIndex, testNumber)
{
    if(!Util.isPlacableClassicSudoku(currentIndex, currentNumber, testIndex, testNumber))
    {
        return false;
    }

    if(Util.indexToCol(currentIndex)-Util.indexToRow(currentIndex)===0 && Util.indexToCol(testIndex)-Util.indexToRow(testIndex===0))//determines if both entries are on the up and right diagonal
    {
        return false;
    }
    
    if(Util.indexToCol(currentIndex)-Util.indexToRow(currentIndex)===0 && Util.indexToCol(testIndex)-Util.indexToRow(testIndex===0))//determines if both entries are on the down and right diagonal
    {
        return false;
    }
    return true;

}

Util.isPlacableMiracleSudoku = function(currentIndex, currentNumber, testIndex, testNumber)
{
    return false;
}

Util.isPlacable = function(currentIndex, currentNumber, testIndex, testNumber, puzzleType)
{
    switch(puzzleType){
        case 16:
            return Util.isPlacableClassicSudoku(currentIndex, currentNumber, testIndex, testNumber);
            break;
        case 17:
            return Util.isPlacableClassicSudoku(currentIndex, currentNumber, testIndex, testNumber);
            break;
        case 18:
            return Util.isPlacableClassicSudoku(currentIndex, currentNumber, testIndex, testNumber);
            break;
        case 19:
            return Util.isPlaceableCrossSudoku(currentIndex, currentNumber, testIndex, testNumber);
            break;
        case 20:
            return Util.isPlacableMiracleSudoku(currentIndex, currentNumber, testIndex, testNumber);
             break;
                       
    }

    return false;
}


Util.right = function(index)
{
    return 2*index+2;
}

Util.left = function(index)
{
    return 2*index+1;
}

Util.parent = function(index)
{
    return Math.floor((index-1)/2);
}


Util.heapSwap = function(parentHeapIndex, childHeapIndex, heapArray, indexArray)
{
    var parentboardIndex = heapArray[parentHeapIndex][1];
    var childboardIndex = heapArray[childHeapIndex][1];

    var temp = heapArray[parentHeapIndex];
    heapArray[parentHeapIndex] = heapArray[childHeapIndex];
    heapArray[childHeapIndex] = temp;

    indexArray[parentboardIndex] = childHeapIndex;
    indexArray[childboardIndex] = parentHeapIndex;

}

export default Util;
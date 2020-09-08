    
const BOARD_WIDTH = 9;
const SQUARE_WIDTH = 3;
const BOARD_SQUARES = 81;
    
export default class BoardData{
    constructor(data, puzzleType)
    {
        this.boardData = Array(BOARD_SQUARES).fill(-1)
        this.boardHeapIndex  = Array(BOARD_SQUARES);
        this.boardBlocks = Array(BOARD_SQUARES).fill(0).map(row => Array(BOARD_WIDTH).fill(0));
        this.boardNumOptions = Array(4*BOARD_SQUARES).fill(9);
        this.solveOrder = Array(4*BOARD_SQUARES).fill(0).map(row => Array(2).fill(0));
        this.heapSize = 4*BOARD_SQUARES;
        this.puzzleType = puzzleType;
        const heapCapacity = BOARD_SQUARES;

        for(var i=0; i<this.boardNumOptions.length; i++)
        {
    
            this.solveOrder[i][0] = this.boardNumOptions[i];
            this.solveOrder[i][1] = i;
            this.boardHeapIndex[i] = i;
        }
    
        for(var i=0; i<BOARD_SQUARES; i++)
        {
            if(data[i]!= ".")
            {
                var number= parseInt(data[i]-1);
                this.addEntry(i, number);
            }
        }    
    
    }   

    
    //getters
    getCurrentBoardData()
    {
        return this.boardData;
    }

    getNumberAtIndex(index)
    {
        return this.boardData[index];
    }

    isPlacableClassicSudoku(currentIndex, currentNumber, testIndex, testNumber)
    {
        var currentSquare = this.indexToSquare(currentIndex);
        var currentCol = this.indexToCol(currentIndex);
        var currentRow = this.indexToRow(currentIndex);

        var testSquare = this.indexToSquare(testIndex);
        var testCol = this.indexToCol(testIndex);
        var testtRow = this.indexToRow(testIndex);

        if(currentCol==testCol && currentNumber == testNumber)
        {
            return false;
        }
        if(currentRow==testtRow && currentNumber == testNumber)
        {
            return false;
        }
        if(currentSquare==testSquare && currentNumber == testNumber)
        {
            return false;
        }
        return true;

    }

    isPlaceableCrossSudoku(currentIndex, currentNumber, testIndex, testNumber)
    {
        if(!isPlacableClassicSudoku(currentIndex, currentNumber, testIndex, testNumber))
        {
            return false;
        }

        if(this.indexToCol(currentIndex)-this.indexToRow(currentIndex)===0 && this.indexToCol(testIndex)-this.indexToRow(testIndex===0))//determines if both entries are on the up and right diagonal
        {
            return false;
        }
        
        if(this.indexToCol(currentIndex)-this.indexToRow(currentIndex)===0 && this.indexToCol(testIndex)-this.indexToRow(testIndex===0))//determines if both entries are on the down and right diagonal
        {
            return false;
        }
        return true;

    }
    
    isPlacableMiracleSudoku(currentIndex, currentNumber, testIndex, testNumber)
    {
        return false;
    }

    isPlacable(currentIndex, currentNumber, testIndex, testNumber)
    {
        switch(this.puzzleType){
            case 1:
                return this.isPlacableClassicSudoku(currentIndex, currentNumber, testIndex, testNumber);
                break;
            case 2:
                return this.isPlacableClassicSudoku(currentIndex, currentNumber, testIndex, testNumber);
                break;
            case 3:
                return this.isPlacableClassicSudoku(currentIndex, currentNumber, testIndex, testNumber);
                break;
            case 4:
                return this.isPlaceableCrossSudoku(currentIndex, currentNumber, testIndex, testNumber);
                break;
            case 5:
                return this.isPlacableMiracleSudoku(currentIndex, currentNumber, testIndex, testNumber);
                 break;
                           
        }

        return false;
    }

    //for a given index and number, returns if it conflicts with a given square based on current board state
    conflictOnBoard(index, number, targetIndex)
    {
        return this.isPlacable(index, number, targetIndex, this.boardData[targetIndex]);

    }

    addEntry(index, number)
    {
        if(this.boardBlocks[index][number]>0)//placement not allowed on this square
        {
            var out =
            {
                type: "Failure",
                index: -1,
                number: number
            }
            return out;
        }
        if(this.boardData[index]!=-1)
        {
            this.deleteEntry(index);
        }

        for(var i=0; i<BOARD_SQUARES; i++)
        {
            if(this.isPlacable(index, number, i, number)==0 && index!=i)
            {
                if(this.boardBlocks[i][number]==0)//we are adding the first blocking square for this index and number
                {
                    this.updateBoardNumOptions(i, -1);

                    var currentSquareIndex = this.getSquareHeapIndex(i, number);
                    var currentColIndex = this.getColHeapIndex(i, number);
                    var currentRowIndex = this.getRowHeapIndex(i, number);

                    this.updateBoardNumOptions(currentSquareIndex, -1);
                    this.updateBoardNumOptions(currentColIndex, -1);
                    this.updateBoardNumOptions(currentRowIndex, -1);
                }
                this.boardBlocks[i][number]++;//indicate new squares that now cannot be placed in
            }
        }

        var addedSquareIndex = this.getSquareHeapIndex(index, number);
        var addedColIndex = this.getColHeapIndex(index, number);
        var addedRowIndex = this.getRowHeapIndex(index, number);

        //remove one from each number that could be placed in the placed square
        for(var i=0; i<BOARD_WIDTH; i++)
        {
            if(this.boardBlocks[index][i]==0 && i!=number)
            {
                this.updateBoardNumOptions(addedSquareIndex-number+i, -1);
                this.updateBoardNumOptions(addedColIndex-number+i, -1);
                this.updateBoardNumOptions(addedRowIndex-number+i, -1);

            }
        }

        for(var i=0; i<BOARD_WIDTH; i++)//indicate that there is a blocker for each number in the square that is being placed in
        {
            this.boardBlocks[index][i]++; 
        }


        this.deleteHeapIndex(this.boardHeapIndex[index]);
        this.deleteHeapIndex(this.boardHeapIndex[addedSquareIndex]);
        this.deleteHeapIndex(this.boardHeapIndex[addedColIndex]);
        this.deleteHeapIndex(this.boardHeapIndex[addedRowIndex]);

        this.boardData[index] = number;    
        this.heapify();
        var out =
        {
            type: "Success",
            index: index,
            number: number
        }

        return true;
    }


    deleteEntry(index)
    {
        var number = this.boardData[index];
        if(this.boardData[index]!=-1)
        {
            
            for(var i=0; i<BOARD_SQUARES; i++)
            {
                if(this.isPlacable(index, number, i, number)==0 && index!=i)
                {
                    if(this.boardBlocks[i][number]==1)// we are removing the only blocking square for this index, 
                    {
                        this.updateBoardNumOptions(i, 1);

                        var currentSquareIndex = this.getSquareHeapIndex(i, number);
                        var currentColIndex = this.getColHeapIndex(i, number);
                        var currentRowIndex = this.getRowHeapIndex(i, number);

                        this.updateBoardNumOptions(currentSquareIndex, 1);
                        this.updateBoardNumOptions(currentColIndex, 1);
                        this.updateBoardNumOptions(currentRowIndex, 1);

                    }        
                    this.boardBlocks[i][number]--;
                }
            }

            for(var i=0; i<BOARD_WIDTH; i++)//indicate that a blocker is removed for each number in the square that is being placed in
            {
                this.boardBlocks[index][i]--;
            }

            var addedSquareIndex = this.getSquareHeapIndex(index, number);
            var addedColIndex = this.getColHeapIndex(index, number);
            var addedRowIndex = this.getRowHeapIndex(index, number);

            for(var i=0; i<BOARD_WIDTH; i++)
            {
                if(this.boardBlocks[index][i]===0 && i!==number)
                {
                    this.updateBoardNumOptions(addedSquareIndex-number+i, 1);
                    this.updateBoardNumOptions(addedColIndex-number+i, 1);
                    this.updateBoardNumOptions(addedRowIndex-number+i, 1);
                }
            }




            
            this.boardData[index] = -1;   
            this.heapPush(this.boardNumOptions[index], index);
            this.heapPush(this.boardNumOptions[addedSquareIndex], addedSquareIndex);
            this.heapPush(this.boardNumOptions[addedColIndex], addedColIndex);
            this.heapPush(this.boardNumOptions[addedRowIndex], addedRowIndex);

            this.heapify();
        }
    }


    updateBoardNumOptions(index, change)
    {
        this.boardNumOptions[index]+=change;
        var heapIndex = this.boardHeapIndex[index];
        this.solveOrder[heapIndex][0] = this.boardNumOptions[index];
    }
    solve()
        {
        var choices = [];
        var currentNumberGuess=0;
        while(this.heapSize>0)
        {
            currentNumberGuess = this.iterateHeapSolution(choices, currentNumberGuess);
        }
    }
    solvePuzzle(){
        var choices = [];
        var solutionSteps = [];
        var guessIndex = 0;
        while(true)
        {
            var nextStep = this.iterateHeapSolution(guessIndex);
            var index = nextStep.index;
            var number = nextStep.number;
            var returnType = nextStep.type;
            switch(returnType)
            {
                case 'Placement Successful':
                    this.addEntry(index, number);
                    choices.push([index, guessIndex]);
                    var addToSolutionSteps = 
                    {
                        index: index,
                        guessIndex: guessIndex,
                        number: number,
                        stepTaken: 'Added'
                    }
                    guessIndex = 0;
                    solutionSteps.push(addToSolutionSteps);
                    if(this.puzzleIsSolved())
                    {
                        var lastChoice = choices.pop();
                        index = lastChoice[0];
                        this.deleteEntry(index);
                        guessIndex = lastChoice[1]+1;    
                    }
                    break;
                case 'Placement Failed':
                    guessIndex++;
                    break;
                case 'Out of options for current path':
                    if(choices.length === 0)
                    {
                        return solutionSteps;
                    }
                    var lastChoice = choices.pop();
                    index = lastChoice[0];
                    this.deleteEntry(index);
                    guessIndex = lastChoice[1]+1;
                    var addToSolutionSteps = 
                    {
                        index: index,
                        guessIndex: guessIndex,
                        number: 0,
                        stepTaken: 'Removed'
                    }

                    solutionSteps.push(addToSolutionSteps);
                    break;
            }
        }
        return solutionSteps;
    }
    iterateHeapSolution(guessIndex)
    {
        var index = this.heapTop()[1];
        var number = guessIndex;

        if(index>=3*BOARD_SQUARES)//choosing from the row with the fewest options for a given number
        {
            number = index%BOARD_WIDTH;
            var rowNumber = Math.floor((index%BOARD_SQUARES)/BOARD_WIDTH);
            index = rowNumber*BOARD_WIDTH+guessIndex;
        }
        else if(index>=2*BOARD_SQUARES)//choosing from the col with the fewest options for a given number
        {
            number = index%BOARD_WIDTH;
            var colNumber = Math.floor((index%BOARD_SQUARES)/BOARD_WIDTH);
            index = colNumber + BOARD_WIDTH*guessIndex;
        } 
        else if(index>=BOARD_SQUARES)//choosing from the square with the fewest options for a given number
        {
            number = index%BOARD_WIDTH;
            var squareNumber = Math.floor((index%BOARD_SQUARES)/BOARD_WIDTH);
            var squareIndex = SQUARE_WIDTH*(squareNumber%SQUARE_WIDTH) + BOARD_WIDTH*SQUARE_WIDTH*Math.floor(squareNumber/SQUARE_WIDTH);//index corresponding to first entry of that square
            var downIndex = Math.floor(guessIndex/SQUARE_WIDTH);//determines which column the square is in
            var rightIndex = guessIndex%SQUARE_WIDTH;

            index = squareIndex + rightIndex + downIndex*BOARD_WIDTH;
        }

        if(guessIndex>=BOARD_WIDTH)   
        {
            var out = 
            {
                type: 'Out of options for current path',
                index: index,
                number: number
            }
            return out;
        }
        else if(this.boardBlocks[index][number]==0)//placement is allowed
        {
            var out = 
            {
                type: 'Placement Successful',
                index: index,
                number: number
            }
            return out;
        }
        else
        {
            var out = 
            {
                type: 'Placement Failed',
                index: index,
                number: number
            }
            return out;
        }
    }
    puzzleIsSolved()
    {
        return this.heapSize === 0;
    }
    getSquareHeapIndex(index, number)
    {
        return (BOARD_SQUARES+this.indexToSquare(index)*BOARD_WIDTH+number);
    }
    getColHeapIndex(index, number)
    {
        return (2*BOARD_SQUARES+this.indexToCol(index)*BOARD_WIDTH+number);
    }
    getRowHeapIndex(index, number)
    {
        return (3*BOARD_SQUARES+this.indexToRow(index)*BOARD_WIDTH+number);
    }

    indexToRow(index)
    {
        return Math.floor(index/9);
    }

    indexToCol(index)
    {
        return Math.floor(index%9);
    }

    indexToSquare(index)
    {
        return Math.floor(index/(SQUARE_WIDTH)%SQUARE_WIDTH)+Math.floor(index/(BOARD_WIDTH*SQUARE_WIDTH))*SQUARE_WIDTH;
    }
    right(index)
    {
        return 2*index+2;
    }

    left(index)
    {
        return 2*index+1;
    }

    parent(index)
    {
        return Math.floor((index-1)/2);
    }

    heapPush(value, index)
    {
        if(this.heapSize==this.heapCapacity)
        {
            return;
        }
        this.heapSize++;
        var heapIndex = this.heapSize-1;
        this.solveOrder[heapIndex][0] = this.boardNumOptions[index];
        this.solveOrder[heapIndex][1] = index;

        this.boardHeapIndex[index] = heapIndex;
        this.bubbleUp(heapIndex);
    }

    heapTop()
    {
    if(this.heapSize<=0)
    {
        var out = -1;
        return out;
    }
    return this.solveOrder[0];
    }

    heapPop()
        {
        if(heapSize<=0)
        {
            var out = -1;
            return out;
        }
        if(heapSize ==1)
        {
            this.heapSize--;
            return this.solveOrder[0][1];
        }
        var out = this.solveOrder[0][1];
        this.heapSwap(0, this.heapSize-1);
        this.heapSize--;
        this.bubbleDown(0);
        return out;

    }

    deleteHeapIndex(index)
    {
        this.heapSwap(index, this.heapSize-1);
        this.heapSize--;
        this.bubbleDown(index);
    }

    bubbleDown(heapIndex)
    {
        var leftIndex = this.left(heapIndex);
        var rightIndex = this.right(heapIndex);
        var child = heapIndex;

        var childValue = this.solveOrder[child][0];
        var childBoardIndex = this.solveOrder[child][1];
        if(leftIndex < this.heapSize)
        {
            var leftValue = this.solveOrder[leftIndex][0];
            var leftBoardIndex = this.solveOrder[leftIndex][1];
    
            if(leftValue < childValue)
            {
                child = leftIndex;
                childValue = leftValue;
                childBoardIndex = leftBoardIndex;
            } 
            else if(leftValue === childValue && leftBoardIndex < childBoardIndex)
            {
                child = leftIndex;
                childValue = leftValue;
                childBoardIndex = leftBoardIndex;    
            }
        }
        if(rightIndex < this.heapSize)
        {
            var rightValue = this.solveOrder[rightIndex][0];
            var rightBoardIndex = this.solveOrder[rightIndex][1];
    
            if(rightValue < childValue)
            {
                child = rightIndex;
                childValue = rightValue;
                childBoardIndex = rightBoardIndex;
            } 
            else if(rightBoardIndex < childBoardIndex && rightValue === childValue)
            {
                child = rightIndex;
                childValue = rightValue;
                childBoardIndex = rightBoardIndex;    
            }
        }
        if(child!=heapIndex)
        {
            this.heapSwap(heapIndex, child);
            this.bubbleDown(child);
        }
    }

    bubbleUp(heapIndex)// cal on index in heap
    {
        while(heapIndex!=0 && this.solveOrder[this.parent(heapIndex)][0]>this.solveOrder[heapIndex][0])
        {
            this.heapSwap(this.parent(heapIndex), heapIndex);
            heapIndex=this.parent(heapIndex);
        }
    }

    heapSwap(parentHeapIndex, childHeapIndex)
    {
        var parentboardIndex = this.solveOrder[parentHeapIndex][1];
        var childboardIndex = this.solveOrder[childHeapIndex][1];

        var temp = this.solveOrder[parentHeapIndex];
        this.solveOrder[parentHeapIndex] = this.solveOrder[childHeapIndex];
        this.solveOrder[childHeapIndex] = temp;

        this.boardHeapIndex[parentboardIndex] = childHeapIndex;
        this.boardHeapIndex[childboardIndex] = parentHeapIndex;

    }

    heapify()
    {

        for(var i=this.heapSize; i>=0; i--)
        {
            this.bubbleDown(i);
        }
    }
    verifyHeapIntegrity()
    {
        var confirmed = 0;
        var out = "";
        for(var i=0; i<heapSize; i++)
        {
            if(typeof this.solveOrder[i][0] == 'undefined' || typeof this.solveOrder[i][1] == 'undefined')
            {
                out += "undefined data in heap"
            }
            if((this.left(i)<=heapSize && solveOrder[i][0]>this.solveOrder[this.left(i)][0]) || (this.right(i)<=this.heapSize && this.solveOrder[i][0]>this.solveOrder[this.right(i)][0]))
            {
                out += "heap structure broken";
            }
        }
        return out;
    }    
}

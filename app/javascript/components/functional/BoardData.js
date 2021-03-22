import PriorityQueue from "./PriorityQueue"

const BOARD_WIDTH = 9;
const SQUARE_WIDTH = 3;
const BOARD_SQUARES = 81;
const HEAP_CAPACITY = 4*BOARD_SQUARES;

export default class BoardData{
    constructor(puzzleType)
    {
        this.boardData = Array(BOARD_SQUARES).fill({
            entry: -1,
            blocks: new Array(BOARD_WIDTH).fill(0),
        })
        this.boardHeapIndex  = Array(BOARD_SQUARES);
        this.boardNumOptions = Array(BOARD_SQUARES).fill({
            type: "cellBlocks",
            options: 9,
            heapIndex: -1,
        })
        this.squareNumOptions = Array(BOARD_WIDTH).fill(0).map(x =>  Array(BOARD_WIDTH).fill({
            type: "squareBlocks",
            options: 9,
            heapIndex: -1,
            heapPriority: 1,
        }))//[0][2] refers stores the number of spots a 3 can be placed in the first square
        this.rowNumOptions = Array(BOARD_WIDTH).fill(0).map(x =>  Array(BOARD_WIDTH).fill({
            type: "rowBlocks",
            options: 9,
            heapIndex: -1,
            heapPriority: 2,
        }))
        this.colNumOptions = Array(BOARD_WIDTH).fill(0).map(x =>  Array(BOARD_WIDTH).fill({
            type: "colBlocks",
            options: 9,
            heapIndex: -1,
            heapPriority: 3,
        }))
        this.solveOrder = [];
        
        this.heapSize = 4*BOARD_SQUARES;
        let currentHeapIdex = 0;
        for(let i=0; i<this.boardNumOptions.length; i++)
        {
            this.solveOrder.push({
                type: "cellBlock",
                options: 9,
                index: i,
                heapPriority: 0,

            })
            let squareIndex = Math.floor(i/BOARD_WIDTH)
            this.boardNumOptions[i].heapIndex = currentHeapIdex;
            currentHeapIdex++;
            this.solveOrder.push({
                type: "squareBlock",
                options: 9,
                index: squareIndex,
                value: i%BOARD_WIDTH,
                heapPriority: 1,

            })
            this.squareNumOptions[squareIndex][i%BOARD_WIDTH].heapIndex = currentHeapIdex;
            currentHeapIdex++;

            this.solveOrder.push({
                type: "rowBlock",
                options: 9,
                index: squareIndex,
                value: i%BOARD_WIDTH,
                heapPriority: 2,

            })
            this.rowNumOptions[squareIndex][i%BOARD_WIDTH].heapIndex = currentHeapIdex;
            currentHeapIdex++;


            this.solveOrder.push({
                type: "colBlock",
                options: 9,
                index: squareIndex,
                value: i%BOARD_WIDTH,
                heapPriority: 3,

            })
            this.colNumOptions[squareIndex][i%BOARD_WIDTH].heapIndex = currentHeapIdex;
            currentHeapIdex++;

        }
        
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
            case 16:
                return this.isPlacableClassicSudoku(currentIndex, currentNumber, testIndex, testNumber);
                break;
            case 17:
                return this.isPlacableClassicSudoku(currentIndex, currentNumber, testIndex, testNumber);
                break;
            case 18:
                return this.isPlacableClassicSudoku(currentIndex, currentNumber, testIndex, testNumber);
                break;
            case 19:
                return this.isPlaceableCrossSudoku(currentIndex, currentNumber, testIndex, testNumber);
                break;
            case 20:
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
        if(this.boardData[index].blocks[number]>0)//placement not allowed on this square
        {
            const out =
            {
                type: "Failure",
                index: -1,
                number: number
            }
            return out;
        }
        if(this.boardData[index].entry!==-1)
        {
            //this.deleteEntry(index);
        }

        for(let i=0; i<BOARD_SQUARES; i++)
        {
            if(this.isPlacable(index, number, i, number)==0 && index!=i)
            {
                if(this.boardData[i].blocks[number]==0)//we are adding the first blocking square for this index and number
                {
                    this.updateBoardNumOptions(i, number, -1);
                }
                this.boardData[i].blocks[number]++;//indicate new squares that now cannot be placed in
            }
        }
        /*
        //remove one from each number that could be placed in the placed square
        for(let i=0; i<BOARD_WIDTH; i++)
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

        let cellHeapIndex = this.boardNumOptions[index];
        let squareHeapIndex = this.squareNumOptions[this.indexToSquare(index)][number];
        let rowHeapIndex = this.rowNumOptions[this.indexToRow(index)][number];
        let colHeapIndex = this.colNumOptions[this.indexToCol(index)][number];


        this.deleteHeapIndex(cellHeapIndex);
        this.deleteHeapIndex(squareHeapIndex);
        this.deleteHeapIndex(rowHeapIndex);
        this.deleteHeapIndex(colHeapIndex);

        this.heapify();
        */
       this.boardData[index].entry = number;    

        const out =
        {
            type: "Success",
            index: index,
            number: number
        }

        return out;
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
                    if(this.boardData[i].blocks[number]==1)// we are removing the only blocking square for this index, 
                    {
                        this.updateBoardNumOptions(i, 1);

                    }        
                    this.boardData[i].blocks[number]--;
                }
            }

            for(var i=0; i<BOARD_WIDTH; i++)//indicate that a blocker is removed for each number in the square that is being placed in
            {
                this.boardData[index].blocks[i]--;
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

            //
            this.heapify();
        }
    }

    //when a new first blocker is added updates that cell, square row and column to indicate there is one less number possible there. 
    updateBoardNumOptions(index, number, change)
    {
        let cellNumOptions = this.boardNumOptions[index];
        let squareNumOptions = this.squareNumOptions[this.indexToSquare(index)][number];
        let rowNumOptions = this.rowNumOptions[this.indexToRow(index)][number];
        let colNumOptions = this.colNumOptions[this.indexToCol(index)][number];

        cellNumOptions.options+=change;
        this.solveOrder[cellNumOptions.heapIndex].options+=change;

        squareNumOptions.options+=change;
        this.solveOrder[squareNumOptions.heapIndex].options+=change;

        rowNumOptions.options+=change;
        this.solveOrder[rowNumOptions.heapIndex].options+=change;

        colNumOptions.options+=change;
        this.solveOrder[colNumOptions.heapIndex].options+=change;
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
        if(this.heapSize==HEAP_CAPACITY)
        {
            return;
        }
        this.heapSize++;
        let heapIndex = this.heapSize-1;
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
        let leftIndex = this.left(heapIndex);
        let rightIndex = this.right(heapIndex);
        let childIndex = heapIndex;

        if(leftIndex < this.heapSize)
        {
            if(this.compareCells(leftIndex, childIndex))
            {
                childIndex = leftIndex;
            } 
        }
        if(rightIndex < this.heapSize)
        {
    
            if(this.compareCells(rightIndex, childIndex))
            {
                childIndex = rightIndex;
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
        while(heapIndex!=0 && this.compareCells(heapIndex, parentHeapIndex))
        {
            this.heapSwap(this.parent(heapIndex), heapIndex);
            heapIndex=this.parent(heapIndex);
        }
    }

    heapSwap(parentHeapIndex, childHeapIndex)
    {

        let parentboardIndex = this.solveOrder[parentHeapIndex][1];
        let childboardIndex = this.solveOrder[childHeapIndex][1];

        var temp = this.solveOrder[parentHeapIndex];
        this.solveOrder[parentHeapIndex] = this.solveOrder[childHeapIndex];
        this.solveOrder[childHeapIndex] = temp;

        this.boardHeapIndex[parentboardIndex] = childHeapIndex;
        this.boardHeapIndex[childboardIndex] = parentHeapIndex;

    }
    heapIndexToNumOptions(heapIndex)
    {
        let heapEntry = this.solveOrder[heapIndex]

        switch(heapEntry === 'cellBlock')
        {
            case 'cellBlock':
                return this.boardNumOptions[heapEntry.index];
                break;
            case 'squareBlock':
                return this.squareNumOptions[heapEntry.index][heapEntry.value];
                break;
            case 'rowBlock':
                return this.squareNumOptions[heapEntry.index][heapEntry.value];
                break;
            case 'colBlock':
                return this.squareNumOptions[heapEntry.index][heapEntry.value];
                break;
        }
    }
    heapify()
    {
        for(var i=this.heapSize; i>=0; i--)
        {
            this.bubbleDown(i);
        }
    }
    compareCells(heapIndexA, heapIndexB)
    {
        const heapEntryA = this.solveOrder[indexA];
        const heapEntryB = this.solveOrder[indexB];

        const numOptionsA = heapEntryA.numOptions;
        const numOptionsB = heapEntryB.numOptions;

        if(numOptionsA !== numOptionsB)
        {
            return numOptionsA < numOptionsB
        }

        const heapPriorityA = heapEntryA.heapPriority;
        const heapPriorityB = heapEntryB.heapPriority;

        if(heapPriorityA !== heapPriorityB) 
        {
            return heapPriorityA < heapPriorityB;
        }

        const indexA = heapEntryA.index
        const indexB = heapEntryB.index

        if(indexA !== indexB)
        {
            return indexA < indexB
        }
        return heapEntryA.value < heapEntryB.value

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

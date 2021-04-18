const BOARD_SQUARES = 81;
const NO_FLASHES_ARRAY = Array(BOARD_SQUARES).fill(false)
const FLASHES_ARRAY = Array(BOARD_SQUARES).fill("255, 0, 0")
const FLASHES_ARRAY_2 = Array(BOARD_SQUARES).fill("122, 122, 0")

const CELL_COLOR_RED = "255, 0, 0";
const CELL_COLOR_ORANGE = "235, 143, 52";
const CELL_COLOR_GREEN = "50, 168, 82";

const cellStyleReducer = (state =
    {
        data: {
            backgroundColor: Array(BOARD_SQUARES).fill("white"),
            flashColor: [...FLASHES_ARRAY],
            flashOn: Array(BOARD_SQUARES).fill(false),
        }
    }, action) =>
{
    switch(action.type)
    {
        case "FLASH_SQUARE":
        {
            const flashOut = new Array(BOARD_SQUARES).fill(false);
            flashOut[action.payload.index] = true;
            return {
                ...state,
                data : {
                    ...state.data,
                    flashColor: [...FLASHES_ARRAY_2],
                    flashOn:flashOut,
                    
                }

            }

        }
        case "CLEAR_FLASHES":
            return {
                ...state,
                data : {
                    ...state.data,
                    flashColor: Array(BOARD_SQUARES).fill("255, 0, 0")
                }

            }
        case "UPDATE_BOARD_FAILURE":
        {
            const flashOut = new Array(BOARD_SQUARES).fill(false);
            const flashColor = new Array(BOARD_SQUARES).fill("255, 0, 0");
            console.log(action.payload)
            for(let i =0; i<action.payload.length; i++)
            {
                flashOut[action.payload[i]] = true;
                flashColor[action.payload[i]] = CELL_COLOR_ORANGE;

            }
            return {
                ...state,
                data: {
                    ...state.data,
                    flashColor: flashColor,
                    flashOn:flashOut,
                }
            }
        }
        case "ANIMATE_BOARD_ADDITION":
        {
            const flashOut = new Array(BOARD_SQUARES).fill(false);
            const flashColor = new Array(BOARD_SQUARES).fill(CELL_COLOR_GREEN);
            flashOut[action.payload.index] = true;
            return {
                ...state,
                data: {
                    ...state.data,
                    flashColor: flashColor,
                    flashOn:flashOut,
                }
            }
        }
        case "ANIMATE_BOARD_SUBTRACTION":
            {
                const flashOut = new Array(BOARD_SQUARES).fill(false);
                const flashColor = new Array(BOARD_SQUARES).fill(CELL_COLOR_RED);
                flashOut[action.payload.index] = true;
                return {
                    ...state,
                    data: {
                        ...state.data,
                        flashColor: flashColor,
                        flashOn:flashOut,
                    }
                }
            }
    

        default: 
            return {
                ...state,
                data : {
                    ...state.data,
                    flashColor: [...FLASHES_ARRAY],
                    flashOn: [...NO_FLASHES_ARRAY]
                }

            }

    }
}

export default cellStyleReducer;
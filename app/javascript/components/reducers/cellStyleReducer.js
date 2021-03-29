const BOARD_SQUARES = 81;
const NO_FLASHES_ARRAY = Array(BOARD_SQUARES).fill(false)
const FLASHES_ARRAY = Array(BOARD_SQUARES).fill("255, 0, 0")
const FLASHES_ARRAY_2 = Array(BOARD_SQUARES).fill("122, 122, 0")

const cellStyleReducer = (state =
    {
        data: {
            backgroundColor: Array(BOARD_SQUARES).fill("white"),
            flashColor: [...FLASHES_ARRAY],
            flashOn: Array(BOARD_SQUARES).fill(false)
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
        default: 
            return {
                ...state,
                data : {
                    ...state.data,
                    flashColor: NO_FLASHES_ARRAY
                }

            }

    }
}

export default cellStyleReducer;
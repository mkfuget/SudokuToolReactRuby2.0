import React, {useState, useEffect, Fragment} from 'react'
import axios from 'axios'
import * as InputUtility from '../functional/InputUtility'
import * as Action from '../ActionCreators'
import {useSelector, useDispatch} from 'react-redux'
import {useSpring, animated} from 'react-spring'
import styled from 'styled-components'
import ADD_TO_BOARD_SUCESSFUL from '../ActionCreators';
import store from '../../packs/index.jsx'
import { propTypes } from 'react-bootstrap/esm/Image'

const CELL_COLOR_ORANGE = [255, 122, 0];
const CELL_COLOR_RED = [255, 0, 0];
const CELL_COLOR_GREEN = [0, 255, 0];
const CELL_COLOR_BLUE = 'rgba(0, 153, 255, 0.1)';
const CELL_COLOR_WHITE = 'white';
var highlightColor = 'rgba(0, 153, 255, 0.1)';


const CellStyle = styled(animated.td)`

    border: 1px solid gray;
    font-size: 16px;
    height: 36px;
    width: 36px;
    text-align: center;
    text-decoration: ${props => props.underline};

    &: first-child {
        border-left:solid medium gray;
    }
    &:nth-child(3n) {
        border-right:solid medium gray;
    }

`

const CellStyleConfirmed = styled(animated.td)`

    border: 1px solid gray;
    font-size: 16px;
    height: 36px;
    width: 36px;
    text-align: center;
    text-decoration: ${props => props.underline};
    &: first-child {
        border-left:solid medium gray;
    }
    &:nth-child(3n) {
        border-right:solid medium gray;
    }

`


const Cell = (props) => {
    const cellValue = parseInt(useSelector(state => state.boardDataReducer).data.boardData[props.index]) + 1;
    const flashColor = useSelector(state => state.cellStyleReducer).data.flashColor[props.index]
    const flashOn = useSelector(state => state.cellStyleReducer).data.flashOn[props.index]
    const isConfirmedSquare = useSelector(state => state.boardDataReducer).data.confirmedSquares[props.index]
    const textDecoration = (isConfirmedSquare ? "underline" : "");
    const currentSelectionIndex = useSelector(state => state.selectionReducer).index;
    const flashColorOut = 'rgba('+flashColor+', 0)';
    const flashColorIn = 'rgba('+flashColor+', 0.7)';
    const backgroundColor = ((currentSelectionIndex === props.index) ?  CELL_COLOR_BLUE : CELL_COLOR_WHITE)
    const selectCell = InputUtility.selectCell(props.index)
    const flashSquare = useSpring({
        config: {
            Mass: 10,
            Tension: 4,
            precision: 0.3,
            friction: 20,
            duration: 200,
        },
        to: [{backgroundColor:flashColorIn}, {backgroundColor:flashColorOut}],
        from: {backgroundColor:flashColorOut}    
            
    });
    return ( 
        <Fragment>
        {flashOn 
            ? <CellStyle 
                underline = {textDecoration}
                style = {flashSquare}
                onClick={() => selectCell(props.index)}
        >
            {cellValue!==0 ? (cellValue): ""}
            </CellStyle>
            : <CellStyle 
                underline = {textDecoration}

                style = {{
                    backgroundColor:backgroundColor,
                }
                }
                onClick={() => selectCell(props.index)}
            >
                {cellValue!==0 ? (cellValue): ""}
            </CellStyle>
        }
        </Fragment>
    )
}
export default Cell;
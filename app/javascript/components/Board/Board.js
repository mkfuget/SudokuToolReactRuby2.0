import React, {useState, useEffect, Fragment} from 'react'
import Cell from '../Cell/Cell.js'
import axios from 'axios'
import * as InputUtility from '../functional/InputUtility'
import {useSelector, useDispatch} from 'react-redux'
import {useSpring, animated} from 'react-spring'
import styled from 'styled-components'
import ADD_TO_BOARD_SUCESSFUL from '../ActionCreators';
import store from '../../packs/index.jsx'



const BoardRow = styled.tr`
&: first-child {
    border-top:solid medium gray;
}
&:nth-child(3n) {
    border-bottom:solid medium gray;
}
`

const BoardTable = styled.table`
margin-left: 80px;
`
const Board = (props) => {
    
    const renderSquare = index => {
        
        return (
            <Cell 
                index = {index} 
                id = {`cell${index}`}
            />
        );
    }

    return (
        <BoardTable>
            <tbody>
                <BoardRow>
                    {renderSquare(0)}
                    {renderSquare(1)}
                    {renderSquare(2)}
                    {renderSquare(3)}
                    {renderSquare(4)}
                    {renderSquare(5)}
                    {renderSquare(6)}
                    {renderSquare(7)}
                    {renderSquare(8)}
                </BoardRow>
                <BoardRow>
                    {renderSquare(9)}
                    {renderSquare(10)}
                    {renderSquare(11)}
                    {renderSquare(12)}
                    {renderSquare(13)}
                    {renderSquare(14)}
                    {renderSquare(15)}
                    {renderSquare(16)}
                    {renderSquare(17)}
                </BoardRow>
                <BoardRow>
                    {renderSquare(18)}
                    {renderSquare(19)}
                    {renderSquare(20)}
                    {renderSquare(21)}
                    {renderSquare(22)}
                    {renderSquare(23)}
                    {renderSquare(24)}
                    {renderSquare(25)}
                    {renderSquare(26)}
                </BoardRow>
                <BoardRow>
                    {renderSquare(27)}
                    {renderSquare(28)}
                    {renderSquare(29)}
                    {renderSquare(30)}
                    {renderSquare(31)}
                    {renderSquare(32)}
                    {renderSquare(33)}
                    {renderSquare(34)}
                    {renderSquare(35)}
                </BoardRow>
                <BoardRow>
                    {renderSquare(36)}
                    {renderSquare(37)}
                    {renderSquare(38)}
                    {renderSquare(39)}
                    {renderSquare(40)}
                    {renderSquare(41)}
                    {renderSquare(42)}
                    {renderSquare(43)}
                    {renderSquare(44)}
                </BoardRow>
                <BoardRow>
                    {renderSquare(45)}
                    {renderSquare(46)}
                    {renderSquare(47)}
                    {renderSquare(48)}
                    {renderSquare(49)}
                    {renderSquare(50)}
                    {renderSquare(51)}
                    {renderSquare(52)}
                    {renderSquare(53)}
                </BoardRow>
                <BoardRow>
                    {renderSquare(54)}
                    {renderSquare(55)}
                    {renderSquare(56)}
                    {renderSquare(57)}
                    {renderSquare(58)}
                    {renderSquare(59)}
                    {renderSquare(60)}
                    {renderSquare(61)}
                    {renderSquare(62)}
                </BoardRow>
                <BoardRow>
                    {renderSquare(63)}
                    {renderSquare(64)}
                    {renderSquare(65)}
                    {renderSquare(66)}
                    {renderSquare(67)}
                    {renderSquare(68)}
                    {renderSquare(69)}
                    {renderSquare(70)}
                    {renderSquare(71)}
                </BoardRow>
                <BoardRow>
                    {renderSquare(72)}
                    {renderSquare(73)}
                    {renderSquare(74)}
                    {renderSquare(75)}
                    {renderSquare(76)}
                    {renderSquare(77)}
                    {renderSquare(78)}
                    {renderSquare(79)}
                    {renderSquare(80)}
                </BoardRow>
            </tbody>
        </BoardTable>
    );
}
export default Board;
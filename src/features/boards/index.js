import React from 'react';
import { Formik, Field, Form } from 'formik';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { addBoard } from './actions';
import { makeSelectBoards } from './selectors';
import Button from '@material-ui/core/Button';
import AddBoardPopup from './components/addBoardPopup';
import BoardsListing from './components/boardListing';
import { getHashCode } from '../../utils';

export default function Boards() {
  const boards = useSelector(makeSelectBoards);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleSubmit = (values) => {
    const { name } = values;
    dispatch({
      type: addBoard().type,
      payload: {
        id: getHashCode(name, name.length),
        name,
        columns: [],
      },
    })
  }
  const handleBoardItemClick = (board) => {
    history.push({
      pathname: '/board',
      search: `?id=${board.id}`,
      state: { board }
    })
  }
  return (
    <div style={{ padding: '25px' }}>
      <AddBoardPopup handleSubmit={handleSubmit} buttonLabel="Add Board" popUpHeading="Add a Board" />
      <BoardsListing boards={boards} handleBoardItemClick={handleBoardItemClick} />
    </div>
  );
}

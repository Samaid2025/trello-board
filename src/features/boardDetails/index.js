import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AddBoardPopup from '../boards/components/addBoardPopup';
import { getHashCode } from '../../utils';
import { addColumn, addCard, dragEnd, editCard, addLabel } from '../boards/actions';
import { makeSelectBoardById } from '../boards/selectors';
import Columns from './components/coulmns';

const useStyles = makeStyles({
  root: {
    padding: '32px',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    display: 'block'
  }
});

const BoardDetails = (props) => {

  const {
    location:{search}
  } = window;
  const id = new URLSearchParams(search).get('id')
  const classes = useStyles();
  const board = useSelector((state) => makeSelectBoardById(state, id))
  const dispatch = useDispatch();
  const { name, columns } = board || {};


  const handleAddColumn = (values) => {
    const { name } = values;
    dispatch({
      type: addColumn().type,
      payload: {
        boardId: id,
        id: getHashCode(name, name.length),
        name,
        cards: [],
        labels: []
      },
    })
  }
  const handleAddCard = (values) => {
    if(values.isAdding){
      dispatch({
      type: addCard().type,
      payload: {
        id: getHashCode(values.name, values.name.length),
        ...values
      }
    })
    }else{
      dispatch({
        type: editCard().type,
        payload: {
          ...values
        }
      })
    }
  }
  const handleDragEnd = (result) => {
    dispatch({
      type: dragEnd().type,
      payload: {
        boardId: id,
        ...result
      }
    })
  }
  const handleAddLabel = (values) => {
    dispatch({
      type: addLabel().type,
      payload: values
    })
  }
  if (!board) return null;
  return (
    <>
      <Grid container className={classes.root} xs={12}>
        <div>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            {name}
          </Typography>
          <AddBoardPopup handleSubmit={handleAddColumn} buttonLabel="Add Column" popUpHeading="Add a column" />
        </div>
        <br />
      </Grid>
      <Grid container className={classes.root} xs={12}>
        <Columns columns={columns} handleAddCard={handleAddCard} boardId={id} handleDragEnd={handleDragEnd} handleAddLabel={handleAddLabel}/>
      </Grid>
    </>
  )
}

BoardDetails.propTypes = {
  board: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    columns: PropTypes.array,
    labels: PropTypes.array
  })
}

export default BoardDetails
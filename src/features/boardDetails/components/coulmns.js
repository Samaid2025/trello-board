import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Column from './column';

const Columns = ({ columns, boardId, handleAddCard, handleDragEnd, handleAddLabel }) => {
  
  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Grid container xs={12}>
          {columns.map(column => {
            return (
                  <Column key={column.id} column={column} handleAddCard={handleAddCard} handleAddLabel={handleAddLabel} boardId={boardId} />
            )
          })}
        </Grid>
      </DragDropContext>
    </>
  )
}

Columns.propTypes = {
  columns: PropTypes.array,
  boardId: PropTypes.string,
  handleAddCard: PropTypes.func,
  handleDragEnd: PropTypes.func,
  handleAddLabel: PropTypes.func
}

export default Columns;
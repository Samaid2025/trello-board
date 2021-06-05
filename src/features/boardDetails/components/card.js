import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Cards from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent'
import { Draggable } from 'react-beautiful-dnd';
import CardPopup from './cardPopup';


const useStyles = makeStyles({
  root: {
    maxWidth: 200,
    backgroundColor: 'aquamarine',
    margin: '5px'
  },
  title: {
    fontSize: 22,
  },
  dsc:{
    wordBreak: 'break-all'
  }
});


const Card = ({
  card,
  index,
  columnId,
  boardId,
  handleAddCard
}) => {
  const classes = useStyles();
  return (
    <Draggable
    draggableId={card.id}
    index={index}
  >
    {(provided, snapshot) => (
      <Grid
        item
        spacing={2}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        innerRef={provided.innerRef}
        isDragging={snapshot.isDragging}
      >
        <Cards className={classes.root} variant="outlined">
          <CardContent>
            <h3>
              {card.name}
              <CardPopup handleSubmit={handleAddCard} card={card} isAdding={false} columnId={columnId} boardId={boardId}/>
              </h3>
            <p className={classes.dsc}>{card.description}</p>
          </CardContent>
        </Cards>
      </Grid>
    )}
  </Draggable>
)
}

Card.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string
  }),
  index: PropTypes.number,
  columnId: PropTypes.string,
  boardId: PropTypes.string,
  handleAddCard: PropTypes.func
}

export default Card;
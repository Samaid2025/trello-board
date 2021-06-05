import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import TaskCard from './card';
import { Droppable } from 'react-beautiful-dnd'
import CardPopup from './cardPopup';
import AddLabelPopup from '../../boards/components/addBoardPopup'
import TagsList from './tagsList';


const useStyles = makeStyles({
  root: {
    minWidth: 250,
    minHeight: 400,
  },
  container:{
    display: 'flex',
    flexDirection: 'column',
    margin: '8px'
  },
  list:{
    flexGrow: '1',
    minHeight: '500px'
  },
  tags: {
    display: 'flex',
    width: '200px',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: '2px',
    },
  },
  title: {
    fontSize: 22,
  }
});


const Column = ({
  column,
  boardId,
  handleAddCard,
  handleAddLabel
}) => {
  const classes = useStyles();

  const handleLabel = (values) => {
    handleAddLabel({
      boardId,
      columnId: column.id,
      ...values
    })
  }

  return (
    <Grid container xs={4}>
      <Droppable droppableId={column.id} type="TASK">
        {(provided, snapshot) => (
          <Grid
            container
            className={classes.container}
            spacing={3}
            innerRef={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            <Card className={classes.root} variant="outlined">
              <CardContent>
                <h3>
                  {column.name}
                  <CardPopup handleSubmit={handleAddCard} columnId={column.id} boardId={boardId} />
                  <AddLabelPopup handleSubmit={handleLabel} buttonLabel="Add Label" popUpHeading="Add a Label" isBoardPopup={false} />
                </h3>
                <div className={classes.tags}>
                  <TagsList labels={column.labels}/>
                </div>
                <div className={classes.list}>
                {column.cards.map((card, index) => (
                  <TaskCard key={card.id} card={card} index={index} handleAddCard={handleAddCard} columnId={column.id} boardId={boardId} />
                ))}
                </div>
              </CardContent>
            </Card>
            {provided.placeholder}
          </Grid>
        )}
      </Droppable>
    </Grid>
  )
}

Column.propTypes = {
  column: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    card: PropTypes.array
  }),
  boardId: PropTypes.string,
  handleAddCard: PropTypes.func,
  handleAddLabel: PropTypes.func
}

export default Column;
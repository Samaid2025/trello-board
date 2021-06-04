import React from 'react';
import Board from './boardItem';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  title: {
    fontSize: 30,
    color: 'black'
  },
  message: {
    fontSize: 20,
    color: 'black'
  }
});


const BoardsListing = ({
  boards,
  handleBoardItemClick
}) => {
  const classes = useStyles();
  return (
    <div style={{ padding: '25px' }}>
      <Typography className={classes.title} color="textSecondary" gutterBottom>
        Boards
        </Typography>
      {
        boards.length > 0 ? <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={2}>
            {boards.map(board => <Board board={board} handleBoardItemClick={handleBoardItemClick}></Board>)}
          </Grid>
        </Grid>
      </Grid> : <Typography className={classes.message} color="textSecondary" gutterBottom>
        There are no boards yet
        </Typography>
      }
    </div>
  )
}

export default BoardsListing;
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  root: {
    minWidth: 250,
  },
  title: {
    fontSize: 22,
  }
});

function Board(props) {
  const {board:{name}, handleBoardItemClick} = props;
  const classes = useStyles();

  return (
    <Grid item  spacing={2}>
      <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {name}
        </Typography>
        <Button variant="contained" color="primary" onClick={() => handleBoardItemClick(props.board)}>View Board</Button>
      </CardContent>
    </Card>
    </Grid>
  );
}

Board.propTypes = {
  board: PropTypes.shape({
    name: PropTypes.string,
    handleBoardItemClick: PropTypes.func
  })
}

export default Board;
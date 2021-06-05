import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Field, Form } from 'formik';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const useStyles = makeStyles({
  root: {
    width: 400,
    margin: '5px'
  },
  title: {
    fontSize: 22,
  }
});


const CardPopup = ({
  columnId,
  boardId,
  handleSubmit,
  card,
  isAdding = true
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  if(!card && !isAdding) return null;
  return (
    <>
      {
        isAdding ? <IconButton variant="outlined" color="primary" onClick={handleClickOpen}>
          <AddIcon fontSize="small" />
        </IconButton> : <IconButton variant="outlined" color="primary" onClick={handleClickOpen}>
          <EditIcon fontSize="small" />
        </IconButton>
      }
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        maxWidth="lg"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {
            isAdding ? 'Add Card' : 'Edit Card'
          }
        </DialogTitle>
        <DialogContent className={classes.root}>
          <Formik
            initialValues={{
              name: card && !isAdding ? card.name: '',
              description: card && !isAdding  ? card.description : ''
            }}
            validate={values => {
              const errors = {};
              if (!values.name) {
                errors.name = 'Required';
              }
              if (!values.description) {
                errors.description = 'Required';
              }
              return errors;
            }}
            onSubmit={(values, {resetForm}) => {
              const payload = {
                columnId,
                boardId,
                isAdding,
                ...values
              }
              if(card){
                payload.id = card.id;
              }
              handleSubmit(payload);
              handleClose();
              resetForm();
            }}
          >
            {
              ({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
              }) => (
                <Form>
                  <Field
                    error={errors.name && touched.name}
                    type="text"
                    as={TextField}
                    name="name"
                    fullWidth
                    placeholder="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />

                  <br />
                  <Field
                    error={errors.description && touched.description}
                    type="text"
                    multiline
                    as={TextField}
                    fullWidth
                    name="description"
                    placeholder="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                  />
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button type="submit" color="primary">
                      {
                        isAdding ? 'Create' : 'Update'
                      }
                    </Button>
                  </DialogActions>
                </Form>
              )
            }
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  )
}

CardPopup.propTypes = {
  columnId: PropTypes.string,
  boardId: PropTypes.string,
  card: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string
  })
}

export default CardPopup;
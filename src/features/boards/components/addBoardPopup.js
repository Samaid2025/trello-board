import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Field, Form } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import LabelIcon from '@material-ui/icons/Label';

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

const AddBoardPopup = ({
  handleSubmit,
  buttonLabel,
  popUpHeading,
  isBoardPopup = true,
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {
        isBoardPopup ? <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          {buttonLabel}
        </Button> : <IconButton variant="outlined" color="primary" onClick={handleClickOpen}>
          <LabelIcon fontSize="inherit" />
        </IconButton>

      }
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle id="alert-dialog-slide-title">{popUpHeading}</DialogTitle>
        <DialogContent className={classes.root}>

          <Formik
            initialValues={{
              name: '',
            }}
            validate={values => {
              const errors = {};
              if (!values.name) {
                errors.name = 'Required';
              }
              return errors;
            }}
            onSubmit={(values, {resetForm}) => {
              handleSubmit(values);
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
                    error={errors.name}
                    type="text"
                    as={TextField}
                    name="name"
                    fullWidth
                    placeholder="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button type="submit" color="primary">
                      Create
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

AddBoardPopup.propTypes = {
  handleSubmit: PropTypes.func,
  buttonLabel: PropTypes.string,
  popUpHeading: PropTypes.string,
  isBoardPopup: PropTypes.bool
}

export default AddBoardPopup;
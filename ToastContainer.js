import React from 'react';
import { Snackbar, SnackbarContent, IconButton, makeStyles } from '@material-ui/core';
import { green, amber } from '@material-ui/core/colors';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';

const useStyles = makeStyles(theme => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.main
  },
  waring: {
    backgroundColor: amber[700]
  },
  icon: {
    color: "white"
  },
  message: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
}))

const msgIcons = {
  success: CheckCircleIcon,
  error: ErrorIcon,
  info: InfoIcon,
  waring: WarningIcon
}


const StyledContent = ({ type, message, close, ...rest }) => {
  const classes = useStyles()
  const Icon = msgIcons[type]
  return (
    <SnackbarContent
      className={ classes[type] }
      { ...rest }
      message={ 
        <div className={ classes.message } >
          <Icon className={ classes.icon } />
          { message }
        </div>
      }
      action={[
        <IconButton 
          key="close"
          color="inherit"
          onClick={ close }
        >
          <CloseIcon className={ classes.icon } />
        </IconButton>
      ]}
    />
  )
}

class ToastContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      toastList: [],
      counter: 0
    }
  }

  addToast(toast) {
    this.setState({
      toastList: [...this.state.toastList.filter(toast => toast.open), { id: this.state.counter, open: true, ...toast }]
    })
    this.setState({
      counter: this.state.counter + 1
    })
  }

  closeToast(id) {
    this.setState({
      toastList: [...this.state.toastList.map(toast => id === toast.id ? {...toast, open: false} : toast)]
    })
  }

  clearClosed() {
    this.setState({
      toastList: this.state.toastList.filter(toast => toast.open)
    })
  }

  render() {
    return (
      <div>
        {
          this.state.toastList.map(
            ({
              id,
              type,
              open,
              message,
              contentProps={},
              anchorOrigin={ horizontal: "right", vertical: "top" },
              autoHideDuration=3000,
              disableWindowBlurListener=true,
              ...rest
            }) => {
              return open ? (
                <Snackbar
                  key={ id }
                  open={ open }
                  anchorOrigin={ anchorOrigin }
                  autoHideDuration={ autoHideDuration }
                  disableWindowBlurListener={ disableWindowBlurListener }
                  onClose={ _ => this.closeToast(id) }
                  onExited={ this.clearClosed }
                  { ...rest }
                >
                  <StyledContent
                    type={ type }
                    message={ message }
                    close={ _ => this.closeToast(id) }
                    { ...contentProps }
                  />
                </Snackbar>
              ) : null
            }
          )
        }
      </div>
    )
  }
}

export default ToastContainer
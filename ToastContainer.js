import React from 'react'
import { Snackbar, SnackbarContent, IconButton, makeStyles } from '@material-ui/core'
import { green, amber } from '@material-ui/core/colors'
import CloseIcon from '@material-ui/icons/Close'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import WarningIcon from '@material-ui/icons/Warning'

const useStyles = makeStyles (theme => ({
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
    color: 'white'
  },
  message: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  messageContent: {
    paddingLeft: '.5rem'
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
          <div className={ classes.messageContent }>
            { message }
          </div>
        </div>
      }
      action={[
        <IconButton 
          key='close'
          color='inherit'
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
      counter: 0,
      toast: {}
    }
    this.addToast = this.addToast.bind(this)
    this.closeToast = this.closeToast.bind(this)
  }

  addToast (toast) {
    this.setState({
      toast: { id: this.state.counter, open: true, ...toast }
    })
    this.setState({
      counter: this.state.counter + 1
    })
  }

  closeToast () {
    this.setState({
      toast: { ...this.state.toast, open: false }
    })
  }

  render() {
    const {
      type,
      message,
      id, 
      open, 
      anchorOrigin = { horizontal: 'right', vertical: 'top' },
      autoHideDuration = 3000,
      disableWindowBlurListener = true,
      contentProps,
      ...rest
    } = this.state.toast
    return (
      <Snackbar
        key={ id }
        open={ open }
        anchorOrigin={ anchorOrigin }
        autoHideDuration={ autoHideDuration }
        disableWindowBlurListener={ disableWindowBlurListener }
        onClose={ this.closeToast }
        { ...rest }
      >
        <StyledContent
          type={ type }
          message={ message }
          close={ this.closeToast }
          { ...contentProps }
        />
      </Snackbar>
    )
  }
}

export default ToastContainer
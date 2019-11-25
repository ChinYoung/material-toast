import React from 'react';
import ReactDOM from 'react-dom';
import ToastContainer from './ToastContainer';

let container

export default (_ => {
  if (!container) {
    const div = document.createElement("div")
    document.body.appendChild(div)
    container = ReactDOM.render(<ToastContainer />, div) 
  }
  return {
    addToast: toast => {
      container.addToast(toast)
    }
  }
})()
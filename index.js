import op from './operations';

export default {
  success: toast => op.addToast({ type: "success", ...toast }),
  error: toast => op.addToast({ type: "error", ...toast }),
  info: toast => op.addToast({ type: "info", ...toast }),
  warning: toast => op.addToast({ type: "warning", ...toast }),
}
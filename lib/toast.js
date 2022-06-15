import { toast, cssTransition } from 'react-toastify';
import { CheckCircleIcon } from '@heroicons/react/outline';

const config = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  transition: cssTransition({
    enter: 'slide-in-fwd',
    exit: 'slide-out-bck',
  }),
};

const getConfig = (type) => {
  let result = { ...config };
  // icon
  switch (type) {
    case 'error':
      result.icon = null;
      break;
    case 'warn':
      result.icon = null;
      break;
    case 'success':
      result.icon = <CheckCircleIcon className="text-green-500" />;
      break;
    default:
      result.icon = null;
  }
  // dark
  if (
    localStorage.getItem('color-theme') === 'dark' ||
    (!('color-theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    result.theme = 'dark';
  } else {
    result.theme = 'light';
  }
  return result;
};
const func = {
  success: (msg) => toast.success(msg, getConfig('success')),
  error: (msg) => toast.error(msg, getConfig('error')),
  warn: (msg) => toast.warn(msg, getConfig('warn')),
  info: (msg) => toast.info(msg, getConfig('info')),
};

export default func;

import { toast, Flip } from 'react-toastify';

console.log('HiCheck', HiCheck);
const config = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  progress: undefined,
  transition: Flip,
};
const func = {
  success: (msg) => toast.success(msg, config),
};

export default func;

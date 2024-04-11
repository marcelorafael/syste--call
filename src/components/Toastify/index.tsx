import React from 'react';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


const Toastify = () => {

  return (
    <div>
      <ToastContainer
        // position="top-right"
        autoClose={3000}
        // hideProgressBar={false}
        // newestOnTop={false}
        // closeOnClick
        // rtl={false}
        // pauseOnFocusLoss
        // draggable
        // pauseOnHover
        theme="colored"
      // transition:Bounce,
      />
    </div>
  );

}

export default Toastify
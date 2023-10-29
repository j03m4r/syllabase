'use client';

import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
    return (
        <Toaster toastOptions={{
          style: {
            background: '#fff',
            color: '#000',
            textAlign: 'center'
          }
        }} />
    );
};

export default ToasterProvider;
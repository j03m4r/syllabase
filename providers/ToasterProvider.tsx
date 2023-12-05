'use client';

import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
    return (
        <Toaster toastOptions={{
          style: {
            background: '#FAF9F6',
            color: '#ee4b2b',
            fontWeight: 'bold',
            textAlign: 'center'
          }
        }} />
    );
};

export default ToasterProvider;
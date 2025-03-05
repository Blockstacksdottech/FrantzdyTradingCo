import { ToastContainer } from "react-toastify";
import { UserProvider } from "@/contexts/UserContextData";
import { useRef } from 'react';
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';

import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
  const tawkMessengerRef = useRef();

  const handleMinimize = () => {
        tawkMessengerRef.current.minimize();
        
    };

  return (
    <>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
      <TawkMessengerReact
                propertyId="67c857c0efe65a1911671295"
                widgetId="1ilj9dik2"
                ref={tawkMessengerRef}/>

      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

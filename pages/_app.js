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
                propertyId="67c7796c47285a190ee0afd7"
                widgetId="1ilhj4kjs"
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

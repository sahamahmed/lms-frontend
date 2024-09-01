// Providers.js (or Providers.tsx)
'use client';
import { Provider } from "react-redux";
import store from "@/redux/store";
import React, { useEffect } from 'react';
import { initSocket } from "@/utils/socket";

type Props = {
  children: React.ReactNode;
};

function Providers({ children }: Props) {

  useEffect(() => {
    const socket = initSocket();  
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });
  }, []);

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}

export default Providers;

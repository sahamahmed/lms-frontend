'use client'
import { Provider } from "react-redux";
import store from "@/redux/store";

import React from 'react'

type Props = {
    children: React.ReactNode
}

function Providers({children}: Props) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}

export default Providers
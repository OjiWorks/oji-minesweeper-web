"use client";

import React from "react";
import dynamic from "next/dynamic";

import { Provider } from "react-redux";
import store from "../store";

const App = dynamic(() => import("./app"), { ssr: false });

export default function ClientOnly() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

"use client";

import { Provider } from "react-redux";

import store from "@/src/store";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="kr">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <title>BombYangGang</title>
      </head>
      <body>
        <Provider store={store}>
          <div id="root">{children}</div>
        </Provider>
      </body>
    </html>
  );
}

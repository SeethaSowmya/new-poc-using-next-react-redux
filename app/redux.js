"use client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from "@/store/storeConfig";
import { useSelector } from "react-redux";
import * as React from "react";
import { ProtectedRoute } from "./protectedRoute";
import { SessionProvider } from "next-auth/react";

export function ReduxProviders({ children, session }) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <ProtectedRoute>{children}</ProtectedRoute>
      </Provider>
    </SessionProvider>
  );
}

{
  /* <Provider store={store}> 
{/* <PersistGate persistor={persistor}>{children}</PersistGate> 
</Provider> */
}

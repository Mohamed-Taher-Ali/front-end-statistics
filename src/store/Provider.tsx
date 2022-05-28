import React, { ReactElement } from "react";
import { Provider } from "react-redux";
import { store } from ".";

export function MyStore({ children }: { children: ReactElement }) {
    return <Provider store={store}>{children}</Provider>;
}
import React from "react";
import { Provider } from "react-redux";
import createStore from "./../store/store";

export const ProviderStoreRedux = ({ children }) => {
  const store = createStore();
  return <Provider store={store}>{children}</Provider>;
};

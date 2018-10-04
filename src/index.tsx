import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";

import reducer from "./redux/reducers";
import App from "./components/app";
import { rootSaga } from "./redux/saga";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  applyMiddleware(thunk, sagaMiddleware, createLogger())
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

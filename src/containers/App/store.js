import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
const sagaMiddleware = new createSagaMiddleware();

const Store = createStore(
    combineReducers({

    }),
    applyMiddleware(sagaMiddleware)
);

export default Store;
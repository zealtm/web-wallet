import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import userReducer from "../User/UserReducer";
import rootSaga from "../../sagas/index";

const sagaMiddleware = new createSagaMiddleware();

const Store = createStore(
    combineReducers({
        userReducer
    }),

    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default Store;
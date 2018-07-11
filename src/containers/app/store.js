import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import userReducer from "../user/redux/userReducer";
import userSaga from "../user/redux/userSaga";

const sagaMiddleware = new createSagaMiddleware();

const Store = createStore(
    combineReducers({
        userReducer
    }),

    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(userSaga);

export default Store;
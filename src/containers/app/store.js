import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import userReducer from "../User/redux/UserReducer";
import userSaga from "../User/redux/UserSaga";

const sagaMiddleware = new createSagaMiddleware();

const Store = createStore(
    combineReducers({
        userReducer
    }),

    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(userSaga);

export default Store;
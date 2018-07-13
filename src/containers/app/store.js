import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import user from "../user/redux/userReducer";
import error from "../errors/redux/errorReducer"
import userSaga from "../user/redux/userSaga";

const sagaMiddleware = new createSagaMiddleware();

const Store = createStore(
    combineReducers({
        user,
        error
    }),

    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(userSaga);

export default Store;
import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import userReducer from "../User/UserReducer";
import userSaga from "../../containers/User/UserSaga";

const sagaMiddleware = new createSagaMiddleware();

const Store = createStore(
    combineReducers({
        userReducer
    }),

    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(userSaga);

export default Store;
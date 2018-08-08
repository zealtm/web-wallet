import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import user from "../user/redux/userReducer";
import userSaga from "../user/redux/userSaga";
import error from "../errors/redux/errorReducer";
import skeleton from "../skeleton/redux/skeletonReducer";

const sagaMiddleware = new createSagaMiddleware();

const Store = createStore(
  combineReducers({
    user,
    skeleton,
    error
  }),

  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(userSaga);

export default Store;

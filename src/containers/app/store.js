import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import user from "../user/redux/userReducer";
import rootSaga from "./saga";
import skeleton from "../skeleton/redux/skeletonReducer";
import error from "../errors/redux/errorReducer";


const sagaMiddleware = new createSagaMiddleware();

const Store = createStore(
  combineReducers({
    user,
    skeleton,
    error
  }),

  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default Store;

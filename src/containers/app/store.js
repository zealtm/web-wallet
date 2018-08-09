import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import user from "../user/redux/userReducer";
import userSaga from "../user/redux/userSaga";
import skeleton from "../skeleton/redux/skeletonReducer";
import skeletonSaga from "../skeleton/redux/skeletonSaga";
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

sagaMiddleware.run(userSaga);
sagaMiddleware.run(skeletonSaga);


export default Store;

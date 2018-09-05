import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga";
import skeleton from "../skeleton/redux/skeletonReducer";
import user from "../user/redux/userReducer";
import wallet from "../wallet/redux/walletReducer";
import leasing from "../leasing/redux/leasingReducer";
import error from "../errors/redux/errorReducer";
import payment from "../payment/redux/paymentReducer";

const sagaMiddleware = new createSagaMiddleware();

const Store = createStore(
  combineReducers({
    user,
    wallet,
    skeleton,
    leasing,
    error, 
    payment
  }),

  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default Store;

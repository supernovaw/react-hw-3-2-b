import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import { servicesDetailsEpic, servicesListEpic } from "./epics";
import servicesList from "./reducers/servicesList";
import servicesDetails from "./reducers/servicesDetails";

const reducers = combineReducers({
  servicesList,
  servicesDetails

});
const epics = combineEpics(
  servicesListEpic,
  servicesDetailsEpic
);

const epicMiddleware = createEpicMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(epicMiddleware)));
epicMiddleware.run(epics);

export default store;
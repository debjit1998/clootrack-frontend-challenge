import { combineReducers, createStore } from "redux";
import chartDataReducer from "./chartDataReducer";

const store = combineReducers({
  chartData: chartDataReducer,
});

export default createStore(store);

import { createStore } from "redux";
import { stepperReducer } from "./reducers";

const store = createStore(stepperReducer);
export default store;

